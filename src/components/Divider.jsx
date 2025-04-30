const Divider = ({ text = "", className = "" }) => {
  return (
    <div className={`relative my-6 ${className}`}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300"></div>
      </div>
      {text && (
        <div className="relative flex justify-center">
          <span className="px-2 bg-white text-sm text-gray-500">{text}</span>
        </div>
      )}
    </div>
  );
};

export default Divider;
