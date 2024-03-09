import React from "react";
import SearchBar from "./Components/SearchBar";
import NewsList from "./Components/NewsList";
import FilterList from "./Components/FilterList";
import { useNewsContext } from "./Context/NewsContext";

function App() {
  const { articles, loading, error } = useNewsContext();

  return (
    <div className="container mx-auto mt-8">
      <div className="flex flex-col space-x-4 xl:flex-row">
        <SearchBar />
        <FilterList />
      </div>
      <div>
        {loading && <p>Loading News...</p>}
        {error && <p>Error: {error}</p>}
        {articles.length > 0 && <NewsList />}
      </div>
    </div>
  );
}

export default App;
