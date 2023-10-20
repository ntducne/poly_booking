import { Route, Routes } from "react-router-dom";
import LayoutAdmin from "./layout/LayoutAdmin";
import AddBill from "./pages/Admin/Bill/Add";
import EditBill from "./pages/Admin/Bill/Edit";
import ListBill from "./pages/Admin/Bill/List";
import AddBooking from "./pages/Admin/Booking/Add";
import EditBooking from "./pages/Admin/Booking/Edit";
import ListBooking from "./pages/Admin/Booking/List";
import Dashboard from "./pages/Admin/Dashboard";
import ListFeedBack from "./pages/Admin/Feedback/List";
import ListAdmin from "./pages/Admin/Guset/Admin/List";
import ListUser from "./pages/Admin/Guset/User/List";
import NotFound from "./pages/Admin/NotFound";
import AddOffers from "./pages/Admin/Offers/Add";
import EditOffers from "./pages/Admin/Offers/Edit";
import ListOffers from "./pages/Admin/Offers/List";
import AddPolicy from "./pages/Admin/Policy/Add";
import EditPolicy from "./pages/Admin/Policy/Edit";
import ListPolicy from "./pages/Admin/Policy/List";
import AddReview from "./pages/Admin/Review/Add";
import EditReview from "./pages/Admin/Review/Edit";
import ListReview from "./pages/Admin/Review/List";
import AddRoom from "./pages/Admin/Room/Add";
import EditRoom from "./pages/Admin/Room/Edit";
import ListRoom from "./pages/Admin/Room/List";
import AddRoomExtend from "./pages/Admin/RoomExtend/Add";
import EditRoomExtend from "./pages/Admin/RoomExtend/Edit";
import ListRoomExtend from "./pages/Admin/RoomExtend/List";
import AddRoomType from "./pages/Admin/RoomType/Add";
import EditRoomType from "./pages/Admin/RoomType/Edit";
import ListRoomType from "./pages/Admin/RoomType/List";
import AddRoomUtilities from "./pages/Admin/RoomUtilities/Add";
import EditRoomUtilities from "./pages/Admin/RoomUtilities/Edit";
import ListRoomUtilities from "./pages/Admin/RoomUtilities/List";
import AddServices from "./pages/Admin/Services/Add";
import ListServices from "./pages/Admin/Services/List";
import LoginAdmin from "./pages/Auth/login";
import RoleList from "./pages/Admin/Role/List";
import RoleCreate from "./pages/Admin/Role/Create";
import EditServices from "./pages/Admin/Services/Edit";
import ForgotPasswordAdmin from "./pages/Auth/forgot_password";
import Page403 from "./pages/403";
import Demo from "./pages/demo";
import EditUser from "./pages/Admin/Guset/User/Edit";
import EditAdmin from "./pages/Admin/Guset/Admin/Edit";
import Test from "./pages/test";
import BillDetail from "./pages/Admin/Bill/Detail";
import ListBranches from "./pages/Admin/Branches/List";
import AddBranche from "./pages/Admin/Branches/Add";
import EditBranche from "./pages/Admin/Branches/Edit";
import DetailBooking from "./pages/Admin/Booking/Detail";

function App() {
  return (
    <>
      <Routes>
        <Route path="login" element={<LoginAdmin />} />
        <Route path="forGotPassword" element={<ForgotPasswordAdmin />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<LayoutAdmin />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="booking">
            <Route index element={<ListBooking />} />
            <Route path="add" element={<AddBooking />} />
            <Route path="edit/:id" element={<EditBooking />} />
            <Route path="detail/:id" element={<DetailBooking />} />
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
            <Route path="edit/:id" element={<EditServices />} />
          </Route>
          <Route path="bill">
            <Route index element={<ListBill />} />
            {/* <Route path="add" element={<AddBill />} /> */}
            <Route path=":id" element={<BillDetail />} />
          </Route>
          <Route path="feedback">
            <Route index element={<ListFeedBack />} />
          </Route>
          <Route path="auth">
            <Route path="admin">
              <Route index element={<ListAdmin />} />
              <Route path="edit/:id" element={<EditAdmin />} />
            </Route>
            <Route path="user">
              <Route index element={<ListUser />} />
              <Route path="edit/:id" element={<EditUser />} />
            </Route>
          </Route>
          <Route path="branches">
            <Route index element={<ListBranches />} />
            <Route path="add" element={<AddBranche />} />
            <Route path="edit/:id" element={<EditBranche />} />
          </Route>
          {/* <Route path="decentralization"> */}
          <Route path="role">
            <Route index element={<RoleList />} />
            <Route path="create" element={<RoleCreate />} />
            <Route path="edit" element={<RoleCreate />} />
          </Route>
          <Route path="/demo" element={<Demo />}></Route>
          <Route path="/test" element={<Test />}></Route>
        </Route>
        <Route path="/403" element={<Page403 />}></Route>
      </Routes>
    </>
  );
}

export default App;
