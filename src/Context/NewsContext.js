import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //  -----Filter States-----
  const [selectedSource, setSelectedSource] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: "",
    endDate: "",
  });

  // -----NewsAPI key and Url-----
  const newsApiKey = "b2ddcc7ee7834a36812ce2230cca51c1";
  // everything returns ten thousands of articles
  const newsApiUrl = `https://newsapi.org/v2/everything?`;
  // top headlines returns 200 articles only
  // const newsApiUrl2 = `https://newsapi.org/v2/top-headlines?`;

  // -----Guardian API key and Url-----
  const guardianApiKey = "9e8cab3b-26ee-4cc3-a6e2-cb91122d475f";
  const guardianApiUrl = `https://content.guardianapis.com/search?api-key=${guardianApiKey}`;

  // -----New York Times API key and Url-----
  const nytimesApiKey = "gCijtStgqK1pBA3L9DzPzvodXYVvYIqv";
  const nytimesApiUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json`;

  const fetchArticles = async (query = "") => {
    try {
      setLoading(true);
      setError(null);

      const [response1, response2, response3] = await Promise.all([
        axios.get(`${newsApiUrl}q=${query}&apiKey=${newsApiKey}`),
        axios.get(`${guardianApiUrl}&q=${query}`),
        axios.get(`${nytimesApiUrl}?q=${query}&api-key=${nytimesApiKey}`),
      ]);

      const combinedData = [
        ...response1.data.articles.map((article) => ({
          img: article.urlToImage,
          title: article.title,
          date: article.publishedAt,
          source: article.source.name,
          category: "unknown",
          author: article.author,
          url: article.url,
        })),
        ...response2.data.response.results.map((article) => ({
          title: article.webTitle,
          date: article.webPublicationDate,
          source: "Guardian",
          category: article.pillarName,
          author: "unknown",
          url: article.webUrl,
        })),
        ...response3.data.response.docs.map((article) => ({
          title: article.headline.main,
          date: article.pub_date,
          source: article.source,
          category: article.section_name,
          author: article.byline.original,
          url: article.web_url,
        })),
      ];

      setArticles(combinedData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const isDateInRange = (dateString, range) => {
    const date = new Date(dateString);
    return date >= new Date(range.startDate) && date <= new Date(range.endDate);
  };

  const filterByCriteria = (articles, criteria, selectedValues) =>
    articles.filter(
      (article) =>
        selectedValues.length === 0 ||
        selectedValues.includes(article[criteria])
    );

  const filterArticles = () => {
    return articles.filter((article) => {
      const passesSourceFilter =
        selectedSource.length === 0 ||
        selectedSource.includes(article.source) ||
        (article.source === null && selectedSource.includes("unknown"));

      const passesCategoryFilter =
        selectedCategory.length === 0 ||
        selectedCategory.includes(article.category) ||
        (article.category === null && selectedCategory.includes("unknown"));

      const passesAuthorFilter =
        selectedAuthor.length === 0 ||
        selectedAuthor.includes(article.author) ||
        (article.author === null && selectedAuthor.includes("unknown"));

      const passesDateRangeFilter =
        !selectedDateRange.startDate ||
        !selectedDateRange.endDate ||
        isDateInRange(article.date, selectedDateRange);

      return (
        passesSourceFilter &&
        passesCategoryFilter &&
        passesAuthorFilter &&
        passesDateRangeFilter
      );
    });
  };

  const uniqueSources =
    articles.length > 0
      ? [...new Set(articles.map((article) => article.source || "unknown"))]
      : [];
  const uniqueCategories =
    articles.length > 0
      ? [...new Set(articles.map((article) => article.category || "unknown"))]
      : [];
  const uniqueAuthor =
    articles.length > 0
      ? [
          ...new Set(
            articles.map((article) =>
              article.author !== null ? article.author : "unknown"
            )
          ),
        ]
      : [];

  const values = {
    articles,
    loading,
    error,
    selectedSource,
    selectedCategory,
    selectedAuthor,
    selectedDateRange,
    uniqueSources,
    uniqueCategories,
    uniqueAuthor,
    setArticles,
    setLoading,
    setError,
    setSelectedSource,
    setSelectedCategory,
    setSelectedAuthor,
    setSelectedDateRange,
    fetchArticles,
    filterByCriteria,
    filterArticles,
  };

  return <NewsContext.Provider value={values}>{children}</NewsContext.Provider>;
};

export const useNewsContext = () => {
  return useContext(NewsContext);
};
