import React from 'react';
import './Style/Main.css';
import logo from './image/logo.png';
import searchIcon from './image/search-icon.png';
import micIcon from './image/mic.png';
import cartIcon from './image/cart.png';
import customerIcon from './image/customer.png';
import pic from './image/pic.jpg';
import headerImage from './image/headerr.png';

function Main() {
  return (
    <div>
      <div className="top">
        <div className="topp">
          <p className="toptext">
            Upto <strong>30% off</strong> for <strong>New Members</strong>.
          </p>
          <p className="toptextsell">Shop sale Now. &rsaquo;</p>
        </div>
      </div>

      <header className="header">
        <div className="left-section">
          <img className="logo" src={logo} alt="Enchanted Logo" />
          <p className="name">ENCHANTED</p>
        </div>

        <div className="mid-section">
          <input id="searchBar" className="searchbar" type="text" placeholder="Search" />
          <button className="searchb">
            <img className="search-icon" src={searchIcon} alt="Search Icon" />
          </button>
          <button className="voiceb">
            <img className="voice-icon" src={micIcon} alt="Microphone Icon" />
          </button>
        </div>

        <div className="right-section">
          <a className="cart-link header-link" href="Checkout.html">
            <div className="cart-item">
              <img className="cart" src={cartIcon} alt="Cart Icon" />
              <div className="item-count js-item-count">0</div>
            </div>
          </a>
          <img className="customer" src={customerIcon} alt="Customer Icon" />
          <img className="pic" src={pic} alt="Profile" />
        </div>
      </header>

      <div className="genres">
        {['All', 'Fantasy', 'Science', 'Romance', 'Historical', 'Finance', 'Horror', 'Kids', 'Philosophy', 'Technology'].map((genre) => (
          <a key={genre} href={`${genre.toLowerCase()}.html`} style={{ textDecoration: 'none' }}>
            <div className={`genres-type ${genre === 'All' ? 'page' : ''}`}>{genre}</div>
          </a>
        ))}
      </div>

      <div>
        <img className="headerr" src={headerImage} alt="Header" />
      </div>

      <div className="rack js-rack"></div>
    </div>
  );
}

export default Main;
