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

// Data dummy untuk menyimpan user yang terdaftar
let registeredUsers = [];

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
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Hapus error saat user mulai mengetik
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nama lengkap wajib diisi";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email wajib diisi";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email tidak valid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Nomor HP wajib diisi";
    }

    if (!formData.password) {
      newErrors.password = "Password wajib diisi";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password minimal 6 karakter";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Password tidak cocok";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulasi proses registrasi
    setTimeout(() => {
      const newUser = {
        id: Date.now(),
        ...formData,
        countryCode,
        registeredAt: new Date().toISOString(),
      };

      registeredUsers.push(newUser);
      console.log("User terdaftar:", newUser);
      console.log("Semua user terdaftar:", registeredUsers);

      setIsLoading(false);
      router.push("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FCF8CA] flex flex-col">
      <Navbar />

      <div className="flex-grow flex items-center justify-center p-4">
        <AuthForm title="Pendaftaran Akun" subtitle="Yuk, daftarkan akunmu sekarang juga!">
          <form onSubmit={handleSubmit} className="text-[#333333AD]">
            <Input label="Nama Lengkap" name="name" value={formData.name} onChange={handleChange} placeholder="Masukan Nama" required error={errors.name} />

            <Input label="E-Mail" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Masukkan email" required error={errors.email} />

            <PhoneInput label="No.Hp" name="phone" value={formData.phone} onChange={handleChange} countryCode={countryCode} onCountryChange={(e) => setCountryCode(e.target.value)} countryFlags={countryFlags} required error={errors.phone} />

            <PasswordInput label="Password" name="password" value={formData.password} onChange={handleChange} required error={errors.password} />

            <PasswordInput label="Konfirmasi Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required error={errors.confirmPassword} />

            <div className="text-right mt-1 mb-4">
              <a href="#" className="text-[#333333] hover:text-blue-800 text-sm">
                Lupa Password?
              </a>
            </div>

            <div className="space-y-3">
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Mendaftarkan..." : "Daftar"}
              </Button>

              <Button variant="secondary" type="button" onClick={() => router.push("/")} className="w-full">
                Masuk
              </Button>

              <SocialLogin
                onGoogleLogin={() => {
                  console.log("Login dengan Google");
                  router.push("https://accounts.google.com");
                }}
              />
            </div>
          </form>
        </AuthForm>
      </div>
    </div>
  );
};

export default RegisterPage;
