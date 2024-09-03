import React, { useState } from "react";
import "./Layout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "antd";
import { Container, Navbar, Nav, Offcanvas } from 'react-bootstrap';

const Layout = ({ children }) => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user) || {};

  const userMenu = [
    { name: "Home", path: "/", icon: "ri-home-3-line" },
    { name: "Appointments", path: "/appointments", icon: "ri-file-list-3-line" },
    { name: "Apply Doctor", path: "/apply-doctor", icon: "ri-hospital-line" },
    { name: "Profile", path: `/user/profile/${user?._id}`, icon: "ri-user-line" },
  ];

  const adminMenu = [
    { name: "Home", path: "/", icon: "ri-home-3-line" },
    { name: "Users", path: "/admin/userlist", icon: "ri-user-line" },
    { name: "Doctors", path: "/admin/doctorlist", icon: "ri-user-star-line" },
    { name: "Profile", path: `/admin/profile/${user?._id}`, icon: "ri-user-line" },
  ];

  const doctorMenu = [
    { name: "Home", path: "/", icon: "ri-home-3-line" },
    { name: "Appointments", path: "/appointments", icon: "ri-file-list-3-line" },
    { name: "Profile", path: user?._id ? `/doctor/profile/${user?._id}` : "/profile", icon: "ri-user-line" },
  ];

  const menuToBeRendered = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;
  const role = user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User";

  const unseenNotificationsCount = user?.unseenNotifications?.length || 0;
  const userName = user?.name || "User";

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.clear();
    window.location.href = "/login";
  };

  const profileLink = user?.isAdmin
    ? `/admin/profile/${user?._id}`
    : user?.isDoctor
    ? `/doctor/profile/${user?._id}`
    : `/user/profile/${user?._id}`;

  return (
    <Container fluid className="main">
      <Navbar expand="md" className="header">
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <i className="ri-hospital-line logo fs-2"></i>
            <h1 className="logo ms-2">MDC</h1>
          </Navbar.Brand>
          <Navbar.Toggle 
            aria-controls="offcanvasNavbar"
            onClick={() => setShowOffcanvas(true)}
            className="d-md-none"
          >
            <i className="ri-menu-line fs-2"></i>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav" className="d-none d-md-block">
            <Nav className="me-auto">
              {menuToBeRendered.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Nav.Item key={item.path} className={`nav-item ${isActive ? "active-menu-item" : ""}`}>
                    <Nav.Link as={Link} to={item.path} className="d-flex align-items-center">
                      <i className={item.icon}></i>
                      <span className="ms-2">{item.name}</span>
                    </Nav.Link>
                  </Nav.Item>
                );
              })}
            </Nav>
            <div className="d-flex align-items-center ms-auto">
              <Badge count={unseenNotificationsCount} onClick={() => navigate("/notifications")} className="me-3">
                <i className="ri-notification-3-line header-action-icon"></i>
              </Badge>
              <Link to={profileLink} className="d-flex gap-2 text-decoration-none align-items-center me-3">
                <i className="ri-user-line fs-3"></i>
                <p className="mb-0">{userName}</p>
              </Link>
              <div onClick={handleLogout} className="header-action-icon logout">
                <i className="ri-login-box-line"></i>
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Offcanvas show={showOffcanvas} onHide={() => setShowOffcanvas(false)} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <i className="ri-hospital-line logo fs-2"></i>
            <h1 className="logo ms-2">MDC</h1>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            {menuToBeRendered.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Nav.Item key={item.path} className={`nav-item ${isActive ? "active-menu-item" : ""}`}>
                  <Nav.Link as={Link} to={item.path} className="d-flex align-items-center">
                    <i className={item.icon}></i>
                    <span className="ms-2">{item.name}</span>
                  </Nav.Link>
                </Nav.Item>
              );
            })}
          </Nav>
          <div className="d-flex align-items-center mt-3">
            <Badge count={unseenNotificationsCount} onClick={() => navigate("/notifications")} className="me-3">
              <i className="ri-notification-3-line header-action-icon"></i>
            </Badge>
            <Link to={profileLink} className="d-flex gap-2 text-decoration-none align-items-center me-3">
              <i className="ri-user-line fs-3"></i>
              <p className="mb-0">{userName}</p>
            </Link>
            <div onClick={handleLogout} className="header-action-icon logout">
              <i className="ri-login-box-line"></i>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      <Container fluid className="body">
        {children}
      </Container>
    </Container>
  );
};

export default Layout;
