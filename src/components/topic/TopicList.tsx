import React, { useEffect } from "react";
//import { Link } from "react-router-dom";
import { useGet } from "./../hooks/useGet";
import { Topic } from "./Topic";
import "./topic.css";


export const TopicList = () => {
  
  const { data: topics, loading, error, fetchData } = useGet<Topic>(`/api/topics`);

  useEffect(() => {
    fetchData(`/api/topics`);
  }, [fetchData]);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="topic-list">
      <h2>Topics</h2>
      <button className="add-button">
        Add Topic
      </button>
      <ul>
        {Array.isArray(topics) ? (
          topics.map((topic) => (
            <li key={topic.id}>
                {topic.id} - {topic.description}
                <button className="delete-button">Delete</button>
            </li>
          ))
        ) : (
          <p>No topics available</p>
        )}
      </ul>
    </div>
  );
};
export const FindOneTopic = () => {
  const { data: topic, loading, error, fetchData } = useGet<Topic>(`/api/topics/3`);

  useEffect(() => {
    fetchData(`/api/topics/3`);
  }, [fetchData]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Topic</h2>
      <p>{topic?.description}</p>
    </div>
  );
}
