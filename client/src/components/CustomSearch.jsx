import { useState } from "react";

const CustomSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

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
        className="px-4 py-2 flex-1 text-gray-700 focus:outline-none"
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder="Buscar"
      />
      <button className="px-4 py-2 bg-color-btn text-white hover:bg-color-btnHover focus:outline-none">
        Buscar
      </button>
    </div>
  );
};

export default CustomSearch;
