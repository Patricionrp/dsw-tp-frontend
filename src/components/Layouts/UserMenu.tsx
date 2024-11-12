import React from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaUserCircle } from "react-icons/fa";
import { userType } from "../common/authentication/userType";
import { useLogout } from "../common/hooks";
export const UserMenu: React.FC = () => {
  const { handleLogout } = useLogout();

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
          <NavDropdown.Item href="/myPurchases">My Purchases</NavDropdown.Item>
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
