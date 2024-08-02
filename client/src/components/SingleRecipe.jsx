import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function SingleRecipe() {
    const [recipe, setRecipe] = useState(null);
    const {id} = useParams();
    const getSingleRecipe = async () => {
        try {
          const result = await fetch(`api/recipes/${id}`)
          const data = await result.json();
          setRecipe(data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {}, [])

    return (
        <div>
            <h1>All about this recipe</h1>
            {recipe && (
                <div>
                    <p>{recipe.title}</p>
                    <p>{recipe.description}</p>
                </div>
            )}
        </div>
    )
}