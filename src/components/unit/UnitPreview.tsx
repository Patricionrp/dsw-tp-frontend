import { useEffect } from "react";
import { useGet } from "../hooks/useGet.ts";
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";
import { Unit } from "../types.tsx";

interface UnitPreviewProps {
  id: number | string;
}

export const UnitPreview: React.FC<UnitPreviewProps> = ({ id }) => {
  const unitId = typeof id === "string" ? parseInt(id) : id;
  const {
    data: unit,
    loading,
    error,
    fetchData,
  } = useGet<Unit>(`/api/units/${unitId}`);
  const unitData = Array.isArray(unit) ? unit[0] : unit;
  useEffect(() => {
    fetchData();
  }, [fetchData, unitId]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <Row className="align-items-center">
      <Col xs="auto" className="text-left">
        <strong>Unit {unitData?.order}:</strong>
      </Col>
      <Col xs="auto" className="text-left">
        {unitData?.name}
      </Col>
    </Row>
  );
};
