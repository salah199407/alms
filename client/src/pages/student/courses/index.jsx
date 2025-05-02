"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchStudentViewCourseListService, searchCoursesByTitleService } from "@/services";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const categoryOptions = [
  { id: "web-development", label: "Web Development" },
  { id: "backend-development", label: "Backend Development" },
  { id: "data-science", label: "Data Science" },
  { id: "machine-learning", label: "Machine Learning" },
  { id: "artificial-intelligence", label: "Artificial Intelligence" },
  { id: "cloud-computing", label: "Cloud Computing" },
  { id: "cyber-security", label: "Cyber Security" },
  { id: "mobile-development", label: "Mobile Development" },
  { id: "game-development", label: "Game Development" },
  { id: "software-engineering", label: "Software Engineering" },
  { id: "devops-engineering", label: "DevOps Engineering" },
];

const levelOptions = [
  { id: "beginner", label: "Beginner" },
  { id: "intermediate", label: "Intermediate" },
  { id: "advanced", label: "Advanced" },
];

const languageOptions = [
  { id: "english", label: "English" },
  { id: "spanish", label: "Spanish" },
  { id: "french", label: "French" },
  { id: "german", label: "German" },
  { id: "chinese", label: "Chinese" },
];

function StudentViewCoursesPage() {
  const [sort, setSort] = useState("title-atoz");
  const [filters, setFilters] = useState({ category: [], level: [], language: [] });
  const [allCourses, setAllCourses] = useState([]);
  const [displayCourses, setDisplayCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // ✅ Ajout scroll to top à chaque changement d'URL
    window.scrollTo(0, 0);

    const queryParams = new URLSearchParams(location.search);
    const q = queryParams.get("query") || queryParams.get("q");
    const categoryParam = queryParams.get("category");

    if (categoryParam) {
      setFilters((prev) => ({
        ...prev,
        category: categoryParam.split(","),
      }));
    }

    if (q) {
      setSearchQuery(q);
      searchCourses(q);
      setSearchPerformed(true);
    } else {
      fetchAllCourses();
      setSearchPerformed(false);
    }
  }, [location.search]);

  async function searchCourses(query) {
    setLoading(true);
    try {
      const response = await searchCoursesByTitleService(query);
      if (response.success) {
        setAllCourses(response.data);
        setDisplayCourses(response.data);
      } else {
        setAllCourses([]);
        setDisplayCourses([]);
      }
    } catch (error) {
      console.error("Search Error:", error);
      setAllCourses([]);
      setDisplayCourses([]);
    } finally {
      setLoading(false);
    }
  }

  async function fetchAllCourses() {
    setLoading(true);
    try {
      const response = await fetchStudentViewCourseListService();
      if (response?.success) {
        setAllCourses(response.data);
        setDisplayCourses(response.data);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  }

  function applyFilters() {
    let filteredCourses = [...allCourses];

    if (filters.category.length > 0) {
      filteredCourses = filteredCourses.filter((course) =>
        filters.category.includes(course.categoryId)
      );
    }

    if (filters.level.length > 0) {
      filteredCourses = filteredCourses.filter((course) =>
        filters.level.includes(course.level?.toLowerCase().trim())
      );
    }

    if (filters.language.length > 0) {
      filteredCourses = filteredCourses.filter((course) =>
        filters.language.includes(course.primaryLanguage?.toLowerCase().trim())
      );
    }

    if (sort === "title-atoz") {
      filteredCourses.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "title-ztoa") {
      filteredCourses.sort((a, b) => b.title.localeCompare(a.title));
    }

    setDisplayCourses(filteredCourses);
  }

  function handleFilterChange(section, value) {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };

      if (!updatedFilters[section]) updatedFilters[section] = [];

      if (updatedFilters[section].includes(value)) {
        updatedFilters[section] = updatedFilters[section].filter((item) => item !== value);
      } else {
        updatedFilters[section].push(value);
      }

      const queryParams = new URLSearchParams(location.search);
      if (updatedFilters[section].length > 0) {
        queryParams.set(section, updatedFilters[section].join(","));
      } else {
        queryParams.delete(section);
      }

      if (searchQuery) {
        queryParams.set("query", searchQuery);
      }

      navigate(`${location.pathname}?${queryParams.toString()}`, { replace: true });

      return updatedFilters;
    });
  }

  useEffect(() => {
    if (allCourses.length > 0) {
      applyFilters();
    }
  }, [filters, sort, allCourses]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">
        {searchQuery ? `Résultats pour "${searchQuery}"` : "Tous les cours"}
      </h1>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 space-y-6">
          <div>
            <h3 className="font-bold mb-2">Categories</h3>
            {categoryOptions.map((cat) => (
              <label key={cat.id} className="flex items-center gap-3 font-medium mb-2">
                <Checkbox
                  checked={filters.category?.includes(cat.id)}
                  onCheckedChange={() => handleFilterChange("category", cat.id)}
                />
                {cat.label}
              </label>
            ))}
          </div>

          <div>
            <h3 className="font-bold mb-2">Level</h3>
            {levelOptions.map((lvl) => (
              <label key={lvl.id} className="flex items-center gap-3 font-medium mb-2">
                <Checkbox
                  checked={filters.level?.includes(lvl.id)}
                  onCheckedChange={() => handleFilterChange("level", lvl.id)}
                />
                {lvl.label}
              </label>
            ))}
          </div>

          <div>
            <h3 className="font-bold mb-2">Language</h3>
            {languageOptions.map((lang) => (
              <label key={lang.id} className="flex items-center gap-3 font-medium mb-2">
                <Checkbox
                  checked={filters.language?.includes(lang.id)}
                  onCheckedChange={() => handleFilterChange("language", lang.id)}
                />
                {lang.label}
              </label>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <select
              className="border p-2 rounded"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="title-atoz">Title: A-Z</option>
              <option value="title-ztoa">Title: Z-A</option>
            </select>
            <span className="text-sm font-bold">{displayCourses.length} Results</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading ? (
              [...Array(4)].map((_, i) => <Skeleton key={i} className="h-32 w-full" />)
            ) : displayCourses.length > 0 ? (
              displayCourses.map((course) => (
                <Card
                  key={course._id}
                  className="cursor-pointer hover:shadow-lg transition"
                  onClick={() => navigate(`/course-details/${course._id}`)}
                >
                  <CardContent className="flex gap-4 p-4">
                    <div className="w-48 h-32 flex-shrink-0">
                      <img
                        src={course.image || "/placeholder.svg"}
                        className="w-full h-full object-cover"
                        alt={course.title}
                      />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg font-bold">{course.title}</CardTitle>
                      <p className="text-sm">{course.level} - {course.primaryLanguage}</p>
                      <p className="text-xs text-gray-500">{course.category?.name || 'Uncategorized'}</p>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <h2 className="font-extrabold text-4xl mb-4">No courses found</h2>
                {searchPerformed && (
                  <p className="text-lg text-gray-600">
                    No courses match your search "{searchQuery}".
                  </p>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default StudentViewCoursesPage;
