import React from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaUserCircle } from "react-icons/fa";

import Nav from "react-bootstrap/Nav";
export const UserMenu: React.FC = () => {
  const register = true;
  if (register) {
    return (
      <NavDropdown
        align="end" // Hace que el dropdown se alinee a la derecha
        title={<FaUserCircle size={24} />} // Ícono de usuario
        id="user-nav-dropdown"
        menuVariant="dark" // Variante oscura del menú
      >
        <NavDropdown.Item>Perfil</NavDropdown.Item>
        <NavDropdown.Item>Configuración</NavDropdown.Item>
        <NavDropdown.Item>Compras</NavDropdown.Item>
        <NavDropdown.Item>Subscripciones</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item
          style={{
            color: "#ff0f0f",
            font: "bold",
          }}
        >
          Cerrar sesión
        </NavDropdown.Item>
      </NavDropdown>
    );
  } else {
    return (
      <>
        <Nav.Link href="#login">Iniciar sesión</Nav.Link>
        <Nav.Link href="#register">Registrarse</Nav.Link>
      </>
    );
  }
};
