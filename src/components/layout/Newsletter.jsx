import { useState } from "react";
import Image from "next/image";

const Newsletter = ({ title, description, onSubmit, email, onEmailChange, loading }) => {
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Email kosong?
    if (!email.trim()) {
      setError("Email tidak boleh kosong.");
      return;
    }
    // Cek format email valid atau tidak
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Format email tidak valid.");
      return;
    }
    // Kalau semua OK, submit
    setError("");
    onSubmit(e);
  };

  return (
    <section className="relative w-full py-16 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/newslatter.jpg" // <-- ganti ke path gambarmu
          alt="Background Newsletter"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      {/* Black Transparent Layer */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative z-10 container text-center text-white px-4">
        <h2 className="text-gray-400 uppercase text-sm tracking-wider mb-2">NEWSLETTER</h2>
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="text-gray-300 max-w-2xl mx-auto mb-8">{description}</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto flex flex-col gap-3">
          <div className="flex bg-white rounded-full overflow-hidden shadow-lg">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                onEmailChange(e);
                setError(""); // Reset error saat user mengetik
              }}
              placeholder="Masukkan Emailmu"
              className="flex-grow px-6 py-4 text-gray-700 focus:outline-none"
              required
            />
            <button type="submit" className="bg-[#f0ad4e] hover:bg-[#ec971f] text-white font-semibold px-8 py-4 transition disabled:opacity-70" disabled={loading}>
              {loading ? "Memproses..." : "Subscribe"}
            </button>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
