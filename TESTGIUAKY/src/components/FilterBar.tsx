// src/components/FilterBar.tsx
import React from "react";
import { useContacts, SortOption } from "../context/ContactContext";

const FilterBar: React.FC = () => {
  const { searchTerm, setSearchTerm, sortOption, setSortOption } = useContacts();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value as SortOption);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      {/* Ô tìm kiếm */}
      <input
        type="text"
        placeholder="Tìm kiếm theo tên / số ĐT"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full sm:w-auto"
      />

      {/* Sắp xếp */}
      <select
        className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        value={sortOption}
        onChange={handleSortChange}
      >
        <option value="none">Không sắp xếp</option>
        <option value="name-asc">Sắp xếp theo tên (A-Z)</option>
      </select>
    </div>
  );
};

export default FilterBar;
