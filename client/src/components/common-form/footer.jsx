"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowUp, FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import { scrollToSection } from "../../util/scrollToSection";
import imgFooter from "../../../public/images/img_footer.png";

const Footer = () => {
  const [scrolled, setScrolled] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className="bg-black text-white p-8">
      <div className="container mx-auto flex flex-col md:flex-row items-start justify-between gap-8">

        {/* 🔥 Logo + Texte ODC e-Learning */}
        <div className="flex items-center md:mb-0">
          <img src="https://c.woopic.com/logo-orange.png" alt="Orange Logo" className="h-14" />
          <p className="ml-3 text-sm w-60">
            ODC e-Learning: A free platform for young developers and tech enthusiasts, offering courses to foster creativity and innovation.
          </p>
        </div>

        {/* 🌍 Navigation - Orange Digital Center */}
        <div className="flex flex-col space-y-1">
          <h3 className="text-lg mb-2 text-orange-500 font-bold">Orange Digital Center</h3>
          <nav>
            <ul className="flex flex-col space-y-1">
              <li>
                <button onClick={() => scrollToSection("hero")} className="py-1 hover:text-orange-500 transition-colors duration-300 font-bold">
                  Home
                </button>
              </li>
              <li>
                <Link to="/courses" className="py-1 hover:text-orange-500 transition-colors duration-300 font-bold">
                  Courses
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* ❓ Help & Contact */}
        <div className="flex flex-col space-y-1">
          <h3 className="text-lg mb-2 text-orange-500 font-bold">Help & Contact</h3>
          <nav>
            <ul className="flex flex-col space-y-1">
              <li>
                <button onClick={() => scrollToSection("testimonials")} className="py-1 hover:text-orange-500 transition-colors duration-300 font-bold">
                  Testimonials
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("contact-us")} className="py-1 hover:text-orange-500 transition-colors duration-300 font-bold">
                  Contact Us
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* 📲 Social Media */}
        <div className="flex flex-col space-y-1">
          <h3 className="text-lg mb-2 text-orange-500 font-bold">Get in Touch</h3>
          <div className="flex space-x-3">
            <a href="https://www.facebook.com/orangemaroc/" target="_blank" rel="noopener noreferrer" className="p-2 bg-black hover:bg-orange-800 rounded-full">
              <FaFacebook className="text-xl text-white" />
            </a>
            <a href="https://x.com/orangemaroc" target="_blank" rel="noopener noreferrer" className="p-2 bg-black hover:bg-orange-800 rounded-full">
              <FaTwitter className="text-xl text-white" />
            </a>
            <a href="https://www.instagram.com/orangemaroc/" target="_blank" rel="noopener noreferrer" className="p-2 bg-black hover:bg-orange-800 rounded-full">
              <FaInstagram className="text-xl text-white" />
            </a>
            <a href="https://www.youtube.com/channel/UCnweOLpbF1c1wJGxzbSkQ5Q" target="_blank" rel="noopener noreferrer" className="p-2 bg-black hover:bg-orange-800 rounded-full">
              <FaYoutube className="text-xl text-white" />
            </a>
            <a href="https://www.linkedin.com/company/orange-maroc/" target="_blank" rel="noopener noreferrer" className="p-2 bg-black hover:bg-orange-800 rounded-full">
              <FaLinkedinIn className="text-xl text-white" />
            </a>
          </div>
        </div>
      </div>

      {/* 🛑 Divider Line */}
      <div className="w-full border-t border-gray-500 mt-4 pt-4"></div>

      {/* 📜 Footer Bottom */}
      <div className="flex flex-row items-center justify-center space-x-6">
        <p className="text-sm">© 2025 Orange Digital Center. All rights reserved.</p>

        <img src={imgFooter} alt="ODC Partner Logo" className="h-10" />

        {scrolled && (
          <button onClick={scrollToTop} className="p-2 bg-orange-500 hover:bg-orange-600 rounded-full transition-colors duration-300">
            <FaArrowUp className="text-white" />
          </button>
        )}
      </div>
    </footer>
  );
};

export default Footer;
