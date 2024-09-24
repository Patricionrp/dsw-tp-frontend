import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGet } from "./../hooks/useGet";
import { Level } from  "./../types";
import "./../../index.css";


export const LevelList = () => {
  
  const { data: levels, error, fetchData } = useGet<Level>(`/api/levels`);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  //if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="level-list">
      <h2>Levels</h2>
      <button className="add-button">
        <Link to="/level/create">Add Level</Link>
      </button>
      <ul>
        {Array.isArray(levels) ? (
          levels.map((level) => (
            <li key={level.id}>
                <button >
                    <Link to={`/level/${level.id}`}>{level.id} - {level.name}</Link>
                </button>
            </li>
          ))
        ) : (
          <p>No levels available</p>
        )}
      </ul>
    </div>
  );
};
