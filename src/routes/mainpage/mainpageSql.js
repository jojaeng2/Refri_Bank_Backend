"use strict";

const db = require("../../config/db"),
    bcrypt = require("bcrypt");
// saltRounds는 env파일에 저장한 값. 비밀번호 해쉬에 사용
const saltRounds = parseInt(process.env.Salt);

class MainSql {

    static async GetFoodMain(req) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM FoodMain WHERE FoodN LIKE '%"+req.id+"%' ORDER BY likeit DESC";
            db.query(query ,(err, data) => {
                if (err) reject(`${err}`)
                resolve(data);
            });
        });
    }

    static async GetRank() {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM FoodMain ORDER BY likeit DESC";
            db.query(query ,(err, data) => {
                if (err) reject(`${err}`)
                //console.log(data)
                resolve(data);
            });
        });
    }
}

module.exports = MainSql;