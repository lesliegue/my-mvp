import { useState } from 'react'
import './App.css'
import { Routes, Route, Link} from "react-router-dom"
import RecipesForm from './components/RecipesForm'
import SingleRecipe from './components/SingleRecipe'
import AllRecipes from './components/AllRecipes'
import Page404 from './components/Page404'

function App() {


  return (
    <div className='home'>
      <h1>Leslie's recipes</h1>
      <p className='home-p'>Welcome! Here I will be uploading my latest recipes. To get all the details, just click on the image of the one that catches your eye ;)</p>
      <div className="navbar">
        <Link to="/">Home</Link>
        <Link to="/RecipesForm">Submit a recipe</Link>
      </div>

      <Routes>
        <Route path="/" element={< AllRecipes />} />
        <Route path="/SingleRecipe/:id" element={< SingleRecipe />} />
        <Route path="/RecipesForm" element={< RecipesForm />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  )
}

export default App;
