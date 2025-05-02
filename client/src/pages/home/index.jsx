"use client";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { HomeContext } from "@/context/HomeContext";

import BannerSlider from "@/components/home/BannerSlider";
import CourseCard from "@/components/cards/home-card/CourseCard";
import CategoryCard from "@/components/cards/home-card/CategoryCard";
import TestimonialSection from "@/components/home/TestimonialSection";
import AboutSection from "@/components/home/AboutSection";
import FloatingChatIcon from "@/components/FloatingChatIcon";
import ContactUsSection from "@/components/home/ContactUsSection"; 
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const { publicCourses, categories, homeLoading, error } = useContext(HomeContext);
  const navigate = useNavigate();

  const handleSeeMoreCourses = () => {
    sessionStorage.removeItem("filters");
    navigate("/courses");
  };

  return (
    <main className="relative min-h-screen bg-white overflow-hidden">
      {/* 🧡 Hero Banner */}
      <BannerSlider />
      <FloatingChatIcon />

      {/* 🎯 Popular Courses */}
      <section className="py-20 px-6 bg-white" id="popular-courses">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 mx-auto">
              <span className="h-2 w-2 rounded-full bg-orange-500"></span>
              <span className="text-sm font-medium text-orange-500">Popular Courses</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Our Featured Programs
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              Explore our most popular courses carefully designed by industry experts to help you build the most sought-after skills.
            </p>
          </div>

          {homeLoading ? (
            <p className="text-center text-gray-500">Loading courses...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                {publicCourses.slice(-4).map((course) => (
                  <CourseCard
                    key={course._id}
                    course={{
                      id: course._id,
                      title: course.title,
                      description: course.description,
                      instructor: course.instructorName,
                      level: course.level || "Beginner",
                      duration: course.duration || "2h",
                      image: course.image,
                      rating: course.rating || 4.5,
                      students: course.students || 100,
                      tags: course.tags || [],
                    }}
                  />
                ))}
              </div>

              {/* ➡️ Bouton "See More Courses" centré */}
              <div className="text-center">
                <button
                  onClick={handleSeeMoreCourses}
                  className="group relative overflow-hidden rounded-lg bg-orange-500 px-8 py-3 font-semibold text-white transition-transform hover:-translate-y-1 hover:shadow-lg"
                >
                  <span className="relative z-10">See More Courses</span>
                  <span className="absolute inset-0 bg-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* 🌟 About Section */}
      <AboutSection />

      {/* 🧩 Learning Paths */}
      <section className="py-20 bg-gray-50" id="categories">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 mx-auto">
              <span className="h-2 w-2 rounded-full bg-orange-500"></span>
              <span className="text-sm font-medium text-orange-500">Learning Paths</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Explore Our Areas of Expertise
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover different training categories designed to help you master your future.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.slice(0, 6).map((category) => (
              <CategoryCard key={category.name} category={category} />
            ))}
          </div>

          {/* CTA (See All Categories) */}
          <div className="mt-16 text-center">
            <p className="text-gray-600 mb-6">Can't find what you're looking for?</p>
            <Button
              onClick={handleSeeMoreCourses}
              className="group relative overflow-hidden rounded-lg bg-black px-8 py-3 font-medium text-white transition-transform hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="relative z-10">Explore All Courses</span>
              <span className="absolute inset-0 bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Button>
          </div>
        </div>
      </section>

      {/* 💬 Testimonials */}
      <TestimonialSection />

      {/* 📩 Contact Us Section */}
      <ContactUsSection />
    </main>
  );
}
