import React, { useEffect } from "react";
import { Link, useNavigate  } from "react-router-dom";
import { usePut} from "../hooks/usePut";
import { Unit } from  "../types";
import "./unit.css";


export const UnitUpdate = () => {
    const { loading, error, update } = usePut<Unit>("/api/units/${id}");
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
        const confirmed = window.confirm(`¿Desea crear el unit: ${name}?`);
        if (confirmed) {
            handleCreate();
            console.log(`El unit ${name} fue creado.`);
            navigate('/unit');
          // Aquí puedes agregar la lógica para crear el unit
        } else {
            console.log(`Creación del unit ${name} cancelada.`);
        }
      };
    const handleCreate = async () => {
        const newUnit: Unit = {
        name: name,
        };
        update(id, newUnit);
    };
    
    return (
        <div className="unit">
        <h2>Create a Unit</h2>
        <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleClick}>Create</button>
        <p></p>
        <button>
            <Link to="/unit">Back to Units</Link>
        </button>
        </div>    
    );
    }