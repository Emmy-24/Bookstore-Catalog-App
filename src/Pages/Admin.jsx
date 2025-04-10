import React, { useState, useEffect } from "react";
import "./Shop.css";

const Admin = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [expandedBooks, setExpandedBooks] = useState({});
  const [prices, setPrices] = useState({});
  const [searchTerm, setSearchTerm] = useState("books");
  const [sortOption, setSortOption] = useState("title");
  const [cart, setCart] = useState([]);

  // Load books from localStorage on initial load
  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("books"));
    if (storedBooks) {
      setBooks(storedBooks);
    } else {
      fetchBooks("books", 0);
      setStartIndex(20);
    }
  }, []);

  const fetchBooks = async (searchQuery = "", index = 0) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=(searchQuery)%7D${encodeURIComponent(searchQuery)}&startIndex=${index}&maxResults=20`
      );
      const data = await res.json();
      const newBooks = data.items || [];
      if (newBooks.length === 0) {
        setHasMore(false);
      }
      setBooks((prev) => {
        const updatedBooks = index === 0 ? newBooks : [...prev, ...newBooks];
        // Store books in localStorage
        localStorage.setItem("books", JSON.stringify(updatedBooks));
        return updatedBooks;
      });
    } catch (error) {
      console.error("Error fetching books:", error);
    }
    setLoading(false);
  };

  const handleSearch = async () => {
    if (!query) return;

    setStartIndex(20);
    setHasMore(true);
    setExpandedBooks({});
    setLoading(true);
    setSearchTerm(query);

    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=(searchQuery)%7D${encodeURIComponent(query)}+inauthor:${encodeURIComponent(query)}&startIndex=0&maxResults=40`
      );

      const searchResults = await res.json();

      if (searchResults.items.length === 0) {
        setBooks([{ id: "notfound", volumeInfo: { title: "Not found" } }]);
        setHasMore(false);
      } else {
        setBooks(searchResults.items);
        // Store search results in localStorage
        localStorage.setItem("books", JSON.stringify(searchResults.items));
      }
    } catch (error) {
      console.error("Search error:", error);
    }

    setLoading(false);
  };

  const handleLoadMore = () => {
    fetchBooks(searchTerm || "", startIndex);
    setStartIndex((prev) => prev + 20);
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
        {sortedBooks().map((book, index) => {
          const info = book.volumeInfo;
          const image = info.imageLinks?.thumbnail;
          const key = `${book.id || info.title}-${index}`;

          return (
            <div key={key} className="book-card">
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

      {loading && <p className="loading">Loading...</p>}
      {!loading && hasMore && (
        <button className="load-more" onClick={handleLoadMore}>
          Load More
        </button>
      )}

      
    </div>
  );
};

export default Admin;
