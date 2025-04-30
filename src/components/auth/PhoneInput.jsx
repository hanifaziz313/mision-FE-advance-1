import { countryFlags } from "@/constants/countryFlags";

const PhoneInput = ({ label, id, name, value, onChange, countryCode, onCountryChange, required }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <div className="flex items-center">
        <div className="mr-2 bg-[#dedcdc] p-1">{countryFlags[countryCode]?.svg || countryFlags["+62"].svg}</div>
        <select value={countryCode} onChange={onCountryChange} className="p-2 border rounded w-24">
          {Object.keys(countryFlags).map((code) => (
            <option key={code} value={code}>
              ({code})
            </option>
          ))}
        </select>
        <input type="tel" id={id} name={name} value={value} onChange={onChange} required={required} className="ml-2 flex-grow p-2 border rounded" placeholder="Nomor Telepon" />
      </div>
    </div>
  );
};

export default PhoneInput;
