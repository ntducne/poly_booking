import { Navigate } from "react-router-dom";
import { cookies } from "../config/cookies";

const withAuthorization = (WrappedComponent: any, requiredPermission: any) => {
  return function WithAuthorization(props: any) {
    const permissions = JSON.parse(cookies().Get("AuthUser") as any)[3];
    console.log(permissions, "permissions");
    if (!permissions || !permissions.includes(requiredPermission)) {
      return <Navigate to="/403" />;
    }

    return <WrappedComponent {...props} />;
  };
};

export const permissions = (() => {
  const authUser = cookies().Get("AuthUser");
  if (authUser) {
    const parsed = JSON.parse(cookies().Get("AuthUser") as any);
    return parsed ? parsed[3] : null;
  }
  return null;
})();
export const role = (() => {
  const authUser = cookies().Get("AuthUser");
  if (authUser) {
    const parsed = JSON.parse(cookies().Get("AuthUser") as any);
    return parsed ? parsed[1].role : null;
  }
  return null;
})();
export default withAuthorization;
