import Image from "next/image";
import { useState } from "react";
import { FaRegBookmark, FaBookmark, FaRegHeart, FaHeart } from "react-icons/fa";

const CourseCard = ({ id, title, description, instructor, instructorTitle, rating, reviewCount, price, discountPrice, duration, students, isBestseller, isNew }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1 relative">
      {/* Bookmark Button */}
      <button onClick={() => setIsBookmarked(!isBookmarked)} className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition" aria-label={isBookmarked ? "Hapus bookmark" : "Tambahkan bookmark"}>
        {isBookmarked ? <FaBookmark className="text-[#F64920]" /> : <FaRegBookmark className="text-gray-500" />}
      </button>

      {/* Course Image */}
      <div className="relative aspect-video">
        <Image src={`/card${id}.jpeg`} alt={`Kelas ${title}`} width={400} height={225} className="w-full h-full object-cover" priority={id <= 3} />

        {/* Rating Badge */}
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-sm px-2 py-1 rounded">{rating.toFixed(1)}/5</div>

        {/* Bestseller Badge */}
        {isBestseller && <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded font-medium">Bestseller</div>}

        {/* New Badge */}
        {isNew && <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded font-medium">Baru!</div>}
      </div>

      <div className="p-5">
        {/* Course Title */}
        <h3 className="text-xl font-bold mb-2 line-clamp-2 text-black" title={title}>
          {title}
        </h3>

        {/* Course Description */}
        <p className="text-gray-600 mb-4 line-clamp-2" title={description}>
          {description}
        </p>

        {/* Instructor Info */}
        <div className="flex items-center mb-4 ">
          <div className="relative w-10 h-10 rounded-full mr-3 overflow-hidden">
            <Image src={`/profil${id}.png`} alt={`Instruktur ${instructor}`} width={40} height={40} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="font-semibold text-black">{instructor}</p>
            <p className="text-gray-500 text-sm line-clamp-1" title={instructorTitle}>
              {instructorTitle}
            </p>
          </div>
        </div>

        {/* Rating and Price */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <div className="flex text-yellow-400 mr-1">
              {[...Array(5)].map((_, i) => (
                <span key={i}>{i < Math.floor(rating) ? <span>★</span> : i === Math.floor(rating) && rating % 1 > 0 ? <span>½</span> : <span>☆</span>}</span>
              ))}
            </div>
            <span className="text-gray-500 text-sm ml-1">({reviewCount})</span>
          </div>

          {discountPrice ? (
            <div className="text-right">
              <span className="text-gray-400 line-through text-sm block">{price}</span>
              <span className="text-[#3ecf4c] font-bold">{discountPrice}</span>
            </div>
          ) : (
            <span className="text-[#3ecf4c] font-bold">{price}</span>
          )}
        </div>

        {/* Course Meta */}
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>⏱️ {duration}</span>
          <span>👥 {students.toLocaleString()} siswa</span>
        </div>

        {/* Like Button */}
        <div className="flex justify-end mt-3">
          <button onClick={() => setIsLiked(!isLiked)} className="flex items-center text-sm text-gray-500 hover:text-[#F64920] transition" aria-label={isLiked ? "Tidak suka kursus ini" : "Suka kursus ini"}>
            {isLiked ? <FaHeart className="text-[#F64920] mr-1" /> : <FaRegHeart className="mr-1" />}
            {isLiked ? "Disukai" : "Suka"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
