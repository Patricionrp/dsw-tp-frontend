import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGet } from "../hooks/useGet";
import { Unit } from "./../types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { NavigationButton } from "../Buttons/NavigationButton.tsx";


export const UnitFindOne = () => {
  const { id } = useParams();
  const {
    data: unit,
    loading,
    error,
    fetchData,
  } = useGet<UnitData>(`/api/unities/${id}`);

  useEffect(() => {
    fetchData();
  }, [fetchData, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container>
      <Row>
        <h1>
          Unit {unit?.order}: {unit?.name}
        </h1>
      </Row>
      <Row>
        <NavigationButton
          to="/unit/update"
          label="Edit unit"
          variant="success"
        />
        <NavigationButton
          to={`/level/${unit?.level.id}`}
          label="Back to Course"
        />
      </Row>
    </Container>
  );
};
interface UnitPreviewProps {
  id: number;
}

export const UnitPreview: React.FC<UnitPreviewProps> = ({ id }) => {
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
