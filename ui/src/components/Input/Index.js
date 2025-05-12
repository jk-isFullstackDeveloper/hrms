import React from "react";

const Index = ({ label,required=false, type = "text", placeholder, value, onChange }) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium text-white mb-1">{label}</label>}
      <input
        required={required}
        type={type}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Index;
