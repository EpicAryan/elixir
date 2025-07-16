
import React, { useId, useState } from 'react';

interface FloatingInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  icon?: React.ReactNode;
}

export default function FloatingInput({ 
  label, 
  type = "text", 
  value, 
  onChange, 
  className = "",
  icon 
}: FloatingInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const id = useId();
  const hasValue = value.length > 0;
  const shouldFloat = isFocused || hasValue;

  return (
    <div className={`relative ${className}`}>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white transition-all duration-200  ${
          icon ? 'pr-10' : ''
        }`}
        placeholder=""
      />
      
      <label
        htmlFor={id}
        className={`absolute left-3 transition-all duration-200 ease-in-out pointer-events-none
          ${shouldFloat 
            ? 'top-0 -translate-y-1/2 text-xs font-medium text-red-500 bg-white px-2 z-10' 
            : 'top-1/2 -translate-y-1/2 text-gray-500'
          }`}
      >
        {label}
      </label>
      
      {icon && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {icon}
        </div>
      )}
    </div>
  );
}
