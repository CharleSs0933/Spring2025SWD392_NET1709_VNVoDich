import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

interface FieldConfig {
  name: string;
  type: "text" | "select" | "switch";
  options?: string[]; 
}

interface CustomInputProps {
  fields: FieldConfig[];
  title: string;
  typeSubmit: string;
  onSubmit: (data: Record<string, string | boolean>) => void;
  onClose?: () => void;
  defaultValues?: Partial<Record<string, string | boolean>>;
}

const CustomInput: React.FC<CustomInputProps> = ({ 
  fields, 
  title, 
  typeSubmit, 
  onSubmit, 
  onClose,
  defaultValues = {} 
}) => {
  const [formData, setFormData] = useState<Record<string, string | boolean>>({});
  
  useEffect(() => {
    setFormData((prev) => {
      const updatedData: Record<string, string | boolean> = {};
      fields.forEach(({ name, type }) => {
        updatedData[name] = defaultValues[name] ?? prev[name] ?? (type === "switch" ? false : "");
      });
      return updatedData;
    });
  }, [defaultValues, fields]);

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 ">
      <div className="flex justify-center items-center gap-5 mb-4">
      <h2 className="text-xl font-semibold text-white-100 text-center ">
       {title}
      </h2>
      {onClose && (
      <button onClick={onClose} >
        <X/>
      </button>
      )}
      </div>

      <div className="space-y-4">
        {fields.map(({ name, type, options }) => (
          <div key={name} className="flex flex-col">
            <label className="text-white-100 font-medium capitalize mb-1">
              {name}
            </label>

            {type === "text" && (
              <input
                type="text"
                value={formData[name] as string || ""}
                onChange={(e) => handleChange(name, e.target.value)}
                className="border text-black border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none rounded-lg px-4 py-2 transition duration-200"
                placeholder={`Enter ${name}`}
              />
            )}

            {type === "select" && options && (
              <select
                value={formData[name] as string || ""}
                onChange={(e) => handleChange(name, e.target.value)}
                className="border text-black border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none rounded-lg px-4 py-2 transition duration-200"
              >
                <option value="">Select {name}</option>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}

            {type === "switch" && (
              <div className="flex items-center">
                <span className="mr-2 text-gray-600">{formData[name] ? "On" : "Off"}</span>
                <button
                  onClick={() => handleChange(name, !(formData[name] as boolean))}
                  className={`w-12 h-6 flex items-center bg-black rounded-full p-1 transition duration-300 ${
                    formData[name] ? "bg-blue-500" : ""
                  }`}
                >
                  <div
                    className={`bg-white-100 w-5 h-5 rounded-full shadow-md transform transition duration-300 ${
                      formData[name] ? "translate-x-6" : ""
                    }`}
                  ></div>
                </button>
              </div>
            )}
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
