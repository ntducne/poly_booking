import { Outlet, useNavigate } from "react-router-dom";
import HeaderAuth from "./Header";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

type Props = {};

export default function LayoutAuth({}: Props) {
  const location = useLocation();
  const [cookies] = useCookies(["userInfo"]);
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies?.userInfo) {
      navigate("/");
    }
  }, [cookies.userInfo, location.pathname, location]);
  return (
    <div>
      {!cookies.userInfo ? (
        <>
          <HeaderAuth />
          <Outlet />
        </>
      ) : (
        "loading..."
      )}
    </div>
  );
}
