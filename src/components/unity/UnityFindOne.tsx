import { useParams } from 'react-router-dom';
import  { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGet } from "./../hooks/useGet";
// import { Unity } from "./unity"; // Removed unused import

interface UnityData {
  id: number;
  name: string;
  // Add other properties if needed
}
import "./unity.css";
import { remove } from "./../hooks/useDelete";


export const UnityFindOne = () => {
    const { id } = useParams(); 
    const { data: unity, loading, error, fetchData } = useGet<UnityData>(`/api/unities/${id}`);
    const navigate = useNavigate();

    const handleRemove = () => {
        const confirmed = window.confirm(`¿Desea eliminar el unity: ${unity?.name}?`);
        if (confirmed) {
            remove(`/api/unities/${id}`);
            console.log(`El unity ${unity?.name ?? 'unknown'} fue eliminado.`);
            navigate('/unity');
          // Aquí puedes agregar la lógica para eliminar el unity
        } else {
            console.log(`Eliminación del unity ${unity?.name} cancelada.`);
        }
    };
    useEffect(() => {
      fetchData();
    }, [fetchData, id]);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
  
    return (
      <div>
        <h2>Unity</h2>
        <p>{unity?.name}</p>
        <button >
            <Link to="/unity">Back to Unities</Link>
        </button> 
        <button className="delete-button" onClick={handleRemove}>Delete</button>
        <button className="submit-button"><Link to="/unity/update">Edit</Link></button> 
      </div>
    );
  }