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
  // State untuk UI
  const [activeTab, setActiveTab] = useState("semua-kelas");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [visibleCourses, setVisibleCourses] = useState(6);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [isAddingCourse, setIsAddingCourse] = useState(false);

  // State untuk kursus baru
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    instructor: "",
    price: "",
    category: "bisnis",
    rating: 4,
    duration: "10 jam",
    students: 0,
  });

  // Data untuk navbar
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

  // Data kursus utama
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Big 4 Auditor Financial Analyst",
      description: "Pelajari analisis keuangan tingkat lanjut dari auditor berpengalaman di Big 4.",
      instructor: "Jenna Ortega",
      instructorTitle: "Senior Accountant di Gojek",
      rating: 4.5,
      reviewCount: 86,
      price: "Rp 300rb",
      discountPrice: "Rp 250rb",
      category: "bisnis",
      duration: "12 jam",
      students: 1250,
      isBestseller: true,
      isNew: false,
      image: "/course1.jpg",
    },
    // ... (data lainnya tetap sama)
  ]);

  // Fungsi CRUD
  const addNewCourse = () => {
    if (!newCourse.title || !newCourse.description || !newCourse.price) {
      alert("Harap isi judul, deskripsi, dan harga!");
      return;
    }

    setCourses([
      ...courses,
      {
        id: courses.length + 1,
        ...newCourse,
        instructorTitle: "Instruktur Baru",
        reviewCount: 0,
        isBestseller: false,
        isNew: true,
        image: "/course-default.jpg",
        discountPrice: "",
      },
    ]);

    setNewCourse({
      title: "",
      description: "",
      instructor: "",
      price: "",
      category: "bisnis",
      rating: 4,
      duration: "10 jam",
      students: 0,
    });
    setIsAddingCourse(false);
  };

  const updateCourse = (id, updatedData) => {
    setCourses(courses.map((course) => (course.id === id ? { ...course, ...updatedData } : course)));
  };

  const deleteCourse = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus kursus ini?")) {
      setCourses(courses.filter((course) => course.id !== id));
    }
  };

  // Handler functions
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setVisibleCourses(6);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert(`Terima kasih! Email ${email} telah terdaftar.`);
      setEmail("");
      setLoading(false);
    }, 1000);
  };

  const loadMoreCourses = () => {
    setVisibleCourses((prev) => prev + 3);
  };

  const handleNewCourseChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prev) => ({ ...prev, [name]: value }));
  };

  // Filter dan sorting
  const filteredCourses = activeTab === "semua-kelas" ? courses : courses.filter((course) => course.category === activeTab);

  const searchedCourses = searchQuery
    ? filteredCourses.filter(
        (course) => course.title.toLowerCase().includes(searchQuery.toLowerCase()) || course.description.toLowerCase().includes(searchQuery.toLowerCase()) || course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredCourses;

  const sortedCourses = [...searchedCourses].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "students") return b.students - a.students;
    if (sortBy === "price") {
      const priceA = parseInt((a.discountPrice || a.price).replace(/\D/g, ""));
      const priceB = parseInt((b.discountPrice || b.price).replace(/\D/g, ""));
      return priceA - priceB;
    }
    return 0;
  });

  const visibleCoursesList = sortedCourses.slice(0, visibleCourses);

  return (
    <div className="min-h-screen bg-[#FCF8CA]">
      <Head>
        <title>hariesok.id - Platform Belajar Video Interaktif</title>
        <meta name="description" content="Temukan ilmu baru melalui video pembelajaran berkualitas tinggi dengan latihan interaktif" />
      </Head>

      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} showHomepageElements={true} categories={navCategories} searchQuery={searchQuery} onSearchChange={(e) => setSearchQuery(e.target.value)} />

      <HeroSection title="Revolusi Pembelajaran: Temukan Ilmu Baru!" description="Temukan ilmu baru yang menarik melalui koleksi video pembelajaran berkualitas tinggi dengan latihan interaktif." buttonText="Temukan Video Course" />

      <section className="container mx-auto px-4 mt-12 mb-16">
        <div className="flex justify-between items-center mb-6">
          <CourseFilter
            activeTab={activeTab}
            onTabClick={handleTabClick}
            title="Koleksi Video Pembelajaran"
            subtitle="Jelajahi dunia pengetahuan melalui pilihan kami!"
            tabs={tabs}
            sortBy={sortBy}
            onSortChange={(e) => setSortBy(e.target.value)}
          />

          <Button onClick={() => setIsAddingCourse(true)} className="bg-green-600 hover:bg-green-700 text-white">
            + Tambah Kursus
          </Button>
        </div>

        {isAddingCourse && (
          <div className="bg-white text-black p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-bold mb-4">Tambah Kursus Baru</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Judul Kursus</label>
                <input type="text" name="title" value={newCourse.title} onChange={handleNewCourseChange} className="w-full p-2 border rounded" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Kategori</label>
                <select name="category" value={newCourse.category} onChange={handleNewCourseChange} className="w-full p-2 border rounded">
                  {tabs
                    .filter((t) => t.id !== "semua-kelas")
                    .map((tab) => (
                      <option key={tab.id} value={tab.id}>
                        {tab.label}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Instruktur</label>
                <input type="text" name="instructor" value={newCourse.instructor} onChange={handleNewCourseChange} className="w-full p-2 border rounded" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Harga</label>
                <input type="text" name="price" value={newCourse.price} onChange={handleNewCourseChange} className="w-full p-2 border rounded" placeholder="Contoh: Rp 300rb" required />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Deskripsi</label>
                <textarea name="description" value={newCourse.description} onChange={handleNewCourseChange} className="w-full p-2 border rounded" rows="3" required />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button onClick={() => setIsAddingCourse(false)} variant="outline" className="border-gray-300">
                Batal
              </Button>
              <Button onClick={addNewCourse} className="bg-blue-600 hover:bg-blue-700">
                Simpan Kursus
              </Button>
            </div>
          </div>
        )}

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
                  {...course}
                  onDelete={() => deleteCourse(course.id)}
                  onEdit={() => {
                    const newTitle = prompt("Edit judul:", course.title);
                    if (newTitle) updateCourse(course.id, { title: newTitle });
                  }}
                />
              ))}
            </div>

            {visibleCourses < sortedCourses.length && (
              <div className="text-center mt-10">
                <Button onClick={loadMoreCourses} variant="outline" className="border border-[#F64920] text-[#F64920] hover:bg-[#F64920] hover:text-white">
                  Muat Lebih Banyak
                </Button>
              </div>
            )}
          </>
        )}
      </section>

      <Newsletter
        title="Mau Belajar Lebih Banyak?"
        description="Daftarkan email untuk mendapatkan informasi terbaru dan penawaran spesial"
        onSubmit={handleSubscribe}
        email={email}
        onEmailChange={(e) => setEmail(e.target.value)}
        loading={loading}
      />

      <Footer />
    </div>
  );
};

export default HalamanUtama;
