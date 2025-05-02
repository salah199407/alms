

import { motion } from "framer-motion"

export default function TestimonialCard({ testimonial }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-6 shadow-lg overflow-hidden group"
    >
      {/* Glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-orange-300 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-300" />

      {/* Card content */}
      <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-6 h-full">
        {/* Quote icon */}
        <div className="absolute top-6 right-6 text-orange-500/20 group-hover:text-orange-500/30 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>

        {/* Text */}
        <div className="text-gray-300 mb-6 leading-relaxed">"{testimonial.content}"</div>

        {/* Author */}
        <div className="flex items-center mt-6">
          <div className="h-12 w-12 rounded-full overflow-hidden mr-4 border-2 border-orange-500/30">
            <img
              src={testimonial.image || "/placeholder.svg"}
              alt={testimonial.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-bold text-white">{testimonial.name}</h4>
            <p className="text-sm text-gray-400">
              {testimonial.role}, <span className="text-orange-500">{testimonial.company}</span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
