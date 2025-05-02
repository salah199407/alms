// // client/src/pages/student/StudentSearchResultsPage.jsx

// import { useSearchParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";

// export default function StudentSearchResultsPage() {
//   const [searchParams] = useSearchParams();
//   const [results, setResults] = useState([]);
//   const query = searchParams.get("q");
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (query) {
//       fetch(`http://localhost:3000/courses/search?q=${query}`)
//         .then(res => res.json())
//         .then(data => setResults(data));
//     }
//   }, [query]);

//   const handleClick = (id) => {
//     navigate(`/course/details/${id}`);
//   };

//   return (
//     <div style={{ padding: "2rem" }}>
//       <h2>Résultats de recherche pour "{query}"</h2>
//       <ul style={{ listStyle: "none", padding: 0 }}>
//         {results.map(course => (
//           <li
//             key={course._id}
//             onClick={() => handleClick(course._id)}
//             style={{
//               margin: "1rem 0",
//               padding: "1rem",
//               border: "1px solid #ccc",
//               borderRadius: "8px",
//               cursor: "pointer"
//             }}
//           >
//             <strong>{course.title}</strong> — {course.category}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
