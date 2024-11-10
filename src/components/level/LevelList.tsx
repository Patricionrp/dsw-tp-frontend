import { useEffect } from "react";

import { useGet } from "../hooks/useGet.ts";
import { Level } from "./../types";
import "./../../index.css";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import { NavigationButton } from "../Buttons/NavigationButton.tsx";

export const LevelList = () => {
  const { data: levels, error, fetchData } = useGet<Level>(`/api/levels`);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  //if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container className="mt-3">
      <h2>Levels</h2>

      {/* Botón para agregar un nuevo nivel */}
      <NavigationButton
        to="/level/create"
        label="Add Level"
        style={{ marginBottom: "1rem" }}
      />

      <ListGroup>
        {Array.isArray(levels) ? (
          levels.map((level) => (
            <ListGroup.Item key={level.id}>
              <NavigationButton
                to={`/level/${level.id}`}
                style={{ width: "100%" }}
              >
                {`${level.id} - ${level.name}`} <br />
                {level.description.length > 50
                  ? `${level.description.substring(0, 50)}...`
                  : level.description}
              </NavigationButton>
            </ListGroup.Item>
          ))
        ) : (
          <p>No levels available</p>
        )}
      </ListGroup>
    </Container>
  );
};
