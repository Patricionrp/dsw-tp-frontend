import React from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaUserCircle } from "react-icons/fa";

import Nav from "react-bootstrap/Nav";
export const UserMenu: React.FC = () => {
  const register = true;
  const userType = "member";
  if (register) {
    return (
      <NavDropdown
        align="end" // Hace que el dropdown se alinee a la derecha
        title={<FaUserCircle size={24} />} // Ícono de usuario
        id="user-nav-dropdown"
        menuVariant="dark" // Variante oscura del menú
      >
        <NavDropdown.Item href="/inDevelopment/Profile">
          Profile
        </NavDropdown.Item>
        <NavDropdown.Item href="/inDevelopment/Configuration">
          Configuration
        </NavDropdown.Item>

        {userType === "member" && (
          <>
            <NavDropdown.Item href="/inDevelopment/My Purchases">
              My Purchases
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item
              style={{
                color: "#ff0f0f",
                font: "bold",
              }}
            >
              Cerrar sesión
            </NavDropdown.Item>
          </>
        )}
      </NavDropdown>
    );
  } else {
    return (
      <NavDropdown
        align="end" // Hace que el dropdown se alinee a la derecha
        title={<FaUserCircle size={24} />} // Ícono de usuario
        id="user-nav-dropdown"
        menuVariant="dark" // Variante oscura del menú
      >
        <NavDropdown.Item href="/inDevelopment/Login">Login</NavDropdown.Item>
        <NavDropdown.Item href="/inDevelopment/Register">
          Register
        </NavDropdown.Item>
      </NavDropdown>
    );
  }
};
