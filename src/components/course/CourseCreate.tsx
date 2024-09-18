import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import { usePost} from "../hooks/usePost";
import { Course, Level, Topic } from "../types";
import "./../topic/topic.css";
import { TopicList } from "../topic/TopicList";


export const CourseCreate = () => {
    const { loading, error, create } = usePost<Course>("/api/courses");
    const [title, setTitle] = React.useState<string>("");
    const [price, setPrice] = React.useState<string>("");
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
    //manejo de topics
    const [selectedTopics, setSelectedTopics] = useState<Topic[]>([]); 
    const handleSelectTopic = (topic: Topic) => {
        if (selectedTopics.some(t => t.id === topic.id)) {
            setSelectedTopics(selectedTopics.filter(t => t.id !== topic.id));
        } else {
            // Si no está seleccionado, lo añadimos a la lista
            setSelectedTopics([...selectedTopics, topic]);
        }
    }
    
    
        return (
            <div className="course">
                <h2>Create a Course</h2>
                <hr></hr>
                <div>
                    Title: &nbsp; 
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder='Course Title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onKeyDown={handleKeyPress}
                    /><br/>
                    Price: &nbsp;  
                    <input   
                    ref={inputRef}
                    type="text"
                    placeholder="0000,00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    onKeyDown={handleKeyPress}
                    />
                </div>  
                <div>
                    <h3>Selected Topics:</h3>
                    <ul>{selectedTopics.map((topic) => (
                        <li key={topic.id}>
                            <button onClick={() => handleSelectTopic(topic)} >{topic.description}</button>
                        </li>
                        ))}
                    </ul>
                </div>
                <TopicList selectedTopics={selectedTopics} onSelectTopic={handleSelectTopic} />
            </div>   
        );
}

//<button onClick={handleClick}>Create</button>
