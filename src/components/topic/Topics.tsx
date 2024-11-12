import { useEffect } from "react";

import { useGet } from "../common/hooks/useGet";
import { Topic } from "./../types";
import "./../../index.css";
import ListGroup from "react-bootstrap/ListGroup";

interface TopicsProps {
  selectedTopics: Topic[];
  onSelectTopic?: (topic: Topic) => void;
}
export const Topics: React.FC<TopicsProps> = ({
  selectedTopics,
  onSelectTopic,
}) => {
  const { data: topics, error, fetchData } = useGet<Topic>(`/api/topics`);

  const availableTopics = onSelectTopic
    ? topics?.filter(
        (topic) => !selectedTopics.some((selected) => selected.id === topic.id)
      )
    : selectedTopics;

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  //if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="d-flex flex-wrap">
      <ListGroup horizontal>
        {availableTopics && availableTopics.length > 0 ? (
          availableTopics.map((topic) => (
            <ListGroup.Item
              key={topic.id}
              style={{
                backgroundColor: "#F0F0F0",
                borderRadius: "20px",
                padding: "0px 5px",
                cursor: onSelectTopic ? "pointer" : "default", // Solo hacer clickable si onSelectTopic está definido
                marginRight: "5px",
                marginBottom: "5px",
                color: "#000",
              }}
              onClick={() => onSelectTopic && onSelectTopic(topic)} // Solo ejecutar onClick si onSelectTopic está definido
            >
              {topic.description}
            </ListGroup.Item>
          ))
        ) : (
          <p>No more topics available</p>
        )}
      </ListGroup>
    </div>
  );
};
