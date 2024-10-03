import { Button, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";


interface NavigationButtonProps {
  to: string;
  label: string;
}

export const NavigationButton: React.FC<NavigationButtonProps> = ({
  to,
  label,
}) => {
  return (
    <LinkContainer to={to}>
      <Nav.Link>
        <Button variant="secondary">{label}</Button>
      </Nav.Link>
    </LinkContainer>
  );
};
