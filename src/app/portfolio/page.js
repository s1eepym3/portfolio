import Navbar from "../../components/Navbar";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Portfolio() {
  return (
    <main className="min-h-screen bg-slate-900 text-white p-16">
      <h1 className="text-4xl font-bold text-sky-400 mb-10">
        My Portfolio
      </h1>

      <div className="grid md:grid-cols-2 gap-8">

        {/* Project 1 */}
        <div className="bg-slate-800 p-6 rounded-xl hover:scale-105 transition">
          <h2 className="text-2xl font-semibold mb-2">
            Secure Data Storage with End-to-End Encryption
          </h2>
          <p className="text-gray-300 mb-4">
            Tech Stack: Node.js, MongoDB, AES-256, RSA
          </p>
          <button className="bg-sky-400 text-black px-4 py-2 rounded">
            View Project
          </button>
        </div>

        {/* Project 2 */}
        <div className="bg-slate-800 p-6 rounded-xl hover:scale-105 transition">
          <h2 className="text-2xl font-semibold mb-2">
            Indoor Positioning System (BLE + ML)
          </h2>
          <p className="text-gray-300 mb-4">
            Sistem deteksi lokasi ruangan menggunakan BLE dan Machine Learning.
          </p>
          <button className="bg-sky-400 text-black px-4 py-2 rounded">
            View Project
          </button>
        </div>

      </div>
    </main>
  );
}