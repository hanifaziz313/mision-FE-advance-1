const CourseFilter = ({ activeTab, onTabClick, title, subtitle, tabs }) => {
  return (
    <div className="text-start mb-10 ps-4">
      <h2 className="text-3xl font-poppins font-bold text-black">{title}</h2>
      <p className="text-lg font-dm-sans text-gray-600 mt-2">{subtitle}</p>

      {/* Tab Navigasi */}
      <div className="flex justify-start  mt-6 flex-wrap gap-2">
        {tabs.map((tab) => (
          <button key={tab.id} className={`px-4 py-2 rounded-full font-medium ${activeTab === tab.id ? "bg-[#F64920] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`} onClick={() => onTabClick(tab.id)}>
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CourseFilter;
