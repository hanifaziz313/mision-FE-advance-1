"use client";
import Image from "next/image";
import { useState } from "react";
import { FaRegBookmark, FaBookmark, FaRegHeart, FaHeart, FaEdit, FaTrash } from "react-icons/fa";

const CourseCard = ({
  id = 0,
  title = "Judul Kursus",
  description = "Deskripsi kursus tidak tersedia",
  instructor = "Instruktur",
  instructorTitle = "Profesi Instruktur",
  rating = 0,
  reviewCount = 0,
  price = "Rp 0",
  discountPrice = null,
  duration = "0 jam",
  students = 0,
  isBestseller = false,
  isNew = false,
  onDelete = () => {}, // Tambahkan prop onDelete dengan default function
  onEdit = () => {}, // Tambahkan prop onEdit dengan default function
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Format number dengan safety check
  const formatNumber = (num) => {
    const number = Number(num);
    return isNaN(number) ? 0 : number.toLocaleString("id-ID");
  };

  // Format harga dengan safety check
  const formatPrice = (priceStr) => {
    if (!priceStr) return "Rp 0";

    try {
      const numericValue = priceStr.toString().replace(/[^\d]/g, "");
      const number = parseInt(numericValue, 10);
      return isNaN(number) ? "Rp 0" : `Rp ${number.toLocaleString("id-ID")}`;
    } catch {
      return "Rp 0";
    }
  };

  // Render bintang rating dengan batasan 0-5
  const renderRatingStars = () => {
    const clampedRating = Math.min(Math.max(Number(rating), 0, 5));
    const fullStars = Math.floor(clampedRating);
    const hasHalfStar = clampedRating % 1 >= 0.5;

    return (
      <div className="flex text-yellow-400 mr-1">
        {[...Array(5)].map((_, i) => (
          <span key={i}>{i < fullStars ? "★" : i === fullStars && hasHalfStar ? "½" : "☆"}</span>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1 relative">
      {/* Bookmark Button */}
      <button onClick={() => setIsBookmarked(!isBookmarked)} className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition" aria-label={isBookmarked ? "Hapus bookmark" : "Tambahkan bookmark"}>
        {isBookmarked ? <FaBookmark className="text-[#F64920]" /> : <FaRegBookmark className="text-gray-500" />}
      </button>

      {/* Course Image */}
      <div className="relative aspect-video bg-gray-200">
        <Image
          src={`/card${id}.jpeg`}
          alt={`Kelas ${title}`}
          fill
          className="object-cover"
          priority={id <= 3}
          onError={(e) => {
            e.target.src = "/course-default.jpg";
            e.target.onerror = null;
          }}
        />

        {/* Badges */}
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-sm px-2 py-1 rounded">{rating?.toFixed?.(1) || "0.0"}/5</div>

        {isBestseller && <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded font-medium">Bestseller</div>}

        {isNew && <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded font-medium">Baru!</div>}
      </div>

      <div className="p-5">
        {/* Course Header */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold line-clamp-2 text-black flex-1" title={title}>
            {title}
          </h3>
        </div>

        {/* Course Description */}
        <p className="text-gray-600 mb-4 line-clamp-2" title={description}>
          {description}
        </p>

        {/* Instructor Info */}
        <div className="flex items-center mb-4">
          <div className="relative w-10 h-10 rounded-full mr-3 overflow-hidden bg-gray-300">
            <Image
              src={`/profil${id}.png`}
              alt={`Instruktur ${instructor}`}
              fill
              className="object-cover"
              onError={(e) => {
                e.target.src = "/instructor-default.png";
                e.target.onerror = null;
              }}
            />
          </div>
          <div className="overflow-hidden">
            <p className="font-semibold text-black truncate">{instructor}</p>
            <p className="text-gray-500 text-sm truncate" title={instructorTitle}>
              {instructorTitle}
            </p>
          </div>
        </div>

        {/* Rating and Price */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            {renderRatingStars()}
            <span className="text-gray-500 text-sm ml-1">({formatNumber(reviewCount)})</span>
          </div>

          <div className="text-right">
            {discountPrice ? (
              <>
                <span className="text-gray-400 line-through text-sm block">{formatPrice(price)}</span>
                <span className="text-[#3ecf4c] font-bold">{formatPrice(discountPrice)}</span>
              </>
            ) : (
              <span className="text-[#3ecf4c] font-bold">{formatPrice(price)}</span>
            )}
          </div>
        </div>

        {/* Course Meta */}
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>⏱️ {duration}</span>
          <span>👥 {formatNumber(students)} siswa</span>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-4">
          <button onClick={() => setIsLiked(!isLiked)} className="flex items-center text-sm text-gray-500 hover:text-[#F64920] transition" aria-label={isLiked ? "Tidak suka" : "Suka"}>
            {isLiked ? <FaHeart className="text-[#F64920] mr-1" /> : <FaRegHeart className="mr-1" />}
            {isLiked ? "Disukai" : "Suka"}
          </button>

          <div className="flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="p-2 text-gray-600 hover:text-blue-600 transition"
              aria-label="Edit kursus"
            >
              <FaEdit />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                if (confirm(`Yakin ingin menghapus ${title}?`)) {
                  onDelete();
                }
              }}
              className="p-2 text-gray-600 hover:text-red-600 transition"
              aria-label="Hapus kursus"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
