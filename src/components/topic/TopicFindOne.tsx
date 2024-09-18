import { useParams } from 'react-router-dom';
import  { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGet } from "./../hooks/useGet";
import { Topic } from  "./../types";
import "./topic.css";
import { remove } from "./../hooks/useDelete";


export const TopicFindOne = () => {
    const { id } = useParams(); 
    const { data: topic, loading, error, fetchData } = useGet<Topic>(`/api/topics/${id}`);
    const navigate = useNavigate();

    const handleRemove = () => {
        const confirmed = window.confirm(`¿Desea eliminar el topic: ${topic?.description}?`);
        if (confirmed) {
            remove(`/api/topics/${id}`);
            console.log(`El topic ${topic?.description} fue creado.`);
            navigate('/topic');
          // Aquí puedes agregar la lógica para crear el topic
        } else {
            console.log(`Creación del topic ${topic?.description} cancelada.`);
        }
    };
    useEffect(() => {
      fetchData();
    }, [fetchData, id]);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
  
    return (
      <div>
        <h2>Topic</h2>
        <p>{topic?.description}
          <button className="delete-button" onClick={handleRemove}>Delete</button>
          <button className="edit-button"><Link to={`/topic/update/${topic?.id}?description=${topic?.description}`}>Edit</Link></button>
        </p>
        <button >
            <Link to="/topic">Back to Topics</Link>
        </button> 
        <button className="delete-button" onClick={handleRemove}>Delete</button>
        <button className="submit-button"><Link to="/topic/update">Edit</Link></button> 
      </div>
    );
  }

  interface TopicGetOneProps {
    id: number;
  }
  
  export const TopicGetOne: React.FC<TopicGetOneProps> = ({ id }) => {
    const { data: topic, loading, error, fetchData } = useGet<Topic>(`/api/topics/${id}`);
  
    useEffect(() => {
      fetchData();
    }, [fetchData, id]);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
  
    return (
      <div>
        <button>
          <Link to={`/topic/${topic?.id}`}>{topic?.name}</Link>
        </button>
      </div>
    );
  };