"use strict";

const RecipeSql = require("./recipeSql");

class RfgClass {
    constructor(url) {
        this.body = url; // 프론트에서 받아온 req 값을 user.body에 저장함.
    }

    async GetRecipe(){
        const client = this.body
        try{
            const response = RecipeSql.GetRecipe(client);
            return response;
        } catch (err){
            console.log(err);
        }
    }

    async AddLike() {
        const client = this.body;
        try{
            const response = RecipeSql.AddLike(client);
            return response;
        } catch (err){
            console.log(err);
        }
    }

    
}

module.exports = RfgClass;
