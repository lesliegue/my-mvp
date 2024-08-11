import React from "react";
import { useState, useEffect } from "react";
import './RecipesForm.css';

export default function RecipesForm() {
    const [newRecipe, setNewRecipe] = useState({
      title: "",
      image: "",
      description: "",
      servings: "",
      notes: "",
    })
    const [newIngredient, setNewIngredient] = useState({
        name: "",
        amount: "",
        measurement_unit: "",
      })
   

    const handleChange = event => {
        const value = event.target.value;
        setNewRecipe({
          ...newRecipe,
          [event.target.name]: value
        });
      }

      const handleChangeI = event => {
        const value = event.target.value;
        setNewIngredient({
          ...newIngredient,
          [event.target.name]: value
        });
      }

      const handleSubmit = event => {
        event.preventDefault();
        addRecipe()
      };

      const handleSubmitI = event => {
        event.preventDefault();
        addIngredient();
      };

    const addRecipe = () => {
        fetch("/api/recipe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newRecipe)
        })
        .then((res) => res.json())
        .then((data) => {
          setNewRecipe(data)
          console.log(data);
          console.log(newRecipe)
        })
        .catch((error) => {
            console.log(`this is an error: ${error}`);
        })
      };

      const addIngredient = () => {
        fetch("/api/ingredients", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newIngredient)
        })
        .then((res) => res.json())
        .then((data) => {
          setNewIngredient(data)
        })
        .catch((error) => {
            console.log(`this is an error: ${error}`);
        })
      };


    return (
        <div className="recipe-form">
          
            <form onSubmit={e => handleSubmit(e)}>
            <label>Add a new recipe:</label>
            <div className="recipe-inputs">
                <input type="text" 
                        name = "title"
                        placeholder="Title" 
                        onChange={e => handleChange(e)} value= {newRecipe.title}></input>
                <input name = "image" 
                        placeholder="Image URL"
                        onChange={e => handleChange(e)} value= {newRecipe.image}></input>
                <textarea type="text" 
                        name="description"
                        placeholder="Description"
                        onChange={e => handleChange(e)} value= {newRecipe.description}></textarea>
                <input type="number" 
                        name="servings"
                        placeholder="Servings"
                        value={newRecipe.servings}
                        onChange={handleChange}/>
                <input type="text" 
                        name="notes"
                        onChange={e => handleChange(e)} value= {newRecipe.notes}
                        placeholder="Notes"></input>
                <button type="submit" className="submit-button">Submit recipe</button>
                </div>
            </form>
            
            <hr class="dashed"></hr>
            <form onSubmit={e => handleSubmitI(e)}>
                <p>And its ingredients:</p>
                <div className="ingredient-inputs">
                  <input type="text" 
                          name="name"
                          onChange={e => handleChangeI(e)} value= {newIngredient.name}
                          placeholder="Name of ingredient"></input>
                  <input  name="amount"
                          placeholder="Amount"
                          onChange={e => handleChangeI(e)} value= {newIngredient.amount}></input>
                  <input type="text" 
                          name="measurement_unit"
                          placeholder="Measurement unit"
                          onChange={e => handleChangeI(e)} value= {newIngredient.measurement_unit}></input>
                  </div>
                <button type="submit" className="submit-button">Submit ingredient</button>
            </form>
        </div>
    )
}