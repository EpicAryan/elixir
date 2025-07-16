import React, { useEffect, useRef, useState } from "react";
import {
  getCountryCallingCode,
  AsYouType,
  isValidPhoneNumber,
  CountryCode,
} from "libphonenumber-js";
import { matchSorter } from "match-sorter";
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
import Image from "next/image";

countries.registerLocale(en);

const allCountries = countries.getAlpha2Codes();


const validCountryCodes = Object.keys(allCountries).filter((code) => {
  try {
    getCountryCallingCode(code as CountryCode);
    return true;
  } catch {
    return false;
  }
});

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function PhoneDropdown({ value, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>("IN");
  const [localNumber, setLocalNumber] = useState("");
  const [search, setSearch] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredCountries = matchSorter(validCountryCodes, search, {
    keys: [(code) => countries.getName(code, "en") || code],
  });

  const handleCountrySelect = (code: CountryCode) => {
    setSelectedCountry(code);
    setIsOpen(false);
    setSearch("");
    setHighlightedIndex(0);

    const newPrefix = "+" + getCountryCallingCode(code);
    const formatted = new AsYouType(code).input(localNumber);
    const newValue = newPrefix + formatted.replace(/\D/g, "");
    onChange(newValue);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const formatted = new AsYouType(selectedCountry).input(raw);
    setLocalNumber(formatted);

    const full = `+${getCountryCallingCode(selectedCountry)}${formatted.replace(/\D/g, "")}`;
    onChange(full);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isOpen) return;

    if (e.key === "ArrowDown") {
      setHighlightedIndex((prev) => (prev + 1) % filteredCountries.length);
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prev) => (prev - 1 + filteredCountries.length) % filteredCountries.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleCountrySelect(filteredCountries[highlightedIndex] as CountryCode);
    }
  };

  const isValid = isValidPhoneNumber(value || "");

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full relative" ref={dropdownRef} onKeyDown={handleKeyDown}>

    <div
        className={`flex items-center rounded-lg px-3 py-2 sm:py-3.5 bg-white transition-all duration-200 border
            ${isValid || !value ? 'border-gray-300' : 'border-red-500 border'}
        `}
    >
        {/* Country Selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 pr-2 border-r border-gray-300"
          >
            <Image
                width={40}
                height={40}
              src={`https://flagcdn.com/w40/${selectedCountry.toLowerCase()}.png`}
              alt={selectedCountry}
              className="w-5 h-4 rounded-xs"
            />
            <span className="text-sm font-medium">
              +{getCountryCallingCode(selectedCountry)}
            </span>
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown */}
          {isOpen && (
            <div className="absolute z-20 mt-1 bg-white border shadow-lg w-72 max-h-52 sm:max-h-64 overflow-y-auto rounded-lg text-left">
              <input
                type="text"
                placeholder="Search countries..."
                className="w-full px-3 py-2 border-b outline-none"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setHighlightedIndex(0);
                }}
              />
              {filteredCountries.map((code, index) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => handleCountrySelect(code as CountryCode)}
                  className={`w-full px-3 py-2 hover:bg-gray-100 flex items-center gap-2 text-sm ${
                    highlightedIndex === index ? "bg-gray-100" : ""
                  }`}
                >
                  <Image
                    width={40}
                    height={40}
                    src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`}
                    className="w-5 h-4 rounded-xs"
                    alt={code}
                  />
                  <span className="font-medium">{countries.getName(code, "en")}</span>
                  <span className="ml-auto">+{getCountryCallingCode(code as CountryCode)}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Input field */}
        <input
          type="tel"
          value={localNumber}
          onChange={handleNumberChange}
          className="ml-3 flex-1 outline-none border-none text-sm"
          placeholder="Enter phone number"
        />
      </div>

      {/* Validation Message */}
      {!isValid && value && (
        <div className="text-xs text-red-500 mt-1">Invalid phone number</div>
      )}
    </div>
  );
}
