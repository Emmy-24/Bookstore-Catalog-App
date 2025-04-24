import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const handleRemove = (bookId) => {
    const updatedCart = cartItems.filter((item) => item.id !== bookId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    setMessage("Item removed from cart.");
    setTimeout(() => setMessage(""), 2000);
  };

  const handleUpdateQuantity = (bookId, quantity) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === bookId) {
        return { ...item, quantity };
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price || 0) * item.quantity, 0);
  };

  return (
    <div className="cart-container px-4 py-6">
      <h2 className="text-2xl font-bold text-center mb-6">Your Cart</h2>

      {message && <p className="text-red-500 text-center">{message}</p>}

      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <div className="cart-items grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center">
              <img
                src={item.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150'}
                alt={item.volumeInfo.title}
                className="w-32 h-48 object-cover mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.volumeInfo.title}</h3>
              <p className="text-gray-600 mb-2">{item.volumeInfo.authors?.join(", ") || "Unknown Author"}</p>
              <p className="text-green-600 font-bold text-md mb-2">
                ₦{item.price?.toLocaleString() || "0.00"}
              </p>
              <div className="flex justify-center items-center gap-4">
                <button
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                  className="w-12 text-center border border-gray-300 rounded-lg"
                  min="1"
                />
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="checkout-section mt-6 text-center">
          <p className="text-lg font-semibold">Total: ₦{calculateTotal().toLocaleString()}</p>
          <div className="mt-4">
            <Link
              to="/checkout"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
