import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1>My recipes</h1>
    <label>Add ingredients</label>
    <input type="text"></input>
    <button type="submit">Add</button>
    </>
  )
}

export default App
