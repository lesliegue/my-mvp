import { useState, useEffect } from "react";
import {Link, Outlet} from "react-router-dom";

export default function AllRecipes() {
    const [recipes, setRecipes] = useState([]);

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

    return (
        <div>
            <h1>All my recipes</h1>
            <div className="recipes-listS">
                {/* recipes.ingredients.map to get ingredients showing */}
                {recipes.map((recipe) => (
                    <Link to={`/recipes/${recipe.id}`} key={recipe.id}>
                        {recipe.title}
                    </Link>
                ))}
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}