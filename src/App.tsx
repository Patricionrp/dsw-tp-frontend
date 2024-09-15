import { useState } from 'react'
import { TopicList, FindOneTopic } from './components/topic/TopicList'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <TopicList/>
        <FindOneTopic />
      </div>
    </>
  )
}

export default App
