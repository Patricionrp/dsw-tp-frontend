import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useGet } from "./../hooks/useGet";
import { Level, Unit } from "./../types";
import "./../../index.css";
import { UnitPreview } from "./../unit/UnitFindOne";
import { NavigationButton } from "../Buttons/NavigationButton.tsx";

interface LevelPreviewProps {
  id: number;
}

export const LevelGetOne = () => {
  const { id } = useParams();
  const {
    data: level,
    loading,
    error,
    fetchData,
  } = useGet<Level>(`/api/levels/${id}`);

  useEffect(() => {
    fetchData();
  }, [fetchData, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <Container>
      <Row>
        <Col>
          <h5>Course: {level?.course?.title}</h5>
        </Col>
      </Row>

      <Row>
        <Col>
          <h4>
            Level {level?.order}: {level?.name}
          </h4>
        </Col>
      </Row>
      <Row>
        <p>{level?.description}</p>
      </Row>
      <Row>
        <Col>
          <ListGroup>
            {Array.isArray(level?.units) && level?.units.length > 0 ? (
              level?.units.map((unit: Unit) => <UnitPreview id={unit.id} />)
            ) : (
              <p>No units available</p>
            )}
          </ListGroup>
        </Col>
      </Row>

      <Row>
        <NavigationButton
          to={`/unit/create/${level?.name}/${level?.id}`}
          label="Add unit"
        />
      </Row>

      <br />
      <Row className="justify-content-center">
        <Col md={2}>
          <NavigationButton
            to="/level/update"
            label="Edit level"
            variant="success"
          />
        </Col>
        <Col md={2}>
          <NavigationButton
            to={`/course/${level?.course?.id}`}
            label="Back to Course"
            variant="secondary"
          />
        </Col>
      </Row>
    </Container>
  );
};

export const LevelPreview: React.FC<LevelPreviewProps> = ({ id }) => {
  const {
    data: level,
    loading,
    error,
    fetchData,
  } = useGet<Level>(`/api/levels/${id}`);

  useEffect(() => {
    fetchData();
  }, [fetchData, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container>
      <Row>
        <Col>
          <h4>
            Level {level?.order}: {level?.name}
          </h4>
          <p>{level?.description}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <ListGroup>
            {Array.isArray(level?.units) && level?.units.length > 0 ? (
              level?.units.map((unit: Unit) => (
                <ListGroup.Item key={unit.id}>
                  <h5>
                    Unit {unit.order}: {unit.name}
                  </h5>
                </ListGroup.Item>
              ))
            ) : (
              <p>No units available</p>
            )}
          </ListGroup>
        </Col>
      </Row>
      <NavigationButton to={`/level/${level?.id}`} label="View Level" />
    </Container>
  );
};
