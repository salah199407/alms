import { motion } from "framer-motion";
import { ArrowRight, Award, Briefcase, BadgeCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-black relative overflow-hidden">
      {/* 🎨 Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#f97316_0.5px,transparent_0.5px)] bg-[length:24px_24px] opacity-5"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* ✅ LEFT : Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-1/2 flex justify-center"
          >
            <div className="w-[90%] rounded-2xl overflow-hidden shadow-lg border border-orange-500/20">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
                alt="About Orange Digital Center"
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>

          {/* ✅ RIGHT : Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            {/* Title badge */}
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20">
              <span className="h-2 w-2 rounded-full bg-orange-500"></span>
              <span className="text-sm font-medium text-orange-500">Our Mission</span>
            </div>

            {/* Main Title */}
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Transform your future with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-300">
                Orange Digital Center
              </span>
            </h2>

            {/* Description */}
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              Orange Digital Center is an innovative ecosystem dedicated to the development of digital skills and innovation. 
              Our mission is to prepare tomorrow's talents through top-notch training and personalized mentorship.
            </p>

            <p className="text-gray-400 mb-8">
              We offer a wide range of courses in the most in-demand digital fields, designed by industry experts to ensure the acquisition of practical and market-relevant skills.
            </p>

            {/* Features list */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {[
                { 
                  icon: <Award className="h-8 w-8 text-orange-500 mb-4" />, 
                  title: "Recognized Expertise", 
                  description: "Learn from experienced industry professionals with hands-on expertise." 
                },
                { 
                  icon: <Briefcase className="h-8 w-8 text-orange-500 mb-4" />, 
                  title: "Practical Projects", 
                  description: "Learn by doing through real-world case study projects." 
                },
                { 
                  icon: <BadgeCheck className="h-8 w-8 text-orange-500 mb-4" />, 
                  title: "Recognized Certification", 
                  description: "Earn certifications highly valued by today's employers." 
                },
                { 
                  icon: <Users className="h-8 w-8 text-orange-500 mb-4" />, 
                  title: "Personalized Mentorship", 
                  description: "Benefit from personalized support to achieve your goals." 
                },
              ].map((item, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-5 border border-orange-500/10 hover:border-orange-500/30 transition-colors">
                  {item.icon}
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Button className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white border-0">
              Discover Our Approach <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
