import React, { useState } from 'react';
import logo from '../images/pawa.png';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto flex items-center justify-between ">
        
        <div className="text-2xl font-bold text-black p-4">
         <img src={logo} width={150} height={200} alt="" />
        </div>

        {/* Hamburger Menu Button */}
        <div className="lg:hidden">
          <button
            className="text-black focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className={`lg:flex ${isMenuOpen ? 'block' : 'hidden'} w-full lg:w-auto`}>
          <ul className="flex flex-col lg:flex-row lg:space-x-8 text-black">
            <li className="py-2 lg:py-0 hover:text-gray-600">
              <a href="#home">Home</a>
            </li>
            <li className="py-2 lg:py-0 hover:text-gray-600">
              <a href="#shop">Shop</a>
            </li>
            <li className="py-2 lg:py-0 hover:text-gray-600">
              <a href="#about">About</a>
            </li>
            <li className="py-2 lg:py-0 hover:text-gray-600">
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
