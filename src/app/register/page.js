"use client";
import { useState } from "react";
import Navbar from "@/components/navbar";
import AuthForm from "@/components/auth/AuthForm";
import Input from "@/components/common/Input";
import PasswordInput from "@/components/auth/PasswordInput";
import PhoneInput from "@/components/auth/PhoneInput";
import Button from "@/components/common/Button";
import SocialLogin from "@/components/auth/SocialLogin";
import { countryFlags } from "@/constants/countryFlags";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [countryCode, setCountryCode] = useState("+62");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register data:", formData);
  };

  return (
    <div className="min-h-screen bg-[#FCF8CA] flex flex-col">
      <Navbar />

      <div className="flex-grow flex items-center justify-center p-4">
        <AuthForm title="Pendaftaran Akun" subtitle="Yuk, daftarkan akunmu sekarang juga!">
          <form onSubmit={handleSubmit} className="text-[#333333AD]">
            <Input label="Nama Lengkap" name="name" value={formData.name} onChange={handleChange} placeholder="Masukan Nama" required />

            <Input label="E-Mail" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Masukkan email" required />

            <PhoneInput label="No.Hp" name="phone" value={formData.phone} onChange={handleChange} countryCode={countryCode} onCountryChange={(e) => setCountryCode(e.target.value)} countryFlags={countryFlags} required />

            <PasswordInput label="Password" name="password" value={formData.password} onChange={handleChange} required />

            <PasswordInput label="Konfirmasi Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />

            <div className="text-right mt-1 mb-4">
              <a href="#" className="text-[#333333] hover:text-blue-800 text-sm">
                Lupa Password?
              </a>
            </div>

            <div className="space-y-3">
              <Button type="submit" onClick={() => router.push("/")} className="w-full">
                Daftar
              </Button>

              <Button variant="secondary" type="button" onClick={() => router.push("/home")} className="w-full">
                Masuk
              </Button>

              <SocialLogin onGoogleLogin={() => router.push("https://accounts.google.com")} />
            </div>
          </form>
        </AuthForm>
      </div>
    </div>
  );
};

export default RegisterPage;
