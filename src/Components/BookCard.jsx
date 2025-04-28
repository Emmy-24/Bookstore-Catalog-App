import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { addToCart } from "../Components/AddToCart";
import "./BookCard.css";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch("/books.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((b) => b.id === id);
        setBook(found);
      });
  }, [id]);

  if (!book) return <p>Loading...</p>;

  const info = book.volumeInfo;

  return (
    <div className="container">
      <div className="content">
        <div className="card-wrapper">
          <div className="card">
            <div className="card-body">
              <h1 className="title">{info.title}</h1>
              <div className="info-block">
                <p className="text"><strong>Author(s):</strong> {info.authors?.join(", ") || "Unknown"}</p>
                <p className="text"><strong>Genre:</strong> {info.categories?.join(", ") || "N/A"}</p>
                <p className="text"><strong>Publisher:</strong> {info.publisher || "N/A"}</p>
                <p className="text"><strong>Published Date:</strong> {info.publishedDate || "N/A"}</p>
                <p className="text"><strong>Description:</strong> {info.description || "No description available."}</p>
                <p className="text"><strong>Price:</strong> {book.price ? `$${book.price}` : "$0"}</p>
              </div>
              <div className="external-links">
                <a href={info.previewLink} target="_blank" rel="noreferrer" className="styled-link">Preview</a>
                <a href={info.infoLink} target="_blank" rel="noreferrer" className="styled-link">More Info</a>
              </div>
              <div>
                <button className="add-to-cart-button" onClick={() => addToCart(book)}>Add to Cart</button>
                <Link to="/books" className="back-link">← Back to Books</Link>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
