import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import { usePut} from "./../hooks/usePut";
import { Topic } from "./Topic";
import "./topic.css";
import { useParams, useSearchParams } from 'react-router-dom';


export const TopicUpdate = () => {
    const { loading, error, update } = usePut<Topic>(`/api/topics`);
    const [newDescription, setDescription] = React.useState<string>("");
    const { id} = useParams();
    const [searchParams] = useSearchParams(); // Para obtener los query strings
    const description = searchParams.get("description") || "";
    const navigate = useNavigate();
    

    //para poner el cursor sobre el imput
    const inputRef = useRef<HTMLInputElement>(null);
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
        const confirmed = window.confirm(`would like to update the topic ${description} to ${newDescription}?`);
        if (confirmed) {
            handleUpdate(id, newDescription);
            console.log(`The topic ${description} was updated to: ${newDescription}`);
            navigate('/topic');
          // Aquí puedes agregar la lógica para crear el topic
        } else {
            console.log(`Topic update ${newDescription} cancelled.`);
        }
      };
    const handleUpdate = async (id: number, newDescription: string) => {
        const newTopic: Topic = {
        description: newDescription,
        };
        update(id, newTopic);
    };
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleClick();
        }
    }
   
    return (
        <div className="topic">
        <h2>Update Topic {description}</h2>
        <input
            ref={inputRef}
            type="text"
            placeholder= {description}
            value={newDescription}
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={handleKeyPress}
        />
        <button onClick={handleClick}>Update</button>
        <p></p>
        <button>
            <Link to={`/topic/${id}`}>Back to Topic</Link>
        </button>
        </div>    
    );
    }