import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGet } from "../hooks/useGet";
import { Unit } from  "../types";
import "./unit.css";


export const UnitList = () => {
  
    const { data: unities, error, fetchData } = useGet<Unit>(`/api/unities`);

    useEffect(() => {
      fetchData();
    }, [fetchData]);


    //if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
      <div className="unit-list">
        <h2>Unities</h2>
        <button className="add-button">
          <Link to="/unit/create">Add Unit</Link>
        </button>
        <ul>
          {Array.isArray(unities) ? (
            unities.map((unit) => (
              <li key={unit.id}>
                  <button >
                      <Link to={`/unit/${unit.id}`}>{unit.number} - {unit.name}</Link>
                  </button>
              </li>
            ))
          ) : (
            <p>No unities available</p>
          )}
        </ul>
      </div>
    );
 
};