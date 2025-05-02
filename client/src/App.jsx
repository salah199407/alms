import { useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AuthContext } from "./context/auth-context";
import HomeProvider from "./context/HomeContext";
import RouteGuard from "./components/route-guard";
import StudentViewCommonLayout from "./components/student-view/common-layout";
import Footer from "./components/common-form/footer";

// Pages d'authentification
import AuthPage from "./pages/auth";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// Pages Super Admin
import SuperAdminPage from "./pages/super-admin/dashboard";
import AllUsers from "./pages/super-admin/AllUsers";
import AllOrganizations from "./pages/super-admin/AllOrganizations";
import OrganizationDetails from "./pages/super-admin/OrganizationDetails";
import CreateOrganizationPage from "./pages/super-admin/create-organization";
import UsersPage from "./pages/super-admin/users";
import CoursesPage from "./pages/super-admin/courses";

// Pages Org Admin
import OrgAdminPage from "./pages/org-admin/dashboard";

// Pages Instructor
import InstructorDashboardPage from "./pages/instructor";
import AddNewCoursePage from "./pages/instructor/add-new-course";

// Pages Student
import HomePage from "./pages/home";
import StudentViewCourseProgressPage from "./pages/student/course-progress";
import StudentViewCoursesPage from "./pages/student/courses";
import StudentCoursesPage from "./pages/student/student-courses";
import ChatbotPage from "./pages/student/ChatbotPage";
import SearchResultsPage from "./pages/student/SearchResultsPage";
import CourseDetail from "./pages/home/course-details";

// Pages communes
import NotFoundPage from "./pages/not-found";

function App() {
  const { auth } = useContext(AuthContext);
  const location = useLocation();

  const protectedRouteProps = {
    authenticated: auth?.authenticate,
    user: auth?.user,
  };

  // Routes où on cache le footer
  const hideFooterRoutes = [
    "/auth",
    "/forgot-password",
    "/reset-password",
    "/not-found",
    "/super-admin",
    "/super-admin/users",
    "/super-admin/organizations",
    "/super-admin/create-organization",
    "/super-admin/courses",
    "/super-admin/manage-users",
    "/org-admin",
    "/instructor",
    "/instructor/create-new-course",
    "/instructor/edit-course",
  ];

  // Vérifie si le footer doit être caché
  const shouldHideFooter = hideFooterRoutes.some(route => location.pathname.startsWith(route));

  return (
    <HomeProvider>
      <>
        <Routes>
          {/* Routes d'authentification */}
          <Route path="/auth" element={<RouteGuard element={<AuthPage />} {...protectedRouteProps} />} />
          <Route path="/forgot-password" element={<RouteGuard element={<ForgotPassword />} {...protectedRouteProps} />} />
          <Route path="/reset-password" element={<RouteGuard element={<ResetPassword />} {...protectedRouteProps} />} />

          {/* Routes Super Admin */}
          <Route path="/super-admin" element={<RouteGuard element={<SuperAdminPage />} {...protectedRouteProps} />} />
          <Route path="/super-admin/users" element={<RouteGuard element={<AllUsers />} {...protectedRouteProps} />} />
          <Route path="/super-admin/organizations" element={<RouteGuard element={<AllOrganizations />} {...protectedRouteProps} />} />
          <Route path="/super-admin/organizations/:id" element={<RouteGuard element={<OrganizationDetails />} {...protectedRouteProps} />} />
          <Route path="/super-admin/create-organization" element={<RouteGuard element={<CreateOrganizationPage />} {...protectedRouteProps} />} />
          <Route path="/super-admin/courses" element={<RouteGuard element={<CoursesPage />} {...protectedRouteProps} />} />
          <Route path="/super-admin/manage-users" element={<RouteGuard element={<UsersPage />} {...protectedRouteProps} />} />

          {/* Routes Org Admin */}
          <Route path="/org-admin" element={<RouteGuard element={<OrgAdminPage />} {...protectedRouteProps} />} />

          {/* Routes Instructor */}
          <Route path="/instructor" element={<RouteGuard element={<InstructorDashboardPage />} {...protectedRouteProps} />} />
          <Route path="/instructor/create-new-course" element={<RouteGuard element={<AddNewCoursePage />} {...protectedRouteProps} />} />
          <Route path="/instructor/edit-course/:courseId" element={<RouteGuard element={<AddNewCoursePage />} {...protectedRouteProps} />} />

          {/* Routes Student */}
          <Route path="/" element={<RouteGuard element={<StudentViewCommonLayout />} {...protectedRouteProps} />}>
            <Route index element={<HomePage />} />
            <Route path="home" element={<HomePage />} />
            <Route path="courses" element={<StudentViewCoursesPage />} />
            <Route path="student-courses" element={<StudentCoursesPage />} />
            <Route path="course-progress/:id" element={<StudentViewCourseProgressPage />} />
            <Route path="chatbot" element={<ChatbotPage />} />
            <Route path="search" element={<SearchResultsPage />} />
            <Route path="course-details/:id" element={<CourseDetail />} />
          </Route>

          {/* Page non trouvée */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        {/* ✅ Footer uniquement sur les pages publiques étudiantes */}
        {!shouldHideFooter && <Footer />}
      </>
    </HomeProvider>
  );
}

export default App;
