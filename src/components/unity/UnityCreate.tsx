import React, { useEffect, useRef } from "react";
import { Link, useNavigate  } from "react-router-dom";
import { usePost} from "./../hooks/usePost";
import { Unity } from  "./../types";
import "./unity.css";


export const UnityCreate = () => {
    const { loading, error, create } = usePost<Unity>("/api/unities");
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
        const confirmed = window.confirm(`¿Desea crear el unity: "${name}"?`);
        if (confirmed) {
            const newUnity: Unity = {name: name};
            create(newUnity);
            console.log(`El unity ${name} fue creado.`);
            navigate('/unity');
          // Aquí puedes agregar la lógica para crear el unity
        } else {
            console.log(`Creación del unity ${name} cancelada.`);
        }
      };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleClick();
        }
    }
    return (
        <div className="unity">
        <h2>Create a Unity</h2>
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
            <Link to="/unity">Back to Unitys</Link>
        </button>
        </div>    
    );
    }
