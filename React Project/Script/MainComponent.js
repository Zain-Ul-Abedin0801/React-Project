import React, { useState, useEffect } from 'react';
import { cart } from './Cart';
import { books } from './Books';

function MainComponent() {
  const [booksHTML, setBooksHTML] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    renderBooks(books);
  }, [searchTerm]);

  function renderBooks(filteredBooks) {
    const booksMarkup = filteredBooks.map((book) => (
      <div className="book-info" key={book.id}>
        <img className="book-image" src={book.image} alt="Book" />
        <div className="info">
          <p className="title">{book.title}</p>
          <p style={{ margin: 0 }}>
            <span>by </span><span className="author"><strong>{book.author}</strong></span>
          </p>
          <p className="stats">{book.stats}</p>
          <p className="price">$ {book.price}</p>
          <span className="added" id="addedMessage">Added to Cart &#10004;</span>
          <button className="cart-button js-cart-button" onClick={() => addToCart(book.id)}>
            Add to Cart
          </button>
        </div>
      </div>
    ));
    setBooksHTML(booksMarkup);
  }

  function handleSearch(event) {
    setSearchTerm(event.target.value.toLowerCase());
    const filteredBooks = books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm)
    );
    renderBooks(filteredBooks);
  }

  return (
    <div>
      <input
        id="searchBar"
        className="searchbar"
        type="text"
        placeholder="Search"
        onChange={handleSearch}
      />
      <div className="js-rack">{booksHTML}</div>
    </div>
  );
}

export default MainComponent;
