import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import { NavigationButton } from "../buttons/NavigationButton.tsx";
import { UnitPreview } from "./UnitPreview";
import { userType } from "../Utils/userType.ts";
interface UnitListProps {
  units: number[] | undefined;
  level: string | undefined;
  course: string | undefined;
}

export const UnitList: React.FC<UnitListProps> = ({ units, level, course }) => {
  const user = userType() ? userType() : "member";
  return (
    <Container>
      <ListGroup style={{ marginBottom: "1rem" }}>
        {Array.isArray(units) ? (
          units.map((unit) => (
            <ListGroup.Item key={unit}>
              <NavigationButton
                to={`/unit/${course}/${level}/${unit}`}
                style={{ width: "100%" }}
                variant="light"
              >
                <UnitPreview id={unit} />
              </NavigationButton>
            </ListGroup.Item>
          ))
        ) : (
          <p>No units available</p>
        )}
      </ListGroup>
      {user === "admin" && (
        <Container className="d-flex justify-content-center">
          <NavigationButton
            to={`/unit/create/${course}/${level}`}
            label="Add Unit"
            variant="success"
          />
        </Container>
      )}
    </Container>
  );
};
