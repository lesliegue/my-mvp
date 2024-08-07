import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './SingleRecipe.css';

export default function SingleRecipe() {
    const [recipe, setRecipe] = useState(null);
    const {id} = useParams();
    const getSingleRecipe = async () => {
        try {
          const result = await fetch(`/api/recipes/${id}`)
          const data = await result.json();
          setRecipe(data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getSingleRecipe();
    }, [])

    return (
        <div className="sr-container">
            <h3>All about this recipe</h3>
            {recipe && 
                <div className="sr-items">
                    <img src={recipe[0].image}/>
                    <div className="sr-text">
                        <div>
                        <h3>{recipe[0].title}</h3>
                        <p>{recipe[0].description}</p>
                        <hr class="dashed"></hr>
                        <p>{recipe[0].notes}</p>
                        <hr class="dashed"></hr>
                        <p>Servings: {recipe[0].servings}</p>
                        </div>
                        <table className="ingredientTable">
                            <tr>
                                <th>Name</th>
                                <th>Amount</th>
                                <th>Measurement Unit</th>
                            </tr>
                        {recipe[0].ingredient.map((ingredient) => (
                            <tr>
                            <td>{`${ingredient.name}`}</td>
                            <td>{`${ingredient.amount}`}</td>
                            <td>{`${ingredient.measurement_unit}`}</td>
                            </tr>
                        ))}
                        </table>
                    </div>
                </div>
            }
            {/* {recipe[0].ingredient.map((ingredient) => (
                    <Link to={`/recipes/${ingredient.id}`} key={ingredient.id}>
                        {ingredient.name}
                    </Link>
                ))} */}
        </div>
    )
}