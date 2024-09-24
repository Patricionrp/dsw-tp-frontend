import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGet } from "./../hooks/useGet";
import { Topic } from  "./../types";
import "./../../index.css";


export const TopicList = () =>  {
  
  const { data: topics, error, fetchData } = useGet<Topic>(`/api/topics`);
  

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  
  //if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  console.log(topics);
  return (
    <div className="topic-list">
      <ul >
      {topics ? (
          topics?.map((topic) => (
            <li key={topic.id}>
              <button >{topic.description}</button>
            </li>
          ))
        ) : (
          <p>No topics available</p>
        )}
        <Link to="/topic/create">Create Topic</Link>
      </ul>
      <Link to={`/`}>Back to Mainpage</Link>
    </div>
  );
};

