import React, { useState } from "react";
import { useNewsContext } from "../Context/NewsContext";

const SourceFilter = () => {
  const { selectedSource, setSelectedSource, uniqueSources } = useNewsContext();
  const [isSourceVisible, setIsSourceVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsSourceVisible(true);
  };

  const handleMouseLeave = () => {
    setIsSourceVisible(false);
  };

  const handleSourceChange = (e) => {
    const newSources = [...selectedSource];
    const source = e.target.value;
    const index = newSources.indexOf(source);

    if (e.target.checked) {
      if (index === -1) {
        newSources.push(source);
      }
    } else {
      if (index !== -1) {
        newSources.splice(index, 1);
      }
    }
    setSelectedSource(newSources);
  };

  return (
    <div>
      <div
        className="relative w-52"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span className="w-full flex items-center justify-center border border-gray-300 rounded-md py-2 px-10 text-left focus:outline-none focus:border-blue-500">
          Sources
        </span>
        <ul
          className={`absolute w-full bg-white border border-gray-300 rounded-md ${
            isSourceVisible ? "block" : "hidden"
          }`}
        >
          {uniqueSources.map((source) => (
            <li key={source} className="pl-3 pr-4 text-sm">
              <input
                type="checkbox"
                id={`source-${source}`}
                className="form-checkbox h-3 w-3 text-blue-500"
                value={source}
                checked={selectedSource.includes(source)}
                onChange={handleSourceChange}
              />
              <label htmlFor={`source-${source}`} className="ml-2">
                {source}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SourceFilter;
