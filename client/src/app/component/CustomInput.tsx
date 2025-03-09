import React, { useEffect, useState } from "react";

interface CustomInputProps {
  fields: string[];
  title: string;
  typeSubmit: string;
  onSubmit: (data: Record<string, string>) => void;
  defaultValues?: Partial<Record<string, string>>; 
}

const CustomInput: React.FC<CustomInputProps> = ({ 
  fields, 
  title, 
  typeSubmit, 
  onSubmit, 
  defaultValues = {} 
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});

  useEffect(() => {
    setFormData((prev) => {
      const updatedData: Record<string, string> = {};
      fields.forEach(field => {
        updatedData[field] = defaultValues[field] ?? prev[field] ?? "";
      });
      return updatedData;
    });
  }, [defaultValues, fields]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-gray-700 text-center mb-4">
       {title}
      </h2>

      <div className="space-y-4">
        {fields.map((field) => (
          <div key={field} className="flex flex-col">
            <label className="text-black font-medium capitalize mb-1">
              {field}
            </label>
            <input
              type="text"
              value={formData[field] || ""}
              onChange={(e) => handleChange(field, e.target.value)}
              className="border text-black border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none rounded-lg px-4 py-2 transition duration-200"
              placeholder={`Enter ${field}`}
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="mt-5 w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 rounded-lg shadow-md transition-all duration-300"
      >
        {typeSubmit}
      </button>
    </div>
  );
};

export default CustomInput;
