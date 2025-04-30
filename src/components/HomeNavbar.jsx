import Link from "next/link";
import { useEffect } from "react";

const Navbar = ({ isMenuOpen, setIsMenuOpen }) => {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsMenuOpen]);

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <svg width="237" height="56" viewBox="0 0 237 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M27.824 36.04L22 20.168H26.288L30.32 32.168L34.352 20.168H38.64L32.784 36.04H27.824Z" fill="#F64920" />
              {/* ... (logo paths lainnya) ... */}
            </svg>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-800 hover:text-[#F64920] transition">
              Beranda
            </Link>
            <Link href="/courses" className="text-gray-800 hover:text-[#F64920] transition">
              Kelas
            </Link>
            <Link href="/about" className="text-gray-800 hover:text-[#F64920] transition">
              Tentang
            </Link>
            <Link href="/contact" className="text-gray-800 hover:text-[#F64920] transition">
              Kontak
            </Link>

            {/* Profile */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                <img src="/profile.jpg" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <span className="text-gray-800">Admin</span>
            </div>
          </div>

          {/* Mobile Toggle Button */}
          <button className="md:hidden text-gray-800 focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-800 hover:text-[#F64920] px-4 py-2" onClick={() => setIsMenuOpen(false)}>
                Beranda
              </Link>
              <Link href="/courses" className="text-gray-800 hover:text-[#F64920] px-4 py-2" onClick={() => setIsMenuOpen(false)}>
                Kelas
              </Link>
              <Link href="/about" className="text-gray-800 hover:text-[#F64920] px-4 py-2" onClick={() => setIsMenuOpen(false)}>
                Tentang
              </Link>
              <Link href="/contact" className="text-gray-800 hover:text-[#F64920] px-4 py-2" onClick={() => setIsMenuOpen(false)}>
                Kontak
              </Link>

              {/* Profile Mobile */}
              <div className="flex items-center space-x-2 px-4 py-2">
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                  <img src="/profile.jpg" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <span className="text-gray-800">Admin</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
