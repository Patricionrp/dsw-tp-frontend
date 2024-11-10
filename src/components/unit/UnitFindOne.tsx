import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGet } from "../hooks/useGet.ts";
import { Level, Unit } from "./../types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Container from "react-bootstrap/Container";
import Pagination from "react-bootstrap/Pagination";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { NavigationButton } from "../Buttons/NavigationButton.tsx";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

export const UnitView: React.FC<UnitProps> = ({ id }) => {
  //***********************
  // tipo de usuario harcodeado
  let userType = true ? "admin" : "member";
  //**********************************
  const {
    data: unit,
    loading,
    error,
    fetchData,
  } = useGet<Unit>(`/api/units/${id}`);

  useEffect(() => {
    fetchData();
  }, [fetchData, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Card>
      <h3>
        Level {unit?.level.order}: {unit?.level.name}
      </h3>
      <Card>
        <h2>
          Unit {unit?.order}: {unit?.name}
        </h2>
        <Card></Card>
        <br />
        {userType === "admin" && (
          <NavigationButton
            to="/unit/update"
            label="Edit unit"
            variant="success"
          />
        )}
      </Card>
      <NavigationButton
        to={`/level/0/${unit?.level.id}`}
        label="Back to Level"
      />
    </Card>
  );
};
interface UnitProps {
  id: number;
}

export const UnitPreview: React.FC<UnitProps> = ({ id }) => {
  const {
    data: unit,
    loading,
    error,
    fetchData,
  } = useGet<Unit>(`/api/units/${id}`);

  useEffect(() => {
    fetchData();
  }, [fetchData, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <NavigationButton
      to={`/unit/${unit?.id}`}
      style={{ color: "#000" }}
      variant="Link"
    >
      Unit {unit?.order}: {unit?.name}
    </NavigationButton>
  );
};
export const UnitGetOne: React.FC = () => {
  const { id: unitId } = useParams<{
    id: string;
  }>();
  const {
    data: unit,
    loading: unitLoading,
    error: unitError,
  } = useGet<Unit>(`/api/units/${unitId}`);
  const levelId = unit?.level.id;
  const {
    data: level,
    loading: levelLoading,
    error: levelError,
  } = useGet<Level>(`/api/levels/${levelId}`);
  const [currentUnitId, setCurrentUnitId] = useState<number | undefined>();

  useEffect(() => {
    if (level && level.units.length > 0 && unitId) {
      const unitIdNumber = parseInt(unitId, 10);
      setCurrentUnitId(unitIdNumber);
    }
  }, [level, unitId]);

  if (unitLoading | levelLoading) {
    return (
      <Container className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden"></span>
        </Spinner>
      </Container>
    );
  }

  if (unitError | unitLoading) {
    return (
      <Container>
        {unitError && (
          <Alert variant="danger">Error loading course data: {unitError}</Alert>
        )}
        {levelError && (
          <Alert variant="danger">
            Error loading course data: {levelError}
          </Alert>
        )}
      </Container>
    );
  }

  const currentUnit = level?.units.find((unit) => unit.id === currentUnitId);

  const totalUnits = level?.units.length || 0;
  const firstTwo = level?.units.slice(0, 2) || [];
  const lastTwo = level?.units.slice(-2) || [];
  const currentIndex = level?.units.findIndex(
    (unit) => unit.id === currentUnitId
  );
  const previous = currentIndex > 0 ? level?.units[currentIndex - 1] : null;
  const next =
    currentIndex < totalUnits - 1 ? level?.units[currentIndex + 1] : null;

  // Niveles que se mostrarán en el índice
  let indexUnits: Unit[] = [];
  const addedUnits = new Set<number>(); // Conjunto para rastrear IDs de niveles agregados

  if (totalUnits <= 8) {
    indexUnits = level?.units || [];
  } else {
    // Agregar los primeros dos niveles
    for (const unit of firstTwo) {
      if (!addedUnits.has(unit.id)) {
        indexUnits.push(unit);
        addedUnits.add(unit.id);
      }
    }

    // Agregar el nivel anterior si no está ya en el índice
    if (previous && !addedUnits.has(previous.id)) {
      indexUnits.push(previous);
      addedUnits.add(previous.id);
    }

    // Agregar el nivel actual si no está ya en el índice
    if (currentUnit && !addedUnits.has(currentUnit.id)) {
      indexUnits.push(currentUnit);
      addedUnits.add(currentUnit.id);
    }

    // Agregar el nivel siguiente si no está ya en el índice
    if (next && !addedUnits.has(next.id)) {
      indexUnits.push(next);
      addedUnits.add(next.id);
    }

    // Agregar los últimos dos niveles
    for (const unit of lastTwo) {
      if (!addedUnits.has(unit.id)) {
        indexUnits.push(unit);
        addedUnits.add(unit.id);
      }
    }
  }

  const goToPreviousUnit = () => {
    if (previous) {
      setCurrentUnitId(previous.id);
    }
  };

  const sgoToNextUnit = () => {
    if (next) {
      setCurrentUnitId(next.id);
    }
  };

  return (
    <Container>
      {currentUnit && <UnitView id={currentUnit.id} />}
      <br />
      <Row className="align-items-center">
        <Col md={4} className="text-start">
          <Button
            variant="primary"
            onClick={goToPreviousUnit}
            disabled={!previous}
          >
            {"<PREVIOUS"}
          </Button>
        </Col>
        <Col md={4} className="d-flex justify-content-center">
          <Pagination>
            {indexUnits.map((unit) => (
              <Pagination.Item
                key={unit.id}
                active={unit.id === currentUnitId}
                onClick={() => setCurrentUnitId(unit.id)}
                style={
                  unit.id === currentUnitId
                    ? { color: "white", backgroundColor: "#007bff" }
                    : {}
                }
              >
                <Link
                  to={`/unit/${levelId}/${unit.id}`}
                  style={unit.id === currentUnitId ? { color: "white" } : {}}
                >
                  {unit.order}
                </Link>
              </Pagination.Item>
            ))}
          </Pagination>
        </Col>
        <Col md={4} className="text-end">
          <Button
            variant="primary"
            onClick={sgoToNextUnit}
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
