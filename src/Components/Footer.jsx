import React from "react";
import logo from "../images/logo.png";
import facebookIcon from "../images/facebook-icon.png";
import twitterIcon from "../images/twitter-icon.png";
import youtubeIcon from "../images/youtube-icon.png";
import "./Footer.css";

export default function CustomFooter() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-branding">
          <img src={logo} alt="Logo" className="footer-logo" />
          <h1 className="footer-brand-text">DEMC</h1>
        </div>

        <div className="footer-nav-links">
          <a href="/" className="footer-nav-link">Home</a>
          <a href="about" className="footer-nav-link">About</a>
          <a href="#" className="footer-nav-link">Contact Us</a>
          <a href="shop" className="footer-nav-link">Shop</a>
        </div>

        <div className="footer-socials">
          <a href="https://facebook.com" aria-label="Facebook">
            <img src={facebookIcon} alt="Facebook" />
          </a>
          <a href="https://twitter.com" aria-label="Twitter">
            <img src={twitterIcon} alt="Twitter" />
          </a>
          <a href="https://youtube.com" aria-label="YouTube">
            <img src={youtubeIcon} alt="YouTube" />
          </a>
        </div>

        <p className="footer-copyright">
          &copy; {new Date().getFullYear()} Web3Bridge Inc. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
