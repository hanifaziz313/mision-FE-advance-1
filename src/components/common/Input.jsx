const Input = ({ label, type = "text", name, value, onChange, required = false, className = "", ...props }) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && <label className="block text-gray-700 text-sm font-medium mb-1">{label}</label>}
      <input type={type} name={name} value={value} onChange={onChange} required={required} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3A354161] text-black" {...props} />
    </div>
  );
};

export default Input;
