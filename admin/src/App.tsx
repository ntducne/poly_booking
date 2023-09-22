import { Route, Routes } from "react-router-dom";
import LayoutAdmin from "./layout/LayoutAdmin";
import Dashboard from "./pages/Admin/Dashboard";
import ListBooking from "./pages/Admin/Booking/List";
import AddBooking from "./pages/Admin/Booking/Add";
import EditBooking from "./pages/Admin/Booking/Edit";
import ListOffers from "./pages/Admin/Offers/List";
import AddOffers from "./pages/Admin/Offers/Add";
import EditOffers from "./pages/Admin/Offers/Edit";
import ListPolicy from "./pages/Admin/Policy/List";
import AddPolicy from "./pages/Admin/Policy/Add";
import EditPolicy from "./pages/Admin/Policy/Edit";
import ListReview from "./pages/Admin/Review/List";
import AddReview from "./pages/Admin/Review/Add";
import EditReview from "./pages/Admin/Review/Edit";
import ListRoom from "./pages/Admin/Room/List";
import AddRoom from "./pages/Admin/Room/Add";
import EditRoom from "./pages/Admin/Room/Edit";
import ListRoomType from "./pages/Admin/RoomType/List";
import AddRoomType from "./pages/Admin/RoomType/Add";
import EditRoomType from "./pages/Admin/RoomType/Edit";
import ListRoomUtilities from "./pages/Admin/RoomUtilities/List";
import AddRoomUtilities from "./pages/Admin/RoomUtilities/Add";
import EditRoomUtilities from "./pages/Admin/RoomUtilities/Edit";
import ListServices from "./pages/Admin/Services/List";
import AddServices from "./pages/Admin/Services/Add";
import EditServicer from "./pages/Admin/Services/Edit";
import ListAdmin from "./pages/Admin/Guset/Admin/List";
import ListUser from "./pages/Admin/Guset/User/List";
import ListRoomExtend from "./pages/Admin/RoomExtend/List";
import AddRoomExtend from "./pages/Admin/RoomExtend/Add";
import EditRoomExtend from "./pages/Admin/RoomExtend/Edit";
import ListBill from "./pages/Admin/Bill/List";
import AddBill from "./pages/Admin/Bill/Add";
import EditBill from "./pages/Admin/Bill/Edit";
import ListFeedBack from "./pages/Admin/Feedback/List";
import NotFound from "./pages/Admin/NotFound";

import LoginAdmin from "./pages/Auth/login";
// import RegisterAdmin from "./pages/Auth/register";

function App() {
  return (
    <>
      <Routes>
        <Route path="login" element={<LoginAdmin />} />
        {/* <Route path="register" element={<RegisterAdmin />} /> */}
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<LayoutAdmin />}>
          <Route path="login" element={<LoginAdmin />} />
          {/* <Route path="register" element={<RegisterAdmin />} /> */}
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="booking">
            <Route index element={<ListBooking />} />
            <Route path="add" element={<AddBooking />} />
            <Route path="edit/:id" element={<EditBooking />} />
          </Route>
          <Route path="offers">
            <Route index element={<ListOffers />} />
            <Route path="add" element={<AddOffers />} />
            <Route path="edit/:id" element={<EditOffers />} />
          </Route>
          <Route path="policy">
            <Route index element={<ListPolicy />} />
            <Route path="add" element={<AddPolicy />} />
            <Route path="edit/:id" element={<EditPolicy />} />
          </Route>
          <Route path="review">
            <Route index element={<ListReview />} />
            <Route path="add" element={<AddReview />} />
            <Route path="edit/:id" element={<EditReview />} />
          </Route>
          <Route path="room">
            <Route index element={<ListRoom />} />
            <Route path="add" element={<AddRoom />} />
            <Route path="edit/:id" element={<EditRoom />} />
          </Route>
          <Route path="roomType">
            <Route index element={<ListRoomType />} />
            <Route path="add" element={<AddRoomType />} />
            <Route path="edit/:id" element={<EditRoomType />} />
          </Route>
          <Route path="roomUtilities">
            <Route index element={<ListRoomUtilities />} />
            <Route path="add" element={<AddRoomUtilities />} />
            <Route path="edit/:id" element={<EditRoomUtilities />} />
          </Route>
          <Route path="roomExtend">
            <Route index element={<ListRoomExtend />} />
            <Route path="add" element={<AddRoomExtend />} />
            <Route path="edit/:id" element={<EditRoomExtend />} />
          </Route>
          <Route path="services">
            <Route index element={<ListServices />} />
            <Route path="add" element={<AddServices />} />
            <Route path="edit/:id" element={<EditServicer />} />
          </Route>
          <Route path="bill">
            <Route index element={<ListBill />} />
            <Route path="add" element={<AddBill />} />
            <Route path="edit/:id" element={<EditBill />} />
          </Route>
          <Route path="feedback">
            <Route index element={<ListFeedBack />} />
          </Route>
          <Route path="admin">
            <Route index element={<ListAdmin />} />
          </Route>
          <Route path="user">
            <Route index element={<ListUser />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
