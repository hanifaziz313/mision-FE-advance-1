"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import AuthForm from "@/components/auth/AuthForm";
import Input from "@/components/common/Input";
import PasswordInput from "@/components/auth/PasswordInput";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";
import { userApi } from "@/services/api";

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const users = await userApi.getAllUsers();
      const user = users.find((u) => u.email === formData.email && u.password === formData.password);
      if (user) {
        alert("Login berhasil!");
        localStorage.setItem("user", JSON.stringify(user));
        router.push("/home");
      } else {
        setError("Email atau password salah");
      }
    } catch (err) {
      console.error("Gagal login:", err);
      setError("Terjadi kesalahan saat login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FCF8CA] flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center p-4">
        <AuthForm title="Masuk ke Akun" subtitle="Yuk, daftarkan akunmu sekarang juga!">
          <form onSubmit={handleSubmit}>
            {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}

            <Input label="E-Mail" type="email" name="email" value={formData.email} onChange={handleChange} required />
            <PasswordInput label="Password" name="password" value={formData.password} onChange={handleChange} required />

            <div className="space-y-3">
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Memproses..." : "Masuk"}
              </Button>
              <Button variant="outline" type="button" onClick={() => router.push("/register")} className="w-full">
                Daftar
              </Button>
            </div>
          </form>
        </AuthForm>
      </main>
    </div>
  );
};

export default LoginPage;
