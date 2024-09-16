import { useParams } from 'react-router-dom';
import  { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGet } from "../hooks/useGet";
// import { Unit } from  "./../types"; // Removed unused import

interface UnitData {
  id: number;
  name: string;
  // Add other properties if needed
}
import "./unit.css";
import { remove } from "../hooks/useDelete";


export const UnitFindOne = () => {
    const { id } = useParams(); 
    const { data: unit, loading, error, fetchData } = useGet<UnitData>(`/api/unities/${id}`);
    const navigate = useNavigate();

    const handleRemove = () => {
        const confirmed = window.confirm(`¿Desea eliminar el unit: ${unit?.name}?`);
        if (confirmed) {
            remove(`/api/unities/${id}`);
            console.log(`El unit ${unit?.name ?? 'unknown'} fue eliminado.`);
            navigate('/unit');
          // Aquí puedes agregar la lógica para eliminar el unit
        } else {
            console.log(`Eliminación del unit ${unit?.name} cancelada.`);
        }
    };
    useEffect(() => {
      fetchData();
    }, [fetchData, id]);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
  
    return (
      <div>
        <h2>Unit</h2>
        <p>{unit?.name}</p>
        <button >
            <Link to="/unit">Back to Unities</Link>
        </button> 
        <button className="delete-button" onClick={handleRemove}>Delete</button>
        <button className="submit-button"><Link to="/unit/update">Edit</Link></button> 
      </div>
    );
  }