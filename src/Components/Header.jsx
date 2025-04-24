import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from "../images/logo.jpeg"
import cart from "../images/cart.svg"
import styled from "styled-components";


const Logo = styled.img`
  width: 2.25rem;
`;
const Cart = styled.img`
  width: 1.8rem;
`;
const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current &&
                !menuRef.current.contains(event.target) &&
                !event.target.closest('button[aria-label="menu"]')) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const closeMenu = () => setIsOpen(false);

    return (
        <nav className="bg-white py-4 relative flex ">

            
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-blue-600 text-2xl sm:text-3xl flex font-bold hover:text-blue-400 transition-colors duration-300">
                        <Logo src={logo} alt="Logo" className="w-10 h-10" />
                        DEMC
                </Link>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-blue-600 focus:outline-none md:hidden z-50"
                    aria-label="menu"
                >
                    {isOpen ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    )}
                </button>
                <div
                    ref={menuRef}
                    className={`md:flex md:items-center md:space-x-4 absolute md:static left-0 w-full md:w-auto
                    bg-blue-500 md:bg-transparent transition-all duration-300 ease-in-out overflow-hidden
                    ${isOpen ? 'max-h-[500px] opacity-100 top-14' : 'max-h-0 opacity-0 top-[-100%] md:max-h-full md:opacity-100 md:top-0'}
                    z-40`}
                >
                    <div className="flex flex-col md:flex-row p-4 md:p-0">
                        <div className="flex flex-col md:flex-row md:mr-4">
                            <Link
                                to="about"
                                onClick={closeMenu}
                                className="py-2 px-4 text-white md:text-blue-600 hover:text-gray-400 hover:underline text-xl"
                            >
                                About
                            </Link>
                            <Link
                                to="books"
                                onClick={closeMenu}
                                className="py-2 px-4 text-white md:text-blue-600 hover:text-gray-400 hover:underline text-xl"
                            >
                                Catalog
                            </Link>
                            <Link
                                to="login"
                                onClick={closeMenu}
                                className="py-2 px-4 text-white md:text-blue-600 hover:text-gray-400 hover:underline text-xl"
                            >
                                Login
                            </Link>
                            <Link
                                to="cart"
                                onClick={closeMenu}
                                className="py-2 px-4 text-white md:text-blue-600 hover:text-gray-400 hover:underline text-xl"
                            >
                                <Cart src={cart} alt="Cart" className="w-10 h-10" />
                            </Link>
                        </div>

                        
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;



