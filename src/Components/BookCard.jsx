import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

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
    <div className="book-detail-container">
      <h1>{info.title}</h1>
      <p><strong>Author(s):</strong> {info.authors?.join(", ") || "Unknown"}</p>
      <p><strong>Genre:</strong> {info.categories?.join(", ") || "N/A"}</p>
      <p><strong>Publisher:</strong> {info.publisher || "N/A"}</p>
      <p><strong>Published Date:</strong> {info.publishedDate || "N/A"}</p>
      <p><strong>Description:</strong> {info.description || "No description available."}</p>
      <p><strong>Price:</strong> {book.price ? `$${book.price}` : "$0"}</p>
      <div>
        <a href={info.previewLink} target="_blank" rel="noreferrer">Preview</a> |{" "}
        <a href={info.infoLink} target="_blank" rel="noreferrer">More Info</a>
      </div>
      <br />
      <Link to="/Shop">← Back to Shop</Link>
    </div>
  );
};

export default BookDetails;
