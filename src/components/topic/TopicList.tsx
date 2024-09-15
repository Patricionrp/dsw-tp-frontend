import React, { useEffect } from "react";
import { Link } from "react-router-dom";
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
        <Link to="/topic/create">Add Topic</Link>
      </button>
      <ul>
        {Array.isArray(topics) ? (
          topics.map((topic) => (
            <li key={topic.id}>
                <button >
                    <Link to={`/topic/${topic.id}`}>{topic.id} - {topic.description}</Link>
                </button>
            </li>
          ))
        ) : (
          <p>No topics available</p>
        )}
      </ul>
    </div>
  );
};

