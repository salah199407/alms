import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Banner() {
  const heroRef = useRef(null);
  const iframeRef = useRef(null);
  const playerRef = useRef(null);
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = sessionStorage.getItem("authToken");
      setIsAuthenticated(!!token);
    }
  }, []);

  const handleButtonClick = () => {
    if (isAuthenticated) {
      navigate("/courses");
    } else {
      navigate("/auth");
    }
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
    if (playerRef.current) {
      playerRef.current.destroy();
      playerRef.current = null;
    }
  };

  useEffect(() => {
    if (isVideoModalOpen && window.YT) {
      createPlayer();
    } else if (isVideoModalOpen) {
      // Load YouTube API if not loaded
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        createPlayer();
      };
    }
  }, [isVideoModalOpen]);

  const createPlayer = () => {
    playerRef.current = new window.YT.Player(iframeRef.current, {
      events: {
        onStateChange: (event) => {
          if (event.data === window.YT.PlayerState.ENDED) {
            closeVideoModal();
          }
        },
      },
    });
  };

  return (
    <section
      ref={heroRef}
      className="relative h-[95vh] flex items-center pt-10 overflow-hidden bg-black"
      id="hero"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,#f97316,transparent_70%)]" />
          <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,#f97316,transparent_70%)]" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f9731610_1px,transparent_1px),linear-gradient(to_bottom,#f9731610_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Content */}
      <div className="container relative mx-auto px-10 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-10 text-white leading-tight">
              <span className="inline-block">
                The <span className="text-orange-500">e-learning</span> platform
              </span>{" "}
              <span className="inline-block">for your professional success</span>
            </h1>

            <p className="text-lg text-gray-300 mb-8 max-w-lg leading-relaxed">
              Orange Digital Center offers high-quality online courses to help you master the most in-demand digital skills on the job market.
            </p>

            <div className="flex flex-wrap gap-6 items-center">
              <button
                onClick={handleButtonClick}
                className="group relative overflow-hidden rounded-lg px-8 py-3 font-semibold text-black transition-transform hover:translate-y-[-3px]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {isAuthenticated ? "Explore Courses" : "Start for Free"}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 z-0 bg-gradient-to-r from-orange-500 to-orange-300" />
              </button>

              {/* 🎬 Play Button */}
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="group flex items-center gap-3 text-white hover:text-orange-500 transition-colors"
              >
                <span className="relative flex h-12 w-12 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-20"></span>
                  <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-white">
                    <Play className="h-4 w-4 ml-0.5" />
                  </span>
                </span>
                <span className="font-medium">Watch Video</span>
              </button>
            </div>
          </motion.div>

          {/* Image */}
          <div className="relative hidden lg:flex items-center justify-center h-[550px]">
            <div className="relative w-[500px] h-[400px] rounded-2xl overflow-hidden border-4 border-orange-500/30 shadow-2xl shadow-orange-500/20">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80"
                alt="Orange Digital Center Students"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <h3 className="text-2xl font-bold text-white">Learn from top  experts</h3>
                <p className="text-gray-300">Over 1000 students trust us</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🎥 Video Modal */}
      {isVideoModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={closeVideoModal}
        >
          <div className="relative w-full max-w-4xl mx-4" onClick={(e) => e.stopPropagation()}>
            {/* X Button */}
            <button
              className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition"
              onClick={closeVideoModal}
            >
              <X className="text-white h-6 w-6" />
            </button>

            {/* Video */}
            <div className="relative pb-[56.25%] h-0 rounded-xl overflow-hidden">
              <iframe
                ref={iframeRef}
                id="player"
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/33OujRiv00s?autoplay=1&controls=1&modestbranding=1&rel=0&playlist=33OujRiv00s&enablejsapi=1"
                title="Orange Digital Center Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
