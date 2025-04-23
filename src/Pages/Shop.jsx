import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const Shop = () => {
  const [books, setBooks] = useState([]);
  const [visibleBooks, setVisibleBooks] = useState(0);
  const [itemsPerRow, setItemsPerRow] = useState(1);
  const gridRef = useRef(null);
  const [prices, setPrices] = useState("");
  const [filteredBooks, setFilteredBooks] = useState("");
  const [query, setQuery] = useState("");
  const [allBooks, setAllBooks] = useState([]);
  const [sortOption, setSortOption] = useState("title");
  const [message, setMessage] = useState("");


  useEffect(() => {
    fetch("/books.json")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
        setAllBooks(data);
        setFilteredBooks(data);

        // Extract prices from book data
        const bookPrices = {};
        data.forEach((book) => {
          bookPrices[book.id] = book.price || 0;
        });
        setPrices(bookPrices);
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
  
      if (filtered.length === 0) {
        setMessage("No books found matching your search.");
      } else {
        setMessage("");
      }
    }
  };
  

  useEffect(() => {
    handleSearch();
  }, [query]);

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

  const calculateItemsPerRow = () => {
    const container = gridRef.current;
    if (!container || container.children.length < 2) return;

    const children = Array.from(container.children);
    const firstOffsetTop = children[0].offsetTop;
    const perRow = children.filter((child) => child.offsetTop === firstOffsetTop).length;

    setItemsPerRow(perRow);
  };

  useEffect(() => {
    if (!gridRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      calculateItemsPerRow();
    });

    resizeObserver.observe(gridRef.current);

    return () => resizeObserver.disconnect();
  }, [books]);

  useEffect(() => {
    if (itemsPerRow > 0) {
      setVisibleBooks(itemsPerRow * 3);
    }
  }, [itemsPerRow]);

  const handleSeeMore = () => {
    setVisibleBooks((prev) => prev + itemsPerRow * 3);
  };

  return (
    <div className="shop-container px-4">
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6 mt-6">
        <div className="flex w-full md:w-1/2 gap-2">
          <input
            type="text"
            value={query}
            placeholder="Search for books..."
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            Search
          </button>
        </div>
        <div className="w-full md:w-1/3">
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="title">Sort by Title</option>
            <option value="author">Sort by Author</option>
            <option value="price-low-high">Sort by Price (Low to High)</option>
            <option value="price-high-low">Sort by Price (High to Low)</option>
          </select>
        </div>
      </div>
      <h2 className="section-title text-2xl font-bold mb-6 text-center">NEW ARRIVALS</h2>
      {message && <p className="text-red-500 text-center">{message}</p>}
      <div
        className="book-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        ref={gridRef}
      >
        {Array.from(new Map(sortedBooks().map(book => [book.id, book])).values()).slice(0, visibleBooks).map((book, index) => {
          const info = book.volumeInfo;
          const image = info.imageLinks?.thumbnail;

          return (
            <div
              key={`${book.id}-${index}`}
              className="book-card bg-white rounded-2xl shadow-md p-4 flex flex-col items-center text-center transition-transform transform hover:scale-105 h-[420px] justify-between"
            >
              {image && (
                <div className="book-image">
                  <img src={image} alt={info.title} className="w-32 h-48 object-cover mb-4" />
                </div>
              )}
              <h3 className="text-lg font-semibold text-gray-800 mb-1 h-14 overflow-hidden text-ellipsis line-clamp-2">
                {info.title}
              </h3>
              <p className="text-gray-600 text-md mb-1">
                {info.authors?.[0] || "Author"}
              </p>
              <p className="text-green-600 font-bold text-md mb-3">
                ₦{book.price?.toLocaleString() || "0.00"}
              </p>
              <div className="flex justify-center gap-1 mt-2 flex-nowrap">
                <Link
                  to={`/book/${book.id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm whitespace-nowrap"
                >
                  MORE DETAILS
                </Link>
                <button
                  onClick={() => handleAddToCart(book)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm whitespace-nowrap"
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {visibleBooks < books.length && (
        <div className="text-center mt-8">
          <button
            onClick={handleSeeMore}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            SEE MORE
          </button>
        </div>
      )}
    </div>
  );
};

export default Shop;
