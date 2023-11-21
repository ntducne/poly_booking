import { Route, Routes } from "react-router-dom";
import LayoutClient from "./layouts/Client";
import AboutPage from "./pages/AboutPage/about";
import ForgotPassword from "./pages/Auth/forgot_password";
import Login from "./pages/Auth/login";
import Profile from "./pages/Auth/profile";
import Register from "./pages/Auth/register";
import ResetPassword from "./pages/Auth/reset-passwork";
import Home from "./pages/Home";
import Detail from "./pages/Room/Detail";
import RoomBooked from "./pages/RoomBooked";
import Rooms from "./pages/Rooms";
import Contact from "./pages/contact";
import Demo from "./pages/demo";

import PaymentLayout from "./layouts/Payment";
import AccommodationBook from "./pages/Payment/accommodation";
import AccommodationReview from "./pages/Payment/accommodation/review";
import PaymentView from "./pages/Payment";
import PaymentProcess from "./pages/Payment/process";
import PaymentStatus from "./pages/Payment/process/status";
import LayoutAuth from "./layouts/Auth";
import SearchOrder from "./pages/SearchOrder";
import RoomDetail from "./pages/Room/Detail2";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutClient />}>
          <Route index element={<Home />} />
          <Route path="rooms" element={<Rooms />} />
          {/* <Route path="rooms/:slug" element={<Detail />} /> */}
          <Route path="rooms/:slug" element={<RoomDetail />} />
          <Route path="contact" element={<Contact />} />
          <Route path="profile" element={<Profile />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="search-order" element={<SearchOrder />} />
          <Route path="user">
            <Route path="room-booked" element={<RoomBooked />} />
          </Route>
        </Route>
        <Route path="/auth" element={<LayoutAuth />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forGotPassword" element={<ForgotPassword />} />
          <Route path="reset/:token" element={<ResetPassword />} />
        </Route>
        <Route path="/accommodation/book" element={<PaymentLayout />}>
          <Route index element={<AccommodationBook />} />
          <Route path="review" element={<AccommodationReview />} />
        </Route>
        <Route path="/payment" element={<PaymentLayout />}>
          <Route index element={<PaymentView />} />
          <Route path="process" element={<PaymentProcess />} />
          <Route path="status" element={<PaymentStatus />} />
        </Route>
        <Route path="demo" element={<Demo />} />
      </Routes>
    </>
  );
}

export default App;
