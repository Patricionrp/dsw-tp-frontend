import React, { useEffect, useRef } from "react";
import { Link, useNavigate  } from "react-router-dom";
import { usePost} from "./../hooks/usePost";
import { Level } from  "./../types";
import "./level.css";


export const LevelCreate = () => {
    const { loading, error, create } = usePost<Level>("/api/levels");
    const [name, setDescription] = React.useState<string>("");
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
        const confirmed = window.confirm(`¿Desea crear el level: "${name}"?`);
        if (confirmed) {
            const newLevel: Level = {name: name};
            create(newLevel);
            console.log(`El level ${name} fue creado.`);
            navigate('/level');
          // Aquí puedes agregar la lógica para crear el level
        } else {
            console.log(`Creación del level ${name} cancelada.`);
        }
      };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleClick();
        }
    }
    return (
        <div className="level">
        <h2>Create a Level</h2>
        <input
            ref={inputRef}
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={handleKeyPress}
        />
        <button onClick={handleClick}>Create</button>
        <p></p>
        <button>
            <Link to="/level">Back to Levels</Link>
        </button>
        </div>    
    );
    }