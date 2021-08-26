"use strict";

const RfgSql = require("./rfgpageSql");

class RfgClass {
    constructor(url) {
        this.body = url; // 프론트에서 받아온 req 값을 user.body에 저장함.
    }

    async GetIgdrc() {
        const client = this.body;
        try{
            const response = await RfgSql.GetIgdrc(client);
            return response;
        } catch (err){
            console.log(err);
        }
    }

    async GetIgd(){
        const client = this.body
        try{
            const response = await RfgSql.GetIgd(client);
            return response;
        } catch (err){
            console.log(err);
        }
    }

    async GetUserRFG() {
        const client = this.body;
        try{
            const response = await RfgSql.GetUserRFG(client);
            return response;
        } catch (err){
            console.log(err);
        }
    }

    async UpdateRFG() {
        const client = this.body;
        try{
            const response = await RfgSql.UpdateRFG(client);
            return response;
        } catch (err){
            console.log(err);
        }
    }

    
}

module.exports = RfgClass;
