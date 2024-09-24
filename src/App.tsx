import { useState } from 'react'
import './App.css'
import { Link } from 'react-router-dom'

export function App() {

  return (
    <>
      <div>
        <h1>React App</h1>
        <Link to="/topic">Go to Topics</Link>
        <p></p>
        <Link to="/level">Go to Levels</Link>
        <p></p>
        <Link to="/unit">Go to Unit</Link>
        <p></p>
        <Link to="/course">Go to Courses</Link>
        <p></p>
        
      </div>
    </>
  )
}


