import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import { usePut} from "../hooks/usePut";
import { Course } from  "../types";
import "./../topic/topic.css";
import { useParams, useSearchParams } from 'react-router-dom';


export const CourseUpdate = () => {
    const { loading, error, update } = usePut<Course>(`/api/courses`);
    const [newTitle, setTitle] = React.useState<string>("");
    const { id} = useParams();
    const [searchParams] = useSearchParams(); // Para obtener los query strings
    const title = searchParams.get("title") || "";
    const navigate = useNavigate();
    

    //para poner el cursor sobre el imput
    const inputRef = useRef<HTMLInputElement>(null);
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
        const confirmed = window.confirm(`would like to update the course ${title} to ${newTitle}?`);
        if (confirmed) {
            handleUpdate(id, newTitle);
            console.log(`The course ${title} was updated to: ${newTitle}`);
            navigate('/course');
          // Aquí puedes agregar la lógica para crear el course
         
        } else {
            console.log(`Course update ${newTitle} cancelled.`);
        }
        
      };
    const handleUpdate = async (id: number, newTitle: string) => {
        const newCourse: Course = {
        title: newTitle,
        };
        update(id, newCourse);
    };
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleClick();
        }
    }
   
    return (
        <div className="course">
        <h2>Update Course {title}</h2>
        <input
            ref={inputRef}
            type="text"
            placeholder= {title}
            value={newTitle}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyPress}
        />
        <button onClick={handleClick}>Update</button>
        <p></p>
        <button>
            <Link to={`/course/${id}`}>Back to Course</Link>
        </button>
        </div>    
    );
    }