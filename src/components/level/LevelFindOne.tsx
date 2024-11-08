import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Pagination from "react-bootstrap/Pagination";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGet } from "../hooks/useGet.ts";
import { Level, Unit, Course } from "./../types";
import "./../../index.css";
import { UnitPreview } from "./../unit/UnitFindOne";
import { NavigationButton } from "../Buttons/NavigationButton.tsx";
import { Card } from "react-bootstrap";

interface LevelProps {
  id: number;
}

const LevelView: React.FC<LevelProps> = ({ id }) => {
  const {
    data: level,
    loading,
    error,
    fetchData,
  } = useGet<Level>(`/api/levels/${id}`);

  //***********************
  // tipo de usuario harcodeado
  let userType = false ? "admin" : "member";
  //**********************************

  useEffect(() => {
    fetchData();
  }, [fetchData, id]);
  const numberOfLevels = level?.course?.levels?.length ?? 0;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <Container>
      <Card>
        <h3>
          Level {level?.order}: {level?.name}
        </h3>

        <Row className="text-aling-left">
          <p>{level?.description}</p>
        </Row>

        <Col>
          <ListGroup>
            {Array.isArray(level?.units) && level?.units.length > 0 ? (
              level?.units.map((unit: Unit) => <UnitPreview id={unit.id} />)
            ) : (
              <p>No units available</p>
            )}
          </ListGroup>
        </Col>
        {userType == "admin" && (
          <>
            <NavigationButton
              to={`/unit/create/${level?.name}/${level?.id}`}
              label="Add unit"
            />
            <br />
            <NavigationButton
              to="/level/update"
              label="Edit level"
              variant="success"
            />
          </>
        )}
      </Card>
      <br />
      <NavigationButton
        to={`/course/${level?.course?.id}`}
        label="Back to Course"
        variant="secondary"
      />
    </Container>
  );
};
export const LevelGetOne: React.FC = () => {
  const { id: levelId } = useParams<{
    id: string;
  }>();

  // Obtener los datos del curso
  const {
    data: level,
    loading: levelLoading,
    error: levelError,
  } = useGet<Level>(`/api/levels/${levelId}`);
  const courseId = level?.course.id.toString();
  const {
    data: course,
    loading: courseLoading,
    error: courseError,
  } = useGet<Course>(`/api/courses/${courseId}`);
  const [currentLevelId, setCurrentLevelId] = useState<number | undefined>();

  useEffect(() => {
    // Establecer el nivel actual basado en el levelId que siempre está definido.
    if (course && course.levels.length > 0 && levelId) {
      const levelIdNumber = parseInt(levelId, 10);
      setCurrentLevelId(levelIdNumber);
    }
  }, [course, levelId]);

  if (levelLoading | courseLoading) {
    return (
      <Container className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (levelError | courseError) {
    return (
      <Container>
        <Alert variant="danger">Error loading course data: {error}</Alert>
      </Container>
    );
  }

  const currentLevel = course?.levels.find(
    (level) => level.id === currentLevelId
  );

  const totalLevels = course?.levels.length || 0;
  const firstTwo = course?.levels.slice(0, 2) || [];
  const lastTwo = course?.levels.slice(-2) || [];
  const currentIndex = course?.levels.findIndex(
    (level) => level.id === currentLevelId
  );
  const previous = currentIndex > 0 ? course?.levels[currentIndex - 1] : null;
  const next =
    currentIndex < totalLevels - 1 ? course?.levels[currentIndex + 1] : null;

  // Niveles que se mostrarán en el índice
  let indexLevels: Level[] = [];
  const addedLevels = new Set<number>(); // Conjunto para rastrear IDs de niveles agregados

  if (totalLevels <= 8) {
    indexLevels = course?.levels || [];
  } else {
    // Agregar los primeros dos niveles
    for (const level of firstTwo) {
      if (!addedLevels.has(level.id)) {
        indexLevels.push(level);
        addedLevels.add(level.id);
      }
    }

    // Agregar el nivel anterior si no está ya en el índice
    if (previous && !addedLevels.has(previous.id)) {
      indexLevels.push(previous);
      addedLevels.add(previous.id);
    }

    // Agregar el nivel actual si no está ya en el índice
    if (currentLevel && !addedLevels.has(currentLevel.id)) {
      indexLevels.push(currentLevel);
      addedLevels.add(currentLevel.id);
    }

    // Agregar el nivel siguiente si no está ya en el índice
    if (next && !addedLevels.has(next.id)) {
      indexLevels.push(next);
      addedLevels.add(next.id);
    }

    // Agregar los últimos dos niveles
    for (const level of lastTwo) {
      if (!addedLevels.has(level.id)) {
        indexLevels.push(level);
        addedLevels.add(level.id);
      }
    }
  }

  const goToPreviousLevel = () => {
    if (previous) {
      setCurrentLevelId(previous.id);
    }
  };

  const goToNextLevel = () => {
    if (next) {
      setCurrentLevelId(next.id);
    }
  };

  return (
    <Container>
      <h4>Course: {level?.course?.title}</h4>

      {currentLevel && <LevelView id={currentLevel.id} />}
      <br />
      <Row className="align-items-center">
        <Col md={4} className="text-start">
          <Button
            variant="primary"
            onClick={goToPreviousLevel}
            disabled={!previous}
          >
            {"<PREVIOUS"}
          </Button>
        </Col>
        <Col md={4} className="d-flex justify-content-center">
          <Pagination>
            {indexLevels.map((level) => (
              <Pagination.Item
                key={level.id}
                active={level.id === currentLevelId}
                onClick={() => setCurrentLevelId(level.id)}
                style={
                  level.id === currentLevelId
                    ? { color: "white", backgroundColor: "#007bff" }
                    : {}
                }
              >
                <Link
                  to={`/level/${level.id}`}
                  style={level.id === currentLevelId ? { color: "white" } : {}}
                >
                  {level.order}
                </Link>
              </Pagination.Item>
            ))}
          </Pagination>
        </Col>
        <Col md={4} className="text-end">
          <Button
            variant="primary"
            onClick={goToNextLevel}
            disabled={!next}
            className="ms-3"
          >
            {"NEXT>"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export const LevelPreview: React.FC<LevelProps> = ({ id }) => {
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
          <p style={{ textAlign: "left", marginLeft: "20px" }}>
            {level?.description}
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <ListGroup>
            {Array.isArray(level?.units) && level?.units.length > 0 ? (
              level?.units.map((unit: Unit) => (
                <ListGroup.Item key={unit.id}>
                  <strong>
                    Unit {unit.order}: {unit.name}
                  </strong>
                </ListGroup.Item>
              ))
            ) : (
              <p>No units available</p>
            )}
          </ListGroup>
        </Col>
      </Row>
      <br />
      <NavigationButton
        to={`/level/${level?.course.id}/${level?.id}`}
        label="View Level"
      />
    </Container>
  );
};
