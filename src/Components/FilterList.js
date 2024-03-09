import React, { useEffect } from "react";
// -----UI-----
import SourceFilter from "../UI/SourceFilter";
import CategoryFilter from "../UI/CategoryFilter";
import AuthorFilter from "../UI/AuthorFilter";
import DateRangeFilter from "../UI/DateRangeFilter";
// -----Context-----
import { useNewsContext } from "../Context/NewsContext";

const FilterList = () => {
  const {
    selectedSource,
    selectedCategory,
    selectedAuthor,
    setSelectedSource,
    setSelectedCategory,
    setSelectedAuthor,
  } = useNewsContext();

  useEffect(() => {
    const savedFilters = JSON.parse(localStorage.getItem("selectedFilters"));
    if (savedFilters) {
      setSelectedSource(savedFilters.selectedSource || []);
      setSelectedCategory(savedFilters.selectedCategory || []);
      setSelectedAuthor(savedFilters.selectedAuthor || []);
    }
  }, []);

  useEffect(() => {
    const selectedFilters = {
      selectedSource,
      selectedCategory,
      selectedAuthor,
    };

    localStorage.setItem("selectedFilters", JSON.stringify(selectedFilters));
  }, [selectedSource, selectedCategory, selectedAuthor]);

  return (
    <div className="flex flex-col space-x-4 space-y-2 mt-8 items-center justify-center xl:flex-row xl:space-y-0">
      <div className="flex flex-col items-center justify-center space-y-2 md:flex-row space-x-2 md:space-y-0">
        {/* Source checkboxes */}
        <SourceFilter />
        {/* Category checkboxes */}
        <CategoryFilter />
        {/* Author checkboxes */}
        <AuthorFilter />
      </div>
      <div className="flex space-x-2">
        {/* Date Range */}
        <DateRangeFilter />
      </div>
    </div>
  );
};

export default FilterList;
