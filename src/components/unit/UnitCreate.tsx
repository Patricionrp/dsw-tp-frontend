import React, { useEffect, useRef } from "react";
import { Link, useNavigate, useParams  } from "react-router-dom";
import { usePost} from "../hooks/usePost";
import { Unit } from  "../types";
import "./unit.css";


export const UnitCreate = () => {
    const { loading, error, create } = usePost<Unit>("/api/unities");
    const [name, setName] = React.useState<string>("");
    const [number, setNumber] = React.useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const { idLevel } = useParams(); 

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
        const confirmed = window.confirm(`¿Do you want to create the unit: "${name}"?`);
        if (confirmed) {
            const newUnit: Unit = {name: name, number: number};
            create(newUnit);
            console.log(`The unit ${name} It was successfully created.`);
            navigate('/Unit');
          // Aquí puedes agregar la lógica para crear el Unit
        } else {
            console.log(`Creación del Unit ${name} cancelada.`);
        }
      };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleClick();
        }
    }
    return (
        <div className="Unit">
        <h2>Create a Unit</h2>
        <input
            ref={inputRef}
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyPress}
        />
        <p></p>
        <input
            type="number"
            placeholder="unit number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            onKeyDown={handleKeyPress}
        />
        <p></p>
        <button onClick={handleClick}>Create</button>
        <p></p>
        <button>
            <Link to="/Unit">Back to Units</Link>
        </button>
        </div>    
    );
    }
