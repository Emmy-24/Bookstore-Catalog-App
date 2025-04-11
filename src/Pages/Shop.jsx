import React, { useState, useEffect } from "react";
import "./Shop.css";

const Shop = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [expandedBooks, setExpandedBooks] = useState({});
  const [prices, setPrices] = useState({});
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [sortOption, setSortOption] = useState("title");


  useEffect(() => {
    fetch("/books.json") 
      .then((response) => response.json())
      .then((data) => {
        setBooks(data); 
        setAllBooks(data);
        setFilteredBooks(data);
      })
      .catch((error) => console.error("Error loading books:", error));
  }, []);

  const handleSearch = () => {
    if (query.trim() === "") {
      setBooks(allBooks); 
    } else {
      const filtered = allBooks.filter((book) => {
        const title = book.volumeInfo.title?.toLowerCase() || "";
        const authors = book.volumeInfo.authors?.join(" ").toLowerCase() || "";
        return title.includes(query.toLowerCase()) || authors.includes(query.toLowerCase());
      });
      setBooks(filtered); 
    }
  };

  useEffect(() => {
    handleSearch();
  }, [query]);
  

  const toggleDetails = (id) => {
    setExpandedBooks((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const sortedBooks = () => {
    const sorted = [...books];
    if (sortOption === "title") {
      sorted.sort((a, b) =>
        a.volumeInfo.title.localeCompare(b.volumeInfo.title)
      );
    } else if (sortOption === "author") {
      sorted.sort((a, b) =>
        (a.volumeInfo.authors?.[0] || "").localeCompare(
          b.volumeInfo.authors?.[0] || ""
        )
      );
    } else if (sortOption === "price-low-high") {
      sorted.sort((a, b) => (prices[a.id] || 0) - (prices[b.id] || 0));
    } else if (sortOption === "price-high-low") {
      sorted.sort((a, b) => (prices[b.id] || 0) - (prices[a.id] || 0));
    }
    return sorted;
  };

  return (
    <div className="shop-container">
      <div className="search-bar">
        <input
          type="text"
          value={query}
          placeholder="Search for books..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="sort-options">
        <select value={sortOption} onChange={handleSortChange}>
          <option value="title">Sort by Title</option>
          <option value="author">Sort by Author</option>
          <option value="price-low-high">Sort by Price (Low to High)</option>
          <option value="price-high-low">Sort by Price (High to Low)</option>
        </select>
      </div>

      <div className="books-area">
        {Array.from(new Map(sortedBooks().map(book => [book.id, book])).values()).map((book, index) => {
          const info = book.volumeInfo;
          const image = info.imageLinks?.thumbnail;

          return (
            <div key={`${book.id}-${index}`} className="book-card">
              {image && (
                <div className="book-image">
                  <img src={image} alt={info.title} />
                </div>
              )}
              <div className="book-info">
                <h2>{info.title}</h2>
                <p>
                  <strong>Author(s):</strong>{" "}
                  {info.authors ? info.authors.join(", ") : "Unknown"}
                </p>
                <p>
                  <strong>Price:</strong>{" "}
                  {prices[book.id] ? `₦${prices[book.id]}` : 0}
                </p>
                <button className="toggle-button" onClick={() => toggleDetails(book.id)}>
                  {expandedBooks[book.id] ? "Hide Details" : "More Details"}
                </button>

                {expandedBooks[book.id] && (
                  <div className="additional-info">
                    <p><strong>Publisher:</strong> {info.publisher || "N/A"}</p>
                    <p><strong>Published Date:</strong> {info.publishedDate || "N/A"}</p>
                    <p><strong>Description:</strong> {info.description || "No description available"}</p>
                    <div>
                      <a href={info.previewLink} target="_blank" rel="noreferrer">Book Preview</a>
                      <a href={info.infoLink} target="_blank" rel="noreferrer">Book Information</a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      
    </div>
  );
};

export default Shop;
