"use client";
import { useState } from "react";
import Head from "next/head";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/layout/HeroSection";
import CourseFilter from "@/components/course/CourseFilter";
import CourseCard from "@/components/course/CourseCard";
import Newsletter from "@/components/layout/Newsletter";
import Footer from "@/components/layout/Footer";
import Button from "@/components/common/Button";

const HalamanUtama = () => {
  const [activeTab, setActiveTab] = useState("semua-kelas");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [visibleCourses, setVisibleCourses] = useState(6);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Data untuk navbar (kategori dan profil)
  const navCategories = [{ id: "pemasaran", name: "Kategori" }];
  // Data tabs untuk filter
  const tabs = [
    { id: "semua-kelas", label: "Semua Kelas" },
    { id: "pemasaran", label: "Pemasaran" },
    { id: "desain", label: "Desain" },
    { id: "pengembangan-diri", label: "Pengembangan Diri" },
    { id: "bisnis", label: "Bisnis" },
    { id: "teknologi", label: "Teknologi" },
  ];

  // Data lengkap kursus
  const courses = [
    {
      id: 1,
      title: "Big 4 Auditor Financial Analyst",
      description: "Pelajari analisis keuangan tingkat lanjut dari auditor berpengalaman di Big 4.",
      instructor: "Jenna Ortega",
      instructorTitle: "Senior Accountant di Gojek",
      rating: 4.5,
      reviewCount: 86,
      price: "Rp 300k",
      discountPrice: "Rp 250k",
      category: "bisnis",
      duration: "12 jam",
      students: 1250,
      isBestseller: true,
      isNew: false,
      image: "/course1.jpg",
    },
    {
      id: 2,
      title: "Digital Marketing Masterclass 2023",
      description: "Kuasi semua channel digital marketing dari dasar hingga advanced.",
      instructor: "Mark Zuckerberg",
      instructorTitle: "Digital Marketing Expert",
      rating: 4.8,
      reviewCount: 142,
      price: "Rp 350k",
      category: "pemasaran",
      duration: "15 jam",
      students: 2100,
      isBestseller: true,
      isNew: true,
      image: "/course2.jpg",
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      description: "Pelajari prinsip dasar desain antarmuka dan pengalaman pengguna.",
      instructor: "Sarah Johnson",
      instructorTitle: "Lead Designer di Tokopedia",
      rating: 4.7,
      reviewCount: 98,
      price: "Rp 280k",
      category: "desain",
      duration: "10 jam",
      students: 1800,
      isBestseller: false,
      isNew: true,
      image: "/course3.jpg",
    },
    {
      id: 4,
      title: "Public Speaking & Presentasi Memukau",
      description: "Tingkatkan kepercayaan diri dan kemampuan presentasi Anda.",
      instructor: "James Smith",
      instructorTitle: "Professional Speaker",
      rating: 4.9,
      reviewCount: 75,
      price: "Rp 320k",
      category: "pengembangan-diri",
      duration: "8 jam",
      students: 950,
      isBestseller: false,
      isNew: false,
      image: "/course4.jpg",
    },
    {
      id: 5,
      title: "Manajemen Bisnis untuk Startup",
      description: "Strategi mengelola bisnis startup dari nol hingga sukses.",
      instructor: "Elon Musk",
      instructorTitle: "CEO SpaceX & Tesla",
      rating: 4.6,
      reviewCount: 112,
      price: "Rp 400k",
      category: "bisnis",
      duration: "20 jam",
      students: 3000,
      isBestseller: true,
      isNew: false,
      image: "/course5.jpg",
    },
    {
      id: 6,
      title: "Data Science untuk Pemula",
      description: "Pengenalan dunia data science dan machine learning dasar.",
      instructor: "Andrew Ng",
      instructorTitle: "AI Researcher",
      rating: 4.8,
      reviewCount: 156,
      price: "Rp 380k",
      category: "teknologi",
      duration: "18 jam",
      students: 2500,
      isBestseller: true,
      isNew: false,
      image: "/course6.jpg",
    },
    {
      id: 7,
      title: "Fotografi Profesional",
      description: "Teknik fotografi level profesional untuk semua jenis kamera.",
      instructor: "Ansel Adams",
      instructorTitle: "Professional Photographer",
      rating: 4.4,
      reviewCount: 64,
      price: "Rp 290k",
      category: "desain",
      duration: "14 jam",
      students: 1200,
      isBestseller: false,
      isNew: true,
      image: "/course7.jpg",
    },
    {
      id: 8,
      title: "Copywriting yang Menjual",
      description: "Teknik menulis konten pemasaran yang efektif dan persuasif.",
      instructor: "David Ogilvy",
      instructorTitle: "Advertising Expert",
      rating: 4.7,
      reviewCount: 88,
      price: "Rp 270k",
      category: "pemasaran",
      duration: "9 jam",
      students: 1700,
      isBestseller: false,
      isNew: false,
      image: "/course8.jpg",
    },
    {
      id: 9,
      title: "Manajemen Waktu Produktif",
      description: "Sistem manajemen waktu untuk produktivitas maksimal.",
      instructor: "Cal Newport",
      instructorTitle: "Productivity Expert",
      rating: 4.9,
      reviewCount: 105,
      price: "Rp 230k",
      category: "pengembangan-diri",
      duration: "6 jam",
      students: 2800,
      isBestseller: true,
      isNew: false,
      image: "/course9.jpg",
    },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setVisibleCourses(6);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert(`Terima kasih! Email ${email} telah terdaftar untuk berlangganan.`);
      setEmail("");
      setLoading(false);
    }, 1000);
  };

  const loadMoreCourses = () => {
    setVisibleCourses((prev) => prev + 3);
  };

  const filteredCourses = activeTab === "semua-kelas" ? courses : courses.filter((course) => course.category === activeTab);
  const visibleCoursesList = filteredCourses.slice(0, visibleCourses);

  return (
    <div className="min-h-screen bg-[#FCF8CA]">
      <Head>
        <title>hariesok.id - Platform Belajar Video Interaktif</title>
        <meta name="description" content="Temukan ilmu baru melalui video pembelajaran berkualitas tinggi dengan latihan interaktif" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&display=swap" rel="stylesheet" />
      </Head>

      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} showHomepageElements={true} categories={navCategories} />
      <HeroSection
        title="Revolusi Pembelajaran: Temukan Ilmu Baru melalui Platform Video Interaktif!"
        description="Temukan ilmu baru yang menarik dan mendalam melalui koleksi video pembelajaran berkualitas tinggi. Tidak hanya itu, Anda juga dapat berpartisipasi dalam latihan interaktif yang akan meningkatkan pemahaman Anda."
        buttonText="Temukan Video Course untuk Dipelajari!"
      />

      <section className="container mx-auto px-4 mt-12 mb-16">
        <CourseFilter activeTab={activeTab} onTabClick={handleTabClick} title="Koleksi Video Pembelajaran Unggulan" subtitle="Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!" tabs={tabs} />

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F64920]"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleCoursesList.map((course) => (
                <CourseCard
                  key={course.id}
                  id={course.id}
                  title={course.title}
                  description={course.description}
                  instructor={course.instructor}
                  instructorTitle={course.instructorTitle}
                  rating={course.rating}
                  reviewCount={course.reviewCount}
                  price={course.price}
                  discountPrice={course.discountPrice}
                  duration={course.duration}
                  students={course.students}
                  isBestseller={course.isBestseller}
                  isNew={course.isNew}
                  image={course.image}
                />
              ))}
            </div>

            {visibleCourses < filteredCourses.length && (
              <div className="text-center mt-10">
                <Button onClick={loadMoreCourses} variant="outline" className="border border-[#F64920] text-[#F64920] hover:bg-[#F64920] hover:text-white px-6 py-2 rounded-md transition">
                  Muat Lebih Banyak
                </Button>
              </div>
            )}
          </>
        )}
      </section>

      <Newsletter
        title="Mau Belajar Lebih Banyak?"
        description="Daftarkan dirimu untuk mendapatkan informasi terbaru dan penawaran spesial dari program-program terbaik hariesok.id"
        onSubmit={handleSubscribe}
        email={email}
        onEmailChange={(e) => setEmail(e.target.value)}
        loading={loading}
      />

      <Footer />

      <style jsx global>{`
        .font-poppins {
          font-family: "Poppins", sans-serif;
        }
        .font-dm-sans {
          font-family: "DM Sans", sans-serif;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default HalamanUtama;
