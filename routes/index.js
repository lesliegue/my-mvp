var express = require('express');
var router = express.Router();
const db = require("../model/helper");

/* gets all recipes  */
router.get('/', function(req, res, next) {
  db("SELECT * FROM recipe LEFT JOIN ingredients ON recipe.id = ingredients.recipe_id;")
  .then(results => {
    res.send(results.data);
  })
  .catch(err => res.status(500).send(err));
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


router.delete("/:id", async (req, res, next) => {
  let id = req.params.id;
  let result = await db(`SELECT * FROM recipe WHERE id = ${id}`);
  try {
    await db(`DELETE FROM recipe WHERE id = ${id}`);
    const results = await db(`SELECT * FROM recipe`);
    // and sent it back to a response
    res.send(results.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});



module.exports = router;
