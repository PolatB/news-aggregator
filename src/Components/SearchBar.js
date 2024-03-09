import React, { useEffect, useState } from "react";
import { useNewsContext } from "../Context/NewsContext";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const {
    fetchArticles,
    setSelectedSource,
    setSelectedCategory,
    setSelectedAuthor,
  } = useNewsContext();

  useEffect(() => {
    const savedQuery = localStorage.getItem("savedQuery");
    if (savedQuery) {
      setQuery(savedQuery);
      handleSearch(savedQuery);
    }
  }, []);

  const handleSearch = (searchQuery) => {
    localStorage.removeItem("savedFilters");
    localStorage.setItem("savedQuery", searchQuery);

    setSelectedSource([]);
    setSelectedCategory([]);
    setSelectedAuthor([]);
    fetchArticles(searchQuery);
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(query);
  };

  return (
    <form
      className="flex items-center justify-center mt-8 ml-24"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Search Articles"
        value={query}
        onChange={handleChange}
        className="border border-gray-300 rounded-md py-2 px-4"
      />
      <button
        type="submit"
        className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
