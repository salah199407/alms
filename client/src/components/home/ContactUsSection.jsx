"use client";

import { useState } from "react";

export default function ContactUsSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const toggleModal = () => setIsOpen(!isOpen);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    toggleModal();
  };

  return (
    <section className="py-10 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white border border-gray-200 shadow-xl rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between transition-transform hover:scale-[1.02]">
          {/* Left Side - Icon + Text */}
          <div className="flex items-center mb-6 md:mb-0">
            {/* Icon */}
            <div className="bg-orange-100 p-4 rounded-full flex items-center justify-center mr-6 shadow-md">
              <svg
                className="h-10 w-10 text-orange-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M2 4a2 2 0 012-2h16a2 2 0 012 2v2l-10 6L2 6V4zm0 4.236l9.684 5.811a2 2 0 002.632 0L22 8.236V20a2 2 0 01-2 2H4a2 2 0 01-2-2V8.236z" />
              </svg>
            </div>

            {/* Text */}
            <div className="text-left">
              <h3 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-1">
                Want to get in touch?
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                Click the button below to schedule a meeting or send us a proposal.
              </p>
              <p className="text-gray-400 text-xs md:text-sm mt-2">
                Our team is available to answer all your questions.
              </p>
            </div>
          </div>

          {/* Right Side - Button */}
          <button
            onClick={toggleModal}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-10 text-lg rounded-full shadow-md transition transform hover:scale-105"
          >
            Contact Us
          </button>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
            {/* Orange Header with Icon */}
            <div className="bg-orange-500 h-36 flex flex-col items-center justify-center relative">
              {/* Icon */}
              <div className="bg-white p-3 rounded-full shadow-lg mb-2">
                <svg
                  className="h-8 w-8 text-orange-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M2 4a2 2 0 012-2h16a2 2 0 012 2v2l-10 6L2 6V4zm0 4.236l9.684 5.811a2 2 0 002.632 0L22 8.236V20a2 2 0 01-2 2H4a2 2 0 01-2-2V8.236z" />
                </svg>
              </div>
              {/* Title */}
              <h2 className="text-3xl font-bold text-white">Contact Us</h2>
            </div>

            {/* Form Content */}
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-left text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-left text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-left text-gray-700 mb-1">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                    rows="4"
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={toggleModal}
                    className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                  >
                    {/* Back Arrow Icon */}
                    <svg
                      className="h-5 w-5 mr-2 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
