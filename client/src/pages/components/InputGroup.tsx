import React from "react";
import ClassNames from "classnames";

interface InputGroupProps {
  className?: string; // optional
  type: string;
  placeholder: string;
  value: string;
  error: string | undefined;
  setValue: (str: string) => void;
}

const InputGroup: React.FC<InputGroupProps> = ({
  error,
  placeholder,
  setValue,
  type,
  value,
  className,
}) => {
  return (
    <div className={className}>
      <input
        type={type}
        className={ClassNames(
          "w-full p-3 transition border border-gray-300 rounded outline-none duaration-200 bg-gray-50 focus:bg-white hover:bg-white",
          { "border-red-500": error }
        )}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <small className="font-medium text-red-600">{error}</small>
    </div>
  );
};

export default InputGroup;
