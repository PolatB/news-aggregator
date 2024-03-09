import React, { useState } from "react";
import { useNewsContext } from "../Context/NewsContext";

const AuthorFilter = () => {
  const { selectedAuthor, setSelectedAuthor, uniqueAuthor } = useNewsContext();
  const [isAuthorVisible, setIsAuthorVisible] = useState(false);

  // const handleToggleVisibility = () => {
  //   setIsAuthorVisible(!isAuthorVisible);
  // };

  const handleMouseEnter = () => {
    setIsAuthorVisible(true);
  };

  const handleMouseLeave = () => {
    setIsAuthorVisible(false);
  };

  const handleAuthorChange = (e) => {
    const newAuthors = [...selectedAuthor];
    const author = e.target.value;
    const index = newAuthors.indexOf(author);

    if (e.target.checked) {
      if (index === -1) {
        newAuthors.push(author);
      }
    } else {
      if (index !== -1) {
        newAuthors.splice(index, 1);
      }
    }
    setSelectedAuthor(newAuthors);
  };

  return (
    <div>
      <div
        className="relative w-52"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span className="w-full flex items-center justify-center border border-gray-300 rounded-md py-2 px-10 text-left focus:outline-none focus:border-blue-500">
          Authors
        </span>
        <ul
          className={`absolute w-full max-h-96 overflow-y-auto bg-white border border-gray-300 rounded-md ${
            isAuthorVisible ? "block" : "hidden"
          }`}
        >
          {uniqueAuthor.map((author) => (
            <li key={author} className="pl-3 pr-6 text-sm ">
              <input
                type="checkbox"
                id={`author-${author}`}
                className="form-checkbox h-3 w-3 text-blue-500"
                value={author}
                checked={selectedAuthor.includes(author)}
                onChange={handleAuthorChange}
              />
              <label htmlFor={`author-${author}`} className="ml-2">
                {author}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AuthorFilter;
