"use client";

import { useState, useEffect, useRef } from "react";
import { profileData } from "../data/profile";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ status: "idle", message: "" });
  const formRef = useRef(null);
  const timestampRef = useRef(0);

  useEffect(() => {
    timestampRef.current = Date.now();
  }, []);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(profileData.contact.email);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = profileData.contact.email;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState({ status: "sending", message: "Sending message..." });

    const formData = new FormData(formRef.current);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      honeypot: formData.get("bot-field"),
      timestamp: timestampRef.current,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        if (res.status === 503) {
          setFormState({ status: "error", message: "Email service is temporarily unavailable. Please email me directly." });
        } else {
          setFormState({ status: "error", message: result.error || "Failed to send message." });
        }
      } else {
        setFormState({ status: "success", message: "Message sent successfully! I'll get back to you soon." });
        formRef.current.reset();
      }
    } catch (error) {
      setFormState({ status: "error", message: "Network error. Please try again or email me directly." });
    }
  };

  const isSending = formState.status === "sending";

  return (
    <section id="contact" className="py-32 bg-[var(--bg)] relative overflow-hidden scroll-mt-24">
      <div className="px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto w-full">
        <div className="mb-16">
          <p className="font-mono text-sm tracking-widest text-[var(--text-muted)] mb-6">04 — CONTACT</p>
          <h2 className="font-serif text-[clamp(2.5rem,11.3vw,3rem)] md:text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.9] tracking-tight text-[var(--text)] w-[90%] md:w-full">
            Got something worth <br className="hidden md:block" />
            <span className="italic text-[var(--accent)]">protecting?</span> Let&apos;s talk.
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1fr_minmax(0,400px)] gap-16 lg:gap-20">
          <div className="flex flex-col items-start min-w-0">
            <div className="group inline-flex flex-col w-full">
              <a 
                href={`mailto:${profileData.contact.email}`} 
                className="font-serif leading-none text-[var(--text)] relative pb-2 group inline-block w-fit"
              >
                <span className="block sm:inline whitespace-nowrap text-[clamp(1.75rem,7vw,2.5rem)] sm:text-[clamp(1.5rem,3.2vw,3.5rem)] lg:text-[clamp(2rem,3vw,3.8rem)]">
                  <span className="block sm:inline">mohdhaykhal67</span>
                  <span className="block sm:inline">@gmail.com</span>
                </span>
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--accent)] scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"></span>
              </a>
              
              <button 
                onClick={handleCopy}
                className="mt-6 font-mono text-sm px-6 py-3 border border-[var(--line)] rounded-full hover:bg-[var(--line)] transition-colors min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-2 self-start text-[var(--text)]"
                aria-label="Copy email address"
              >
                {copied ? "Copied" : "Copy"}
              </button>
              <div aria-live="polite" className="sr-only">
                {copied ? "Email address copied to clipboard" : ""}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 font-mono text-sm mt-8">
              <a href={profileData.socials.github} target="_blank" rel="noopener noreferrer" className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors py-2 pr-4 min-h-[44px] flex items-center gap-1.5">GitHub <span className="text-[10px] -mt-0.5" aria-hidden="true">↗</span></a>
              <a href={profileData.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors py-2 pr-4 min-h-[44px] flex items-center gap-1.5">LinkedIn <span className="text-[10px] -mt-0.5" aria-hidden="true">↗</span></a>
              <a href={profileData.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors py-2 pr-4 min-h-[44px] flex items-center gap-1.5">WhatsApp <span className="text-[10px] -mt-0.5" aria-hidden="true">↗</span></a>
            </div>
          </div>

          <div className="w-full">
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6 w-full mt-4 lg:mt-0">
              {/* Honeypot field - hidden from users and screen readers */}
              <div className="hidden" aria-hidden="true">
                <label>
                  Don&apos;t fill this out if you&apos;re human: <input name="bot-field" tabIndex="-1" />
                </label>
              </div>

              <div className="flex flex-col gap-0">
                <label htmlFor="name" className="font-mono text-sm text-[var(--text-muted)]">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required 
                  disabled={isSending}
                  className="bg-transparent border-b border-[var(--line)] py-2 h-11 focus:outline-none focus:border-[var(--accent)] transition-colors text-[var(--text)] w-full rounded-none" 
                />
              </div>

              <div className="flex flex-col gap-0">
                <label htmlFor="email" className="font-mono text-sm text-[var(--text-muted)]">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required 
                  disabled={isSending}
                  className="bg-transparent border-b border-[var(--line)] py-2 h-11 focus:outline-none focus:border-[var(--accent)] transition-colors text-[var(--text)] w-full rounded-none" 
                />
              </div>

              <div className="flex flex-col gap-0">
                <label htmlFor="message" className="font-mono text-sm text-[var(--text-muted)]">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="4" 
                  required 
                  disabled={isSending}
                  className="bg-transparent border-b border-[var(--line)] py-2 focus:outline-none focus:border-[var(--accent)] transition-colors resize-none text-[var(--text)] w-full rounded-none" 
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSending}
                className="self-start font-mono text-sm px-8 py-4 border border-[var(--accent)] rounded-full text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] transition-colors min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSending ? "Sending..." : "Send Message"}
              </button>

              <div className="mt-2" aria-live="polite">
                {formState.status === "error" ? (
                  <span className="text-[var(--danger)] flex items-center gap-2 font-mono text-sm min-h-[1.5rem]">
                    <span aria-hidden="true">⚠</span> {formState.message}
                  </span>
                ) : formState.status === "success" ? (
                  <span className="text-[var(--success)] flex items-center gap-2 font-mono text-sm min-h-[1.5rem]">
                    <span aria-hidden="true">✓</span> {formState.message}
                  </span>
                ) : (
                  <span className="text-[var(--text-muted)] font-mono text-sm min-h-[1.5rem] flex items-center">
                    {formState.message}
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}