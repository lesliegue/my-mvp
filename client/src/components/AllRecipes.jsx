import { useState, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";
import './Home.css';

export default function AllRecipes() {
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllRecipes();
    }, []);

    async function getAllRecipes() {
        try {
          const response = await fetch("/api/recipes");
          const data = await response.json();
          setRecipes(data);
        } catch (err) {
          console.log(err);
        }
      }

      const handleClick = (id) => {
        console.log(id);
        navigate(`/SingleRecipe/${id}`);
      };

    return (
        <div className="recipes-list">
            <h3>All my recipes</h3>
            <div className="grid">
                {/* recipes.ingredients.map to get ingredients showing */}
                {recipes.length > 0 ? recipes.map((recipe) => (
                    <div className="recipe-single">
                        <h2 key={recipe.id} onClick={() => handleClick(recipe.id)}>
                            {recipe.title} 
                        </h2>
                        <img src={recipe.image} onClick={() => handleClick(recipe.id)}>
                        </img>
                        <hr class="dashed"></hr>
                    </div>
                )):null}
            </div>
            <div>
            </div>
        </div>
    )
}