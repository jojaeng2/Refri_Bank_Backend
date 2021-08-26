"use strict";

const Mypagesql = require("./mypageSql");

class BoardClass {
    constructor(url) {
        this.body = url; // 프론트에서 받아온 req 값을 user.body에 저장함.
    }

    ///////////GET////////////
    async likeitpage() {
        const client = this.body;
        try {
            const response = await Mypagesql.likeitpage(client);
            return response;
        } catch (err) {
            console.log(err)
            return { success: false, msg: "오류가 발생하였습니다." };
        }
    }

    async GetMyBoard(){
        const client = this.body
        try{
            const response = await Mypagesql.GetMyBoard(client);
            return response;
        } catch (err){
            console.log(err);
        }
    }
}

module.exports = BoardClass;
