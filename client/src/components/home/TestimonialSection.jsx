

import { motion } from "framer-motion"
import TestimonialCard from "../cards/home-card/TestimonialCard"

const testimonials = [
  {
    id: 1,
    name: "Alexandre Dubois",
    role: "Frontend Developer",
    company: "TechCorp",
    image: "/images/testimonials/user1.jpg",
    content:
      "Thanks to the courses at Orange Digital Center, my career has completely transformed. I gained in-demand skills and landed a frontend developer position at an innovative company. Through the Cloud Computing training, I was able to specialize in DevOps...",
  },
  {
    id: 2,
    name: "Camille Leroy",
    role: "Data Scientist",
    company: "DataViz",
    image: "/images/testimonials/user2.jpg",
    content:
      "Thanks to the courses at Orange Digital Center, my career has completely transformed. I gained in-demand skills and landed a frontend developer position at an innovative company. Through the Cloud Computing training, I was able to specialize in DevOps...",
  },
  {
    id: 3,
    name: "Mathieu Bernard",
    role: "DevOps Engineer",
    company: "CloudSys",
    image: "/images/testimonials/user3.jpg",
    content:
      "Thanks to the courses at Orange Digital Center, my career has completely transformed. I gained in-demand skills and landed a frontend developer position at an innovative company. Through the Cloud Computing training, I was able to specialize in DevOps...",
  },
]

export default function TestimonialSection() {
  return (
    <section id="testimonials" className="py-24 bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,#f97316,transparent_70%)] opacity-5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#f97316_0.5px,transparent_0.5px)] bg-[length:20px_20px] opacity-5"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 mx-auto">
            <span className="h-2 w-2 rounded-full bg-orange-500"></span>
            <span className="text-sm font-medium text-orange-500">Testimonials</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">What our students say</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover how Orange Digital Center has transformed the careers of our learners.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="flex flex-wrap justify-center gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="w-full max-w-sm"
            >
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
