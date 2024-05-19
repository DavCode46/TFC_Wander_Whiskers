import { useState } from "react";
import useTheme from "@/context/ThemeContext";
const CustomSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const {themeMode} = useTheme()
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
    <div className="flex items-center border border-gray-300 rounded-md shadow-md overflow-hidden">
      <input
        className={`${themeMode === 'dark' ? 'bg-[#081C24] text-dark-white border border-a-10 focus:outline-dark-primary' : 'text-gray-700 '} px-4 py-2 flex-1 focus:outline-none`}
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder="Buscar"
      />
      <button className={`${themeMode === 'dark' ? 'bg-dark-primary hover:bg-a-6' : 'bg-color-btn hover:bg-color-btnHover'} px-4 py-2 text-white focus:outline-none transition-all duration-300`}>
        Buscar
      </button>
    </div>
  );
};

export default CustomSearch;
