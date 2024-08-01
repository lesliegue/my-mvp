import { useState } from 'react'
import './App.css'
import { Routes, Route, Link} from "react-router-dom"
import RecipesForm from './components/RecipesForm'
import SingleRecipe from './components/SingleRecipe'
import AllRecipes from './components/AllRecipes'

function App() {


  return (
    <>
  
      <h1>My recipes</h1>
      <div className="navbar">
        <Link to="/">Home</Link>
        <Link to="/SingleRecipe">Single recipe</Link>
        <Link to="/RecipesForm">Submit a recipe</Link>
      </div>

      <Routes>
        <Route path="/" element={< AllRecipes />} />
        <Route path="/SingleRecipe" element={< SingleRecipe />} />
        <Route path="/RecipesForm" element={< RecipesForm />} />
      </Routes>
    </>
  )
}

export default App;
