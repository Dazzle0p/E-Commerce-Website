import React from "react";
import { useSearchParams } from "react-router-dom";

const SortOptions = () => {
  const [serchParams, setSerchParams] = useSearchParams();
  const handleSortChange = (e) => {};
  return (
    <div className="mb-4 flex items-center justify-end">
      <select
        id="sort"
        onChange={handleSortChange}
        className="border p-2 rounded-md focus:outline-none"
      >
        <option value="">Default</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  );
};

export default SortOptions;
