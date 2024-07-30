var express = require('express');
var router = express.Router();
const db = require("../model/helper");

async function getAllRecipes(req) {
  /* ANOTHER WAY TO GET, BUT NOT AS PRETTY
  brings ingredients info separated by comma, maybe handle it on front

  db("SELECT r.title, r.image, r.description, r.servings, r.notes, GROUP_CONCAT(i.name),GROUP_CONCAT(i.amount) FROM recipe r LEFT JOIN ingredients i ON r.id = i.recipe_id;")
  */

  //Harder to read, but gets results in a generated json that creates an array for ingredients 
  let query= `
    SELECT 
    JSON_ARRAYAGG(JSON_OBJECT( 'title', r.title, 'image', r.image, 'description', r.description, 'servings', r.servings, 'notes', r.notes, 'ingredient', i.ingredient)) 
    FROM recipe r LEFT JOIN ( SELECT recipe_id, JSON_ARRAYAGG(JSON_OBJECT('name', name, 'amount', amount, 'measurement unit', measurement_unit)) ingredient 
    FROM ingredients GROUP BY recipe_id) i ON i.recipe_id = r.id 
    `
  const results = await db(query)
  // results.data returns an array of objects, in this case JSONARRAYGG returns only one full object, so we access that object with [0]
  //object.values to not return the entire object (key+value) but only the value, but it returns it as an array and we extract that in a variable to have only a string
    const obj = Object.values(results.data[0]);
  //creating a json from a string, accessing to position [0] since it comes as an array
    const response = JSON.parse(obj[0])
    return response;
}

/* gets all recipes  */
router.get('/', async function(req, res, next) {
  try {
    const recipes = await getAllRecipes(req);
    res.send(recipes);
  } catch (err) {
    res.status(500).send(err);
  }
});

// // get ONE recipe
// router.get("/:id", async (req, res) => {
//   let recipeId = req.params.id;
//   try {
//     const results = await db(`SELECT * FROM recipe LEFT JOIN ingredients ON recipe.id = recipe_id`);
//     res.send(results.data);
//   } catch (err) {
//     res.status(500).send({ error: err.message });
//   }
// });


router.post("/recipe", async (req, res, next) => {
  let { title, image, description, servings, notes } = req.body;
  let sql = `
    INSERT INTO recipe (title, image, description, servings, notes)
    VALUES ('${title}', '${image}', '${description}', '${servings}', '${notes}')
  `;

  try {
    await db(sql);
    const results = await db("SELECT * FROM recipe");
    res.send(results.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.post("/ingredients", async (req, res, next) => {
  let { name, amount, measurement_unit } = req.body;
  let recipeid;
  try {
     recipeid = await db("SELECT MAX(id) FROM recipe");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
  let intrecipe = recipeid.data[0]['MAX(id)']
  let sql = `
    INSERT INTO ingredients (name, amount, measurement_unit, recipe_id)
    VALUES ('${name}', '${amount}', '${measurement_unit}', '`+intrecipe+`')
  `;
  
   try {
    await db(sql);
    const results = await db("SELECT * FROM ingredients");
    res.send(results.data);
  } catch (err) {
    res.status(500).send({ error:  err.message});
  }
});


router.delete("/:id", async function(req, res, next) {
  const { id } = req.params;
  try {
    await db(`DELETE FROM recipe WHERE id=${id}`);
    await db(`DELETE FROM ingredients WHERE recipe_id = ${id}`);
    const recipes = await getAllRecipes();
    res.send(recipes);
  } catch (err) {
    res.status(500).send(err);
  }
});



module.exports = router;
