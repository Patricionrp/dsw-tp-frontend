import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import { NavigationButton } from "../buttons/NavigationButton.tsx";
import { LevelPreview } from "./LevelPreview";
import { userType } from "../Utils/userType.ts";
interface LevelListProps {
  levels: number[] | undefined;
  course: string | undefined;
}

export const LevelList: React.FC<LevelListProps> = ({ levels, course }) => {
  const user = userType() ? userType() : "member";
  return (
    <Container>
      <ListGroup style={{ marginBottom: "1rem" }}>
        {Array.isArray(levels) ? (
          levels.map((level) => (
            <ListGroup.Item key={level}>
              <NavigationButton
                to={`/level/${course}/${level}`}
                style={{ width: "100%" }}
                variant="light"
              >
                <LevelPreview id={level} />
              </NavigationButton>
            </ListGroup.Item>
          ))
        ) : (
          <p>No levels available</p>
        )}
      </ListGroup>
      {user === "admin" && (
        <Container className="d-flex justify-content-center">
          <NavigationButton
            to={`/level/create/${course}`}
            label="Add Level"
            variant="success"
          />
        </Container>
      )}
    </Container>
  );
};
