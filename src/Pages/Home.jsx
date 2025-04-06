// import React from 'react'

// const Home = () => {
//   return (
//     <div>Home</div>
//   )
// }

// export default Home


import React, { useState } from "react";
import axios from "axios";

const GOOGLE_BOOKS_API = "https://www.googleapis.com/books/v1/volumes?q=";
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;// Securely fetch API Key

console.log("API Key:", API_KEY);


const App = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [userBooks, setUserBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: "", author: "", cover: "" });

  const searchBooks = async () => {
    try {
      const response = await axios.get(`${GOOGLE_BOOKS_API}${query}&key=${API_KEY}`);
      setBooks(response.data.items || []);
    } catch (error) {
      console.error("Error fetching books: ", error);
    }
  };

  const addUserBook = () => {
    if (newBook.title && newBook.author) {
      setUserBooks([...userBooks, newBook]);
      setNewBook({ title: "", author: "", cover: "" });
    }
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "white", minHeight: "100vh" }}>
      <h1>Bookstore Catalog</h1>
      <input
        type="text"
        placeholder="Search books..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={searchBooks}>Search</button>
      
      <h2>Search Results</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <strong>{book.volumeInfo.title}</strong> by {book.volumeInfo.authors?.join(", ") || "Unknown"}
          </li>
        ))}
      </ul>

      <h2>My Uploaded Books</h2>
      <input
        type="text"
        placeholder="Book Title"
        value={newBook.title}
        onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Author"
        value={newBook.author}
        onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
      />
      <button onClick={addUserBook}>Add Book</button>

      <ul>
        {userBooks.map((book, index) => (
          <li key={index}>
            <strong>{book.title}</strong> by {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
