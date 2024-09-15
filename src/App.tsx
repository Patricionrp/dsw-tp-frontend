import { useState } from 'react'
import './App.css'
import { Link } from 'react-router-dom'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>React App</h1>
        <Link to="/topic">Go to Topics</Link>
      </div>
    </>
  )
}


