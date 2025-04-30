"use client";
import { useState } from "react";
import Navbar from "@/components/navbar";
import AuthForm from "@/components/auth/AuthForm";
import Input from "@/components/common/Input";
import PasswordInput from "@/components/auth/PasswordInput";
import Button from "@/components/common/Button";
import SocialLogin from "@/components/auth/SocialLogin";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", formData);
  };

  return (
    <div className="min-h-screen bg-[#FCF8CA] flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center p-4">
        <AuthForm title="Masuk ke Akun" subtitle="Yuk, daftarkan akunmu sekarang juga!">
          <form onSubmit={handleSubmit}>
            <Input label="E-Mail" type="email" name="email" value={formData.email} onChange={handleChange} required />

            <PasswordInput label="Password" name="password" value={formData.password} onChange={handleChange} required />

            <div className="space-y-3">
              <Button type="submit" onClick={() => router.push("/home")} className="w-full">
                Masuk
              </Button>

              <Button variant="outline" type="button" onClick={() => router.push("/register")} className="w-full">
                Daftar
              </Button>

              <SocialLogin onGoogleLogin={() => router.push("https://accounts.google.com")} />
            </div>
          </form>
        </AuthForm>
      </main>
    </div>
  );
};

export default LoginPage;
