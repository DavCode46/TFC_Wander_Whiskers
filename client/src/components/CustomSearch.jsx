import { useState } from "react";
import useTheme from "@context/ThemeContext";
const CustomSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { themeMode } = useTheme();
  const handleInputChange = (event) => {
    const newSearchTerm = event.target.value;

    setSearchTerm(newSearchTerm);
    if (onSearch) {
      onSearch(newSearchTerm);
    }
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center border rounded-md shadow-md overflow-hidden">
      <input
        className={`${
          themeMode === "dark"
            ? "bg-[#081C24] text-dark-white  focus:outline-dark-primary"
            : "text-gray-700 "
        } px-4 py-1 min-w-[12rem] flex-1 focus:outline-none`}
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder="Buscar"
      />
    </div>
  );
};

export default CustomSearch;
