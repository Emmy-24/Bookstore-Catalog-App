
export const addToCart = (book, setMessage) => {
  console.log("Adding to cart:", book);
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingBook = cart.find((item) => item.id === book.id);

  if (existingBook) {
    existingBook.quantity += 1;
  } else {
    cart.push({ ...book, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  setMessage(`"${book.volumeInfo.title}" added to cart.`);
  setTimeout(() => setMessage(""), 2000);
};
