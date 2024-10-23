import React, { useState } from 'react';
import { FaInstagram, FaTwitter, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

const Footer: React.FC = () => {
  const [email, setEmail] = useState<string>('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter submission logic here
    console.log('Email submitted:', email);
    setEmail('');
  };

  return (
    <footer className="bg-purple-200 text-white-900 p-6">
      <div className="max-w-6xl  flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-row md:flex-row items-center mb-4 md:mb-0">
          <a
            href="https://instagram.com/pawacode"
            target="_blank"
            rel="noopener noreferrer"
            className="mr-4 hover:text-purple-300 transition duration-300"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://twitter.com/vicesensei"
            target="_blank"
            rel="noopener noreferrer"
            className="mr-4 hover:text-purple-300 transition duration-300"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://wa.me/+2348082257867" // Replace with your WhatsApp link
            target="_blank"
            rel="noopener noreferrer"
            className="mr-4 hover:text-purple-300 transition duration-300"
          >
            <FaWhatsapp size={24} />
          </a>
          <a
            href="mailto:whakhydoh@gmail.com" // Replace with your email
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-300 transition duration-300"
          >
            <FaEnvelope size={24} />
          </a>
        </div>

        <div className="flex flex-col md:flex-row items-center ">
          <p className="mr-4 m-4">Contact: +2348053208997</p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col md:flex-row">
            <input
              type="email"
              placeholder="Subscribe to our newsletter"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 rounded-md mb-2 md:mb-0 md:mr-2"
              required
            />
            <button type="submit" className="bg-purple-400  text-white px-4 py-2 rounded-md hover:bg-purple-600 transition duration-300 font-semibold">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <p className="text-center mt-4">&copy; {new Date().getFullYear()} Pawacode. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
