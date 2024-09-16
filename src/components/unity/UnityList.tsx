import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGet } from "./../hooks/useGet";
import { Unity } from  "./../types";
import "./unity.css";


export const UnityList = () => {
  
  const { data: unities, error, fetchData } = useGet<Unity>(`/api/unities`);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  //if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="unity-list">
      <h2>Unities</h2>
      <button className="add-button">
        <Link to="/unity/create">Add Unity</Link>
      </button>
      <ul>
        {Array.isArray(unities) ? (
          unities.map((unity) => (
            <li key={unity.id}>
                <button >
                    <Link to={`/unity/${unity.id}`}>{unity.id} - {unity.name}</Link>
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