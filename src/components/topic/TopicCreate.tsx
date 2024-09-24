import React, { useEffect, useRef } from "react";
import { Link, useNavigate  } from "react-router-dom";
import { usePost} from "./../hooks/usePost";
import { Topic } from "./../types";
import "./../../index.css";


export const TopicCreate = () => {
    const { loading, error, create } = usePost<Topic>("/api/topics");
    const [description, setDescription] = React.useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    //para poner el cursor sobre el imput
    useEffect(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, []); 

    useEffect(() => {
        if (loading) {
        console.log("loading...");
        }
        if (error) {
        console.log("error...");
        }
    }, [loading, error]);

    const handleClick = () => {
        const confirmed = window.confirm(`¿Desea crear el topic: "${description}"?`);
        if (confirmed) {
            const newTopic: Topic = {description: description};
            create(newTopic);
            console.log(`El topic ${description} fue creado.`);
            navigate('/topic');
          // Aquí puedes agregar la lógica para crear el topic
        } else {
            console.log(`Creación del topic ${description} cancelada.`);
        }
      };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleClick();
        }
    }
    return (
        <div className="topic">
        <h2>Create a Topic</h2>
        <input
            ref={inputRef}
            type="text"
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={handleKeyPress}
        />
        <button onClick={handleClick}>Create</button>
        <p></p>
        <button>
            <Link to="/topic">Back to Topics</Link>
        </button>
        </div>    
    );
    }



