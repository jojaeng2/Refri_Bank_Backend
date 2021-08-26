"use strict";

const Adminsql = require("./adminSql");

class AdminClass {
    constructor(url) {
        this.body = url; // 프론트에서 받아온 req 값을 user.body에 저장함.
    }

    ///////////GET////////////
    async getuser() {
        const client = this.body;
        try {
            const response = await Adminsql.getuser(client);
            return response;
        } catch (err) {
            console.log(err)
            return { success: false, msg: "이미 존재하는 아이디입니다." };
        }
    }

    ///////// CHANGE //////////
    async changepswd() {
        const client = this.body;
        try {
            const response = await Adminsql.changepswd(client);
            return response;
        } catch (err) {
            console.log(err)
            return { success: false, msg: "오류가 발생하였습니다." };
        }
    }
}

module.exports = AdminClass;
