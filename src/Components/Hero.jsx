import React from 'react';
import { Link } from 'react-router-dom';
import HeroImg from '../assets/banner.png';

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-100 to-white py-16 px-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Discover Your Next Favorite Book
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-4 max-w-xl">
            Explore our extensive catalog and get amazing titles at unbeatable prices.
          </p>
          <p className="text-gray-600 mb-6 max-w-xl">
            It's time to update your reading list with some of the latest and greatest releases in the literary world. From heart-pumping thrillers to captivating memoirs, this week's new releases offer something for everyone.
          </p>
          <Link to="/books">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg hover:bg-blue-700 transition">
              Browse Catalog
            </button>
          </Link>
        </div>
        <div className="flex-1">
          <img src={HeroImg} alt="Books Banner" className="w-full h-auto" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
