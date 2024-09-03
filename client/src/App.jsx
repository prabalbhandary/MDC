import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import { useSelector } from "react-redux";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import PublicRoutes from "./components/PublicRoutes/PublicRoutes";
import ApplyDoctor from "./pages/ApplyDoctor/ApplyDoctor";
import Notifications from "./pages/Notifications/Notifications";
import UserList from "./pages/Admin/UserList/UserList";
import DoctorList from "./pages/Admin/DoctorList/DoctorList";
import DoctorProfile from "./pages/Doctor/Profile/DoctorProfile";
import BookAppointment from "./pages/BookAppointment/BookAppointment";
import Appointments from "./pages/Appointments/Appointments";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments/DoctorAppointments";
import AdminProfile from "./pages/Admin/Profile/AdminProfile";
import UserProfile from "./pages/User/Profile";

const App = () => {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <Router>
      {loading && (
        <div className="spinner-parent">
          <div className="spinner-border" role="status"></div>
        </div>
      )}
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoutes>
              <Login />
            </PublicRoutes>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoutes>
              <Register />
            </PublicRoutes>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/apply-doctor"
          element={
            <ProtectedRoutes>
              <ApplyDoctor />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoutes>
              <Notifications />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/admin/userlist"
          element={
            <ProtectedRoutes>
              <UserList />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/admin/doctorlist"
          element={
            <ProtectedRoutes>
              <DoctorList />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/doctor/profile/:userId"
          element={
            <ProtectedRoutes>
              <DoctorProfile />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/book-appointment/:doctorId"
          element={
            <ProtectedRoutes>
              <BookAppointment />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/appointments"
          element={
            <ProtectedRoutes>
              <Appointments />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/doctor/appointments"
          element={
            <ProtectedRoutes>
              <DoctorAppointments />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/admin/profile/:userId"
          element={
            <ProtectedRoutes>
              <AdminProfile />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/user/profile/:userId"
          element={
            <ProtectedRoutes>
              <UserProfile />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
