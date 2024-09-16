import React, { useEffect } from "react";
import { Link, useNavigate  } from "react-router-dom";
import { usePut} from "../hooks/usePut";
import { Level } from  "./../types";
import "./level.css";


export const LevelUpdate = () => {
    const { loading, error, update } = usePut<Level>("/api/levels/${id}");
    const [name, setName] = React.useState<string>("");
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
        const confirmed = window.confirm(`¿Desea crear el level: ${name}?`);
        if (confirmed) {
            handleCreate();
            console.log(`El level ${name} fue creado.`);
            navigate('/level');
          // Aquí puedes agregar la lógica para crear el level
        } else {
            console.log(`Creación del level ${name} cancelada.`);
        }
      };
    const handleCreate = async () => {
        const newLevel: Level = {
        name: name,
        };
        update(id, newLevel); // Use the constant id
    };
    
    return (
        <div className="level">
        <h2>Create a Level</h2>
        <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleClick}>Create</button>
        <p></p>
        <button>
            <Link to="/level">Back to Levels</Link>
        </button>
        </div>    
    );
    }