import { toast } from "react-toastify";
import { resetRole } from "../../Slices/Auth";
import { cookies } from "../../config/cookies";
import { useDispatch } from "react-redux";

const logout = async () => {
  // Xóa token từ cookies
  const token = JSON.parse(cookies().Get("AuthUser") as any)[2].token;
  await fetch(`${import.meta.env.VITE_URL_API}/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then(() => {
      const dispatch = useDispatch();
      cookies().Delete("AuthUser");
      dispatch(resetRole());
      toast("Đăng xuất thành công");
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
    });
  cookies().Delete("AuthUser");

  // Chuyển hướng người dùng đến trang đăng nhập
};
export default logout;
