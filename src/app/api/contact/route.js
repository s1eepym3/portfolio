import { NextResponse } from "next/server";

const rateLimits = new Map();

export async function POST(req) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    const now = Date.now();
    const rateLimitWindow = 60000; // 1 minute
    const maxRequests = 2;

    const userHistory = rateLimits.get(ip) || { count: 0, firstRequest: now };

    if (now - userHistory.firstRequest > rateLimitWindow) {
      userHistory.count = 1;
      userHistory.firstRequest = now;
    } else {
      userHistory.count += 1;
      if (userHistory.count > maxRequests) {
        return NextResponse.json({ error: "Too many requests, please try again later." }, { status: 429 });
      }
    }
    rateLimits.set(ip, userHistory);

    // Do not rely on content-length header exclusively. Read as text first.
    let rawBody;
    try {
      rawBody = await req.text();
    } catch (e) {
      return NextResponse.json({ error: "Cannot read body." }, { status: 400 });
    }

    if (rawBody.length > 10240) { // 10KB
      return NextResponse.json({ error: "Payload too large." }, { status: 413 });
    }

    if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO_EMAIL) {
      // Do not leak env errors directly, but we can't send email. 
      // Return 503 so client shows fallback.
      return NextResponse.json({ error: "Service unavailable." }, { status: 503 });
    }

    let data;
    try {
      data = JSON.parse(rawBody);
    } catch (e) {
      return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
    }

    const { name, email, message, honeypot, timestamp } = data;

    if (honeypot) {
      // Return 200 without sending anything
      return NextResponse.json({ success: true }, { status: 200 });
    }

    if (!timestamp || Date.now() - timestamp < 3000) {
      return NextResponse.json({ error: "Form submitted too quickly." }, { status: 400 });
    }

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    if (name.length > 100 || email.length > 100 || message.length > 5000) {
      return NextResponse.json({ error: "Input too long." }, { status: 400 });
    }

    // Reject control characters and newlines in headers/name/email
    const hasControlChars = (str) => /[\x00-\x1F\x7F-\x9F]/.test(str);
    if (hasControlChars(name) || hasControlChars(email)) {
      return NextResponse.json({ error: "Invalid characters in input." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format." }, { status: 400 });
    }

    // Strict HTML escaping ONLY for subject
    const escapeHTML = (str) =>
      str.replace(/[&<>'"]/g, (tag) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      }[tag] || tag));

    const safeName = escapeHTML(name);

    const fromEmail = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Contact Form <${fromEmail}>`,
        to: [process.env.CONTACT_TO_EMAIL],
        reply_to: email, // Validated to contain no newlines/control chars
        subject: `New message from ${safeName}`, // safeName has no newlines
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      }),
    });

    if (!resendRes.ok) {
      // Do not leak provider errors
      console.error("Email provider error:", await resendRes.text());
      return NextResponse.json({ error: "Service unavailable." }, { status: 503 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
