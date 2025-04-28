import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Top = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);

  useEffect(() => {
    fetch('/books.json')
      .then((response) => response.json())
      .then((data) => {
        setFeaturedBooks(data.slice(60, 68)); 
      })
      .catch((error) => console.error('Error fetching books:', error));
  }, []);

  return (
    <section className="top-section py-12 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-6">Top Sellers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {featuredBooks.map((book, index) => {
            const { title, authors, imageLinks, id } = book.volumeInfo;
            const image = imageLinks?.thumbnail || 'https://via.placeholder.com/150';
            const author = authors?.[0] || 'Unknown Author';

            return (
              <Link
                  to={`/book/${book.id}`}
              >
                <div key={id || index} className="book-image bg-white rounded-lg shadow-lg p-4 flex justify-center items-center flex-col">
                  <img
                    src={image}
                    alt={title}
                    className="w-32 h-48 object-cover mb-4"
                  />
                  <h3 className="font-semibold text-lg mb-2">{title}</h3>
                  <p className="text-gray-600">{author}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Top;
