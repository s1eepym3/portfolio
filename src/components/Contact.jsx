"use client";

import { motion } from "framer-motion";
import { FaEnvelope, FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

export default function Contact() {
  const contactLinks = [
    {
      name: "Email",
      value: "mohdhaykhal67@gmail.com",
      href: "mailto:mohdhaykhal67@gmail.com",
      icon: <FaEnvelope />,
      color: "hover:text-red-400"
    },
    {
      name: "GitHub",
      value: "github.com/s1eepym3",
      href: "https://github.com/s1eepym3",
      icon: <FaGithub />,
      color: "hover:text-gray-400"
    },
    {
      name: "WhatsApp",
      value: "+62 831-9702-7655",
      href: "https://wa.me/6283197027655",
      icon: <FaWhatsapp />,
      color: "hover:text-green-400"
    },
    {
      name: "LinkedIn",
      value: "Mohammad Haykhal",
      href: "https://www.linkedin.com/in/mohammad-haykhal-a40aaa405",
      icon: <FaLinkedin />,
      color: "hover:text-blue-400"
    },
  ];

  return (
    <section id="contact" className="px-6 md:px-20 py-24 bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Get In <span className="text-cyan-400">Touch</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            I'm currently looking for new opportunities and collaborations. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              target={link.href.startsWith("mailto:") ? "_self" : "_blank"}
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-slate-900 border border-slate-800 p-8 rounded-2xl flex flex-col items-center text-center gap-4 transition-all hover:border-cyan-500/50 hover:bg-slate-800/50 group"
            >
              <div className={`text-4xl text-gray-500 transition-colors duration-300 ${link.color}`}>
                {link.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{link.name}</h3>
                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  {link.value}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <a
            href="mailto:mohdhaykhal67@gmail.com"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all hover:scale-105"
          >
            <FaEnvelope /> Say Hello
          </a>
        </motion.div>
      </div>
    </section>
  );
}