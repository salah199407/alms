import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/auth-context";
import { StudentProvider } from "./context/student-context";
import { InstructorProvider } from "./context/instructor-context";

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <StudentProvider>
        <InstructorProvider>
          <App />
        </InstructorProvider>
      </StudentProvider>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
