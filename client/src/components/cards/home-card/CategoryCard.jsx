import { useNavigate } from "react-router-dom";
import { BarChart, Brain, Cloud, Code, Shield, Smartphone } from "lucide-react";

export default function CategoryCard({ category }) {
  const navigate = useNavigate();

  if (!category) return null;

  const renderIcon = () => {
    switch (category.label.toLowerCase()) {
      case "web development":
      case "backend development":
      case "software engineering":
      case "game development":
        return <Code className="h-8 w-8" />;

      case "data science":
        return <BarChart className="h-8 w-8" />;

      case "cloud computing":
      case "devops engineering":
        return <Cloud className="h-8 w-8" />;

      case "cyber security": 
        return <Shield className="h-8 w-8" />;

      case "mobile development":
        return <Smartphone className="h-8 w-8" />;

      case "artificial intelligence":
        return <Brain className="h-8 w-8" />;

      default:
        return <Code className="h-8 w-8" />;
    }
  };

  const handleClick = () => {
    sessionStorage.setItem("filters", JSON.stringify({ category: [category.id] }));
    navigate("/courses?category=" + category.id);
  };

  return (
    <div
      onClick={handleClick}
      className="group relative overflow-hidden rounded-xl bg-white border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full -mr-16 -mt-16 z-0 transition-transform duration-500 group-hover:scale-150"></div>

      <div className="flex items-center space-x-4 z-10">
        <div className="bg-orange-100 text-orange-500 p-4 rounded-xl group-hover:bg-orange-500 group-hover:text-white transition-colors">
          {renderIcon()}
        </div>
        <div>
          <h3 className="text-lg font-bold group-hover:text-orange-500 transition-colors">
            {category.label}
          </h3>
          <p className="text-sm text-gray-500">
            {category.courseCount} {category.courseCount === 1 ? "course" : "courses"}
          </p>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-orange-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}
