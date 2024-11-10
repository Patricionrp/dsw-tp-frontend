import React from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { userType } from "./../Utils/userType";
export const UserMenu: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("user");
      window.location.reload();
    }
  };

  const role = userType();

  return (
    <NavDropdown
      align="end"
      title={<FaUserCircle size={35} />}
      id="user-nav-dropdown"
      menuVariant="dark"
    >
      <NavDropdown.Item href="/inDevelopment/Profile">Profile</NavDropdown.Item>
      <NavDropdown.Item href="/inDevelopment/Configuration">
        Configuration
      </NavDropdown.Item>

      {role === "member" && (
        <>
          <NavDropdown.Item href="/inDevelopment/My Purchases">
            My Purchases
          </NavDropdown.Item>
        </>
      )}
      <NavDropdown.Divider />
      <NavDropdown.Item
        style={{
          color: "#ff0f0f",
          font: "bold",
        }}
        onClick={handleLogout}
      >
        Cerrar sesión
      </NavDropdown.Item>
    </NavDropdown>
  );
};
