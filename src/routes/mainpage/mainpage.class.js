"use strict";

const MainSql = require("./mainpageSql");

class MainClass {
    constructor(url) {
        this.body = url; // 프론트에서 받아온 req 값을 user.body에 저장함.
    }

    async GetFoodMain(){
        const client = this.body
        try{
            const response = await MainSql.GetFoodMain(client);
            return response;
        } catch (err){
            console.log(err);
        }
    }

    async GetRank(){
        const client = this.body
        try{
            const response = await MainSql.GetRank(client);
            return response;
        } catch (err){
            console.log(err);
        }
    }    
}

module.exports = MainClass;
