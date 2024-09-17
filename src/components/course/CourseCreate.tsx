import React, { useEffect, useRef } from "react";
import { Link, useNavigate  } from "react-router-dom";
import { usePost} from "../hooks/usePost";
import { Course, Level, Topic } from "../types";
import "./../topic/topic.css";


export const CourseCreate = () => {
    const { loading, error, create } = usePost<Course>("/api/courses");
    const [title, setTitle] = React.useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

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
        const confirmed = window.confirm(`¿Desea crear el course: "${title}"?`);
        if (confirmed) {
            const newCourse: Course = {title: title};
            create(newCourse);
            console.log(`El course ${title} fue creado.`);
            navigate('/course');
          // Aquí puedes agregar la lógica para crear el course
        } else {
            console.log(`Creación del course ${title} cancelada.`);
        }
      };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleClick();
        }
    }
    return (
        <div className="course">
        <h2>Create a Course</h2>
        <input
            ref={inputRef}
            type="text"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyPress}
        />
        <button onClick={handleClick}>Create</button>
        <p></p>
        <button>
            <Link to="/course">Back to Courses</Link>
        </button>
        </div>    
    );
    }



