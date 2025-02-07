import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { MdMarkEmailRead } from "react-icons/md";
function FormInput({ type, placeholder, name, onChange }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <label className="relative flex items-center gap-2 w-full">
      <input
        type={type === "password" && showPassword ? "text" : type}
        placeholder={placeholder}
        name={name}
        className="input input-bordered w-full input-sm md:input-md px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={onChange}
      />
      {type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <EyeOff size={24} className="text-teal-800" /> : <Eye size={24} className="text-teal-800" />}
        </button>
      )}
      {type === "email" && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 text-2xl text-teal-800 hover:text-gray-700"
        >
         <MdMarkEmailRead />
        </button>
      )}
    </label>
  );
}

export default FormInput;
