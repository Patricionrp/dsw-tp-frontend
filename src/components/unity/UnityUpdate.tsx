import React, { useEffect } from "react";
import { Link, useNavigate  } from "react-router-dom";
import { usePut} from "./../hooks/usePut";
import { Unity } from "./unity";
import "./unity.css";


export const UnityUpdate = () => {
    const { loading, error, update } = usePut<Unity>("/api/unitys/${id}");
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
        const confirmed = window.confirm(`¿Desea crear el unity: ${name}?`);
        if (confirmed) {
            handleCreate();
            console.log(`El unity ${name} fue creado.`);
            navigate('/unity');
          // Aquí puedes agregar la lógica para crear el unity
        } else {
            console.log(`Creación del unity ${name} cancelada.`);
        }
      };
    const handleCreate = async () => {
        const newUnity: Unity = {
        name: name,
        };
        update(id, newUnity);
    };
    
    return (
        <div className="unity">
        <h2>Create a Unity</h2>
        <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleClick}>Create</button>
        <p></p>
        <button>
            <Link to="/unity">Back to Unitys</Link>
        </button>
        </div>    
    );
    }