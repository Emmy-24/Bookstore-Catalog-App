// Shop.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Shop.css"; 

const Shop = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("/books.json")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  return (
    <div className="shop-container">
      <h2 className="section-title">NEW ARRIVALS</h2>
      <div className="book-grid">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <img
              src={book.volumeInfo.imageLinks?.thumbnail}
              alt={book.volumeInfo.title}
              className="book-image"
            />
            <h3 className="book-title">{book.volumeInfo.title}</h3>
            <p className="book-category">{book.volumeInfo.categories?.[0] || "Genre"}</p>
            <p className="book-price">₦{book.price?.toLocaleString() || "0.00"}</p>
            <Link to={`/book/${book.id}`} className="details-button">MORE DETAILS</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
