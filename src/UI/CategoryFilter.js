import React, { useState } from "react";
import { useNewsContext } from "../Context/NewsContext";

const CategoryFilter = () => {
  const { selectedCategory, setSelectedCategory, uniqueCategories } =
    useNewsContext();
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsCategoryVisible(true);
  };

  const handleMouseLeave = () => {
    setIsCategoryVisible(false);
  };

  const handleCategoryChange = (e) => {
    const newCategories = [...selectedCategory];
    const category = e.target.value;
    const index = newCategories.indexOf(category);

    if (e.target.checked) {
      if (index === -1) {
        newCategories.push(category);
      }
    } else {
      if (index !== -1) {
        newCategories.splice(index, 1);
      }
    }
    setSelectedCategory(newCategories);
  };

  return (
    <div>
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span className="w-full flex items-center justify-center border border-gray-300 rounded-md py-2 px-10 text-left focus:outline-none focus:border-blue-500">
          Categories
        </span>
        <ul
          className={`absolute w-full bg-white border border-gray-300 rounded-md ${
            isCategoryVisible ? "block" : "hidden"
          }`}
        >
          {uniqueCategories.map((category) => (
            <li key={category} className="pl-3 pr-4 text-sm">
              <input
                type="checkbox"
                id={`category-${category}`}
                className="form-checkbox h-3 w-3 text-blue-500"
                value={category}
                checked={selectedCategory.includes(category)}
                onChange={handleCategoryChange}
              />
              <label htmlFor={`category-${category}`} className="ml-2">
                {category}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryFilter;
