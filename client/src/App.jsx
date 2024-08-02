import { useState } from 'react'
import './App.css'
import { Routes, Route, Link} from "react-router-dom"
import RecipesForm from './components/RecipesForm'
import SingleRecipe from './components/SingleRecipe'
import AllRecipes from './components/AllRecipes'
import Page404 from './components/Page404'

function App() {


  return (
    <>
  
      <h1>My recipes</h1>
      <div className="navbar">
        <Link to="/">Home</Link>
        <Link to="/SingleRecipe/:id">Single recipe</Link>
        <Link to="/RecipesForm">Submit a recipe</Link>
      </div>

      <Routes>
        <Route path="/" element={< AllRecipes />} />
          <Route path="/SingleRecipe/:id" element={< SingleRecipe />} />
        <Route path="/RecipesForm" element={< RecipesForm />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  )
}

export default App;
