import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams  } from "react-router-dom";
import { usePost} from "./../hooks/usePost";
import { Level } from  "./../types";
import "./../../index.css";


export const LevelCreate = () => {
    const { loading, error, create } = usePost<Level>("/api/levels");
    const [name, setName] = React.useState<string>("");
    const [units, setUnits] = useState<string[]>([""]);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const { id } = useParams();
    const courseId = parseInt(id!, 10);
    

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
            const newLevel: Level = {name: name, course: courseId};
            create(newLevel);
            console.log(`El level ${name} fue creado.`);
            navigate(`/course/${courseId}`);
            // Aquí puedes agregar la lógica para crear el level
            } else {
                console.log(`Creación del level ${name} cancelada.`);
            }
        };

        // Manejo de "Units"
        const handleAddUnit = () => {
            setUnits([...units, ""]); // Añade un nuevo input vacío cada vez que se presiona el botón
        };
        
        const handleUnitChange = (index: number, value: string) => {
            const newUnits = [...units];
            newUnits[index] = value;
            setUnits(newUnits); // Actualiza el valor del input específico
        };
        const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                handleClick();
            }
        }
        const handleRemoveUnit = (index: number) => {
            const newUnits = [...units];
            newUnits.splice(index, 1); // Elimina el input en el índice específico
            setUnits(newUnits); // Actualiza la lista de inputs
          };
    return (
        
        <div className="level">
        <h1>Course: {courseId}</h1>
        <h2>Create a Level</h2>
        <input
            ref={inputRef}
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyPress}
        />
        <p></p>
        
        {/* Mostrar inputs dinámicos para las units */}
        {units.map((unit, index) => (
            
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <p></p>
            <input
              type="number"
              placeholder={`Unit ${index + 1}`}
              value={unit}
              onChange={(e) => handleUnitChange(index, e.target.value)}
              style={{ marginRight: '10px', flexGrow: 1 }} // Espacio entre el input y el botón
            />
            <button onClick={() => handleRemoveUnit(index)}>Remove</button> {/* Botón de eliminar */}
          </div>
        ))}
         
        <p></p>
        <button onClick={handleAddUnit}>Add Unit</button> {/* Añadir un nuevo input */}
        <ul>
            {units.map((units, index) => (
                <li key={index}>
                    {units}
                </li>
            ))}
        </ul>
        <p></p>
        <button onClick={handleClick}>Create</button>
        <p></p>
        <button>
            <Link to="/level">Back to Levels</Link>
        </button>
        </div>    
    );
    }