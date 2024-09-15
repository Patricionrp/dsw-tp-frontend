import { useState } from 'react'
import './App.css'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>React App</h1>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <p>{count}</p>

      </div>
    </>
  )
}


