import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./components/footer";

import { FaHeart, FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Header from "./components/header";
import load from "./images/loa-removebg-preview.png";

const PEXELS_API_KEY =
  "XlscpQrfuYHyIu09zvgxxNl9LVgk8IHUaI7ywkC4WyT0PZLql0873ru7";
const TELEGRAM_BOT_TOKEN = "YOUR_BOT_TOKEN"; // Replace with your bot token
const TELEGRAM_CHAT_ID = "YOUR_CHANNEL_CHAT_ID"; // Replace with your chat ID

const App: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("food");
  const [searchTerm, setSearchTerm] = useState<string>("Food");
  const [isFullSize, setIsFullSize] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(
    Math.floor(Math.random() * (501 - 300)) + 300
  ); // Random likes between 300 and 500
  const [hasLiked, setHasLiked] = useState<boolean>(false); // Track if the user has liked

  const fetchRandomImage = async (searchQuery: string) => {
    setLoading(true);
    try {
      const response = await axios.get("https://api.pexels.com/v1/search", {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
        params: {
          query: searchQuery,
          per_page: 1,
          page: Math.floor(Math.random() * 100),
        },
      });

      const newImage = response.data.photos[0]?.src?.large;
      if (newImage) {
        setImages((prevImages) => [...prevImages, newImage]);
        setCurrentIndex(images.length);
      }
    } catch (error) {
      console.error("Error fetching the image:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomImage(keyword);
  }, [keyword]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setKeyword(searchTerm);
  };

  const nextImage = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      fetchRandomImage(keyword);
    }
  };

  const prevImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const enterFullSize = () => setIsFullSize(true);
  const exitFullSize = () => setIsFullSize(false);

  const handleRating = (stars: number) => {
    setRating(stars);
  };

  const submitFeedback = async () => {
    if (!rating || !feedback) {
      alert("Please provide both a rating and feedback!");
      return;
    }

    const message = `Rating: ${rating} stars\nFeedback: ${feedback}`;

    try {
      await axios.post(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
        }
      );
      setSubmitted(true);
    } catch (error) {
      console.error("Error sending feedback to Telegram:", error);
    }
  };

  const handleLike = () => {
    if (!hasLiked) {
      setLikes((prevLikes) => prevLikes + 1); // Increment likes
      setHasLiked(true); // Set hasLiked to true to prevent further likes
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center bg-gray-100 p-2">
        <h1 className="text-2xl font-semibold m-4 shadow-md text-center text-gray-500 ">
          Random Wallpaper Generator
        </h1>

        {/* Search form */}
        {!isFullSize && (
          <form onSubmit={handleSearch} className="flex items-center mb-6">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter a keyword (e.g., nature, cars, space)"
              className="p-2 border rounded-l-md w-72 outline-none"
            />
            <button
              type="submit"
              className="bg-[#c6b7fe] text-white px-4 py-2 rounded-r-md hover:bg-purple-600 transition duration-300"
            >
              <FaSearch />
            </button>
          </form>
        )}

        {/* Image Display */}
        {loading ? (
          <img src={load} alt="Loading..." className="w-full h-32" /> // Replace with your loading image path
        ) : images[currentIndex] ? (
          <div
            className={`max-w-4xl h-[70vh] bg-gray-100 rounded-lg shadow-lg p-4 ${
              isFullSize ? "h-screen w-screen fixed top-0 left-0 z-50" : ""
            }`}
          >
            <img
              src={images[currentIndex]}
              alt="Random Wallpaper"
              className="w-full h-full object-cover"
            />
            {/* Button to go to Full Size */}
            {!isFullSize && (

              <div className="m-9">


             
              <div className="mt-9 flex items-center ">
                <button
                  onClick={enterFullSize}
                  className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition duration-300"
                >
                  View Full Size
                </button>
                <button
                  onClick={handleLike}
                  className="ml-2 text-red-500 cursor-pointer"
                >
                  <FaHeart />
                </button>
                {likes}
              </div>
              </div>
            )}

            {/* Full Size Controls */}
            {isFullSize && (
              <div className="absolute top-4 left-4 space-x-9 ">
                <button
                  onClick={prevImage}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300 "
                >
                  <FaArrowLeft />
                </button>
                <button
                  onClick={nextImage}
                  className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition duration-300"
                >
                  <FaArrowRight />
                </button>
                <button
                  onClick={exitFullSize}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                >
                  Exit Full Size
                </button>
              </div>
            )}
          </div>
        ) : (
          <p>No image found</p>
        )}

        {/* Navigation Buttons (for non-full-size mode) */}
        {!isFullSize && (
          <div className="flex space-x-4 mb-9  ">
            <button
              onClick={prevImage}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300"
              disabled={currentIndex === 0}
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={nextImage}
              className="bg-purple-400 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition duration-300"
            >
              <FaArrowRight />
            </button>
          </div>
        )}

        {/* Rating and Feedback Form */}
        {!isFullSize && !submitted && (
          <div className="mt-8 space-y-4">
            <div>
              <p className="text-lg font-semibold">Rate this wallpaper:</p>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRating(star)}
                    className={`text-2xl ${
                      rating >= star ? "text-yellow-500" : "text-gray-400"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Leave your feedback here"
                className="w-full p-2 border rounded-md"
                rows={4}
              />
            </div>
            <div className="flex justify-center">
              <button
                onClick={submitFeedback}
                className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition duration-300 "
              >
                Feedback
              </button>
            </div>
          </div>
        )}

        {submitted && (
          <p className="text-green-500 mt-6">Thank you for your feedback!</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default App;
