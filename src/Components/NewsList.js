import React, { useEffect, useState } from "react";
import { useNewsContext } from "../Context/NewsContext";
import { v4 as uuidv4 } from "uuid";

const NewsList = () => {
  const { articles, loading, error, filterArticles } = useNewsContext();
  const [filteredArticles, setFilteredArticles] = useState([]);

  useEffect(() => {
    const updatedFilteredArticles = filterArticles();
    setFilteredArticles(updatedFilteredArticles);
  }, [articles, filterArticles]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="mt-8 ml-2 mr-2 grid grid-cols-3 lg:ml-20 lg:mr-36 sm:space-x-4">
      {loading && <p>Loading News...</p>}
      {error && <p>Error: {error}</p>}
      {filteredArticles.length > 0 && (
        <>
          {filteredArticles.map((article) => {
            const key = uuidv4();
            const publishedAtDate = new Date(article.date);

            const year = publishedAtDate.getFullYear();
            const month = publishedAtDate.getMonth() + 1;
            const day = publishedAtDate.getDate();

            const formattedDateString = `${day < 10 ? "0" : ""}${day}-${
              month < 10 ? "0" : ""
            }${month}-${year}`;

            return (
              <div key={key} className="p-4 mb-4 rounded-md justify-between">
                {article.img && (
                  <img
                    src={article.img}
                    alt={article.title}
                    className="w-[100%] object-cover items-center aspect-[2/1]"
                  />
                )}
                <h2 className="text-xl font-bold">{article.title}</h2>

                <div className="flex flex-col space-x-8 items-center align-text-bottom md:flex-row">
                  <p>{formattedDateString}</p>
                  <p>{article.source}</p>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default NewsList;
