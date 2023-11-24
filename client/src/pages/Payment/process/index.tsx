import { LoadingOutlined } from "@ant-design/icons";
import { Spin, message } from "antd";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
export default function PaymentProcess() {
  const [cookie, setCookie, removeCookie] = useCookies([
    "paymentPage",
    "bookingNow",
    "roomSearch",
    "userBook",
    "paymentMethod",
  ]);
  useEffect(() => {
    setCookie("paymentPage", 3, { path: "/" });
    const process = () => {
      let val = {
        room_id: cookie.bookingNow.room_id,
        checkin: cookie.roomSearch.checkin,
        checkout: cookie.roomSearch.checkout,
        amount_room: cookie.roomSearch.soLuong,
        branch_id: cookie.roomSearch.branch_id,
        adult: cookie.roomSearch.adult,
        children: cookie.roomSearch.child,
        email: cookie.userBook.email,
        phone: cookie.userBook.phone,
        name: cookie.userBook.name,
      };
      console.log(val);

      fetch(`${import.meta.env.VITE_URL_API}/client/v2/booking`, {
        method: "POST",
        body: JSON.stringify(val),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(
              "Có lỗi xảy ra trong quá trình đặt phòng. Status: " +
                response.status
            );
          }
        })
        .then((data) => {
          removeCookie("bookingNow", { path: "/" });
          removeCookie("roomSearch", { path: "/" });
          removeCookie("userBook", { path: "/" });
          setCookie("paymentPage", 0, { path: "/" });
          if (cookie.paymentMethod === "vnpay") {
            removeCookie("paymentMethod", { path: "/" });
            window.location.href = `${
              import.meta.env.VITE_URL_API
            }/pay/vnpay/process/${data.bill.billingCode}/${data.bill.total}`;
          }
        })
        .catch((error) => {
          console.error(error);
          message.error(
            "Có lỗi xảy ra trong quá trình đặt phòng. Vui lòng thử lại sau."
          );
        });
    };
    process();
  }, []);
  return (
    <div
      className="container mx-auto"
      style={{
        maxWidth: 1000,
      }}
    >
      <div className="mt-12 mb-8">
        <h1 className="text-2xl font-bold mb-3">
          <Spin indicator={antIcon} /> Chờ chút, chúng tôi đang xử lý đơn đặt
          của bạn !
        </h1>
      </div>
    </div>
  );
}
