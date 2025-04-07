import { useState, useEffect } from "react";
import axios from "axios";
import "./Shop.css";

const Shop = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [expandedBooks, setExpandedBooks] = useState({}); 
  const [searchTerm, setSearchTerm] = useState("books");


  const fetchBooks = async (searchQuery = "", index = 0) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=(searchQuery)%7D${encodeURIComponent(
          searchQuery
        )}&startIndex=${index}&maxResults=20`
      );
      const newBooks = res.data.items || [];
      if (newBooks.length === 0) {
        setHasMore(false);
      }
      setBooks((prev) => (index === 0 ? newBooks : [...prev, ...newBooks]));
    } catch (error) {
      console.error("Error fetching books:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks("books", 0);
    setStartIndex(20);
  }, []);

  const handleSearch = async () => {
    if (!query) return;
  
    setStartIndex(20);
    setHasMore(true);
    setExpandedBooks({});
    setLoading(true);
    setSearchTerm(query);
  
    try {
      const res = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(query)}+inauthor:${encodeURIComponent(query)}&startIndex=0&maxResults=40`
      );
  
      const searchResults = res.data.items || [];
  
      if (searchResults.length === 0) {
        setBooks([{ id: "notfound", volumeInfo: { title: "Not found" } }]);
        setHasMore(false);
      } else {
        setBooks(searchResults);
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

  const toggleDetails = (id) => {
    setExpandedBooks((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
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
      <div className="books-area">
        {books.map((book) => {
        const info = book.volumeInfo;
        const image = info.imageLinks?.thumbnail;

        return (
          <div key={book.id} className="book-card">
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

              <button className="toggle-button" onClick={() => toggleDetails(book.id)}>
                {expandedBooks[book.id] ? "Hide Details" : "More Details"}
              </button>

              {expandedBooks[book.id] && (
                <div className="additional-info">
                  <p>
                    <strong>Publisher:</strong> {info.publisher || "N/A"}
                  </p>
                  <p>
                    <strong>Published Date:</strong> {info.publishedDate || "N/A"}
                  </p>
                  <p>
                    <strong>Description:</strong>{" "}
                    {info.description || "No description available"}
                  </p>
                  <div>
                    <a href={info.previewLink} target="_blank" rel="noreferrer">
                      Book Preview
                    </a>
                    <a href={info.infoLink} target="_blank" rel="noreferrer">
                      Book Information
                    </a>
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

export default Shop;
