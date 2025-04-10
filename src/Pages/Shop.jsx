import React, { useState, useEffect } from "react";
import "./Shop.css";

const Shop = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [expandedBooks, setExpandedBooks] = useState({});
  const [prices, setPrices] = useState({});
  const [sortOption, setSortOption] = useState("title");
  const [cart, setCart] = useState([]);

  // Load books from localStorage
  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("books")) || [];
    setBooks(storedBooks);
  }, []);

  const handleSearch = () => {
    const storedBooks = JSON.parse(localStorage.getItem("books")) || [];
    const filtered = storedBooks.filter(book => {
      const title = book.volumeInfo.title.toLowerCase();
      const authors = book.volumeInfo.authors?.join(" ").toLowerCase() || "";
      return title.includes(query.toLowerCase()) || authors.includes(query.toLowerCase());
    });
    setBooks(filtered);
  };

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

  const addToCart = (book) => {
    setCart((prevCart) => {
      const existingBookIndex = prevCart.findIndex((item) => item.id === book.id);
      if (existingBookIndex !== -1) {
        return prevCart;
      }
      return [...prevCart, { ...book, price: prices[book.id] || 0 }];
    });
  };

  const removeFromCart = (bookId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== bookId));
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, book) => total + (book.price || 0), 0);
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
                <button onClick={() => addToCart(book)} className="toggle-button">
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="cart-summary">
        <h3>Cart Summary</h3>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            <ul>
              {cart.map((book) => (
                <li key={book.id}>
                  <strong>{book.volumeInfo.title}</strong> - ₦{book.price}
                  <button onClick={() => removeFromCart(book.id)}>Remove</button>
                </li>
              ))}
            </ul>
            <p>Total Price: ₦{calculateTotalPrice()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
