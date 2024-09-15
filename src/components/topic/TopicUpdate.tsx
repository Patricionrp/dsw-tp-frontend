import React, { useEffect } from "react";
import { Link, useNavigate  } from "react-router-dom";
import { usePut} from "./../hooks/usePut";
import { Topic } from "./Topic";
import "./topic.css";


export const TopicUpdate = () => {
    const { loading, error, update } = usePut<Topic>("/api/topics/${id}");
    const [description, setDescription] = React.useState<string>("");
    
    const navigate = useNavigate();

    
    useEffect(() => {
        if (loading) {
        console.log("loading...");
        }
        if (error) {
        console.log("error...");
        }
    }, [loading, error]);

    const handleClick = () => {
        const confirmed = window.confirm(`¿Desea crear el topic: ${description}?`);
        if (confirmed) {
            handleCreate();
            console.log(`El topic ${description} fue creado.`);
            navigate('/topic');
          // Aquí puedes agregar la lógica para crear el topic
        } else {
            console.log(`Creación del topic ${description} cancelada.`);
        }
      };
    const handleCreate = async () => {
        const newTopic: Topic = {
        description: description,
        };
        update(id, newTopic);
    };
    
    return (
        <div className="topic">
        <h2>Create a Topic</h2>
        <input
            type="text"
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleClick}>Create</button>
        <p></p>
        <button>
            <Link to="/topic">Back to Topics</Link>
        </button>
        </div>    
    );
    }