import { Fragment } from "react";
import { Navigate, useLocation } from "react-router-dom";

function RouteGuard({ authenticated, user, element }) {
  const location = useLocation();

  const publicRoutes = ["/", "/home", "/courses", "/auth", "/course/details"];

  if (!authenticated && publicRoutes.some(route => location.pathname.startsWith(route))) {
    return <Fragment>{element}</Fragment>;
  }

  if (location.pathname === "/") {
    return <Navigate to="/home" replace />;
  }

  if (!authenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (authenticated) {
    switch (user?.role) {
      case "super_admin":
        if (!location.pathname.includes("/super-admin")) {
          return <Navigate to="/super-admin" replace />;
        }
        break;

      case "org_admin":
        if (!location.pathname.startsWith("/org-admin")) {
          return <Navigate to="/org-admin" replace />;
        }
        break;

      case "instructor":
        if (!location.pathname.includes("/instructor")) {
          return <Navigate to="/instructor" replace />;
        }
        break;

      case "student":
        if (
          !location.pathname.startsWith("/home") &&
          !location.pathname.startsWith("/courses") &&
          !location.pathname.startsWith("/course-details")
        ) {
          return <Navigate to="/home" replace />;
        }
        break;

      default:
        return <Navigate to="/auth" replace />;
    }
  }

  return <Fragment>{element}</Fragment>;
}

export default RouteGuard;
