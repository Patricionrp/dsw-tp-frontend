import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGet } from "../../hooks/useGet.ts";
import { Topic } from "./../../types";
import { TopicGetOne } from "./../../topic/TopicFindOne.tsx";
import { Button, ListGroup, Spinner } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

export const TopicListPage = () => {
  const {
    data: topics,
    loading,
    error,
    fetchData,
  } = useGet<Topic>(`/api/topics`);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <Spinner animation="border" role="status" />;
  if (error) return <p>Error: {error}</p>;
  console.log(topics);
  return (
    <ListGroup>
      {topics && topics.length > 0 ? (
        topics.map((topic) => (
          <ListGroup.Item
            key={topic.id}
            className="d-flex justify-content-between align-items-center"
            style={{
              borderRadius: "8px",
              backgroundColor: "#f8f9fa",
              marginBottom: "8px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <TopicGetOne id={topic.id} />
            <Button
              variant="danger"
              style={{
                borderRadius: "50%",
                padding: "0.4rem 0.6rem",
              }}
            >
              <FaTrash />
            </Button>
          </ListGroup.Item>
        ))
      ) : (
        <p>No topics available</p>
      )}
    </ListGroup>
  );
};
