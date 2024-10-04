import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { ReactNode } from "react";
import { LinkContainer } from "react-router-bootstrap";

interface NavigationButtonProps {
  to: string;
  label?: string;
  style?: React.CSSProperties;
  variant?: string;
  children?: React.ReactNode;
}

export const NavigationButton: React.FC<NavigationButtonProps> = ({
  to,
  label,
  style,
  variant,
  children,
}) => {
  return (
    <LinkContainer to={to}>
      <Nav.Link>
        <Button style={style} variant={variant}>
          {label}
          {children}
        </Button>
      </Nav.Link>
    </LinkContainer>
  );
};
