import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './i18n/config';
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/auth-context/index.jsx";
import InstructorProvider from "./context/instructor-context/index.jsx";
import StudentProvider from "./context/student-context/index.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <InstructorProvider>
        <StudentProvider>
          <App />
        </StudentProvider>
      </InstructorProvider>
    </AuthProvider>
  </BrowserRouter>
);
