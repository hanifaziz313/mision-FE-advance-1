const CourseFilter = ({ activeTab, onTabClick, title, subtitle, tabs = [], sortBy, onSortChange }) => {
  // Pastikan tabs selalu berupa array sebelum di-mapping
  const safeTabs = Array.isArray(tabs) ? tabs : [];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      <p className="text-gray-600 mb-4">{subtitle}</p>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex overflow-x-auto pb-2">
          {safeTabs.map((tab) => (
            <button key={tab.id} onClick={() => onTabClick(tab.id)} className={`px-4 py-2 mr-2 rounded-full whitespace-nowrap ${activeTab === tab.id ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
              {tab.label}
            </button>
          ))}
        </div>

        <select value={sortBy} onChange={onSortChange} className="px-4 py-2 border rounded-md bg-white">
          <option value="default">Urutkan</option>
          <option value="rating">Rating Tertinggi</option>
          <option value="students">Paling Banyak Siswa</option>
          <option value="price">Harga Terendah</option>
        </select>
      </div>
    </div>
  );
};

export default CourseFilter;
