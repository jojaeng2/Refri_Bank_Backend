"use strict";

const RecipeClass = require("./recipe.class"),
    url = require('url'),
    bodyParser = require("body-parser");

const recipe_request = {
    GetRecipe : async (req,res)=>{
        const req_get_recipe = new RecipeClass(req.body);
        const res_get_recipe = await req_get_recipe.GetRecipe();
        return res.json(res_get_recipe);
    },

    AddLike : async (req, res) => {
        const req_add_like = new RecipeClass(req.body);
        const res_add_like = await req_add_like.AddLike();
        return res.json(res_add_like);
    },
}


module.exports = {
    recipe_request
};