import { Navigate, Route, Routes } from "react-router-dom";
import { cookies } from "../config/cookies";

const PrivateRoute = ({ roles, children, ...props }: any) => {
  const authUser = cookies().Get("AuthUser");
  let userRole = null;
  if (authUser) {
    const parsed = JSON.parse(cookies().Get("AuthUser") as any);
    userRole = parsed ? parsed[1].role : null;
  }

  // If user is not logged in, redirect to login page
  if (!authUser) {
    return <Navigate to="/login" />;
  }

  // If user role is not in the allowed roles, redirect to 403 page
  if (!roles.includes(userRole)) {
    return <Navigate to="/403" />;
  }

  // If user is logged in and role is allowed, render the route
  return (
    <Route {...props}>{children}</Route>
  );
};

export default PrivateRoute;
