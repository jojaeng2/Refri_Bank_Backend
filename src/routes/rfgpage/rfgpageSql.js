"use strict";

const db = require("../../config/db"),
    bcrypt = require("bcrypt");
// saltRounds는 env파일에 저장한 값. 비밀번호 해쉬에 사용
const saltRounds = parseInt(process.env.Salt);

class RfgSql {

    static async GetIgdrc(req) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM FoodMain WHERE FoodId IN (SELECT  FoodId FROM FoodIgd WHERE IgdN1 LIKE '%" + req.igd + "%' OR  IgdN2 LIKE '%" + req.igd + "%' OR  IgdN3  LIKE '%" + req.igd + "%' OR  IgdN4  LIKE '%" + req.igd + "%'  OR  IgdN5  LIKE '%" + req.igd + "%' OR  IgdN6  LIKE '%" + req.igd + "%' OR  IgdN7  LIKE '%" + req.igd + "%' OR  IgdN8  LIKE '%" + req.igd + "%' OR  IgdN9  LIKE '%" + req.igd + "%' OR  IgdN10  LIKE '%" + req.igd + "%' OR  IgdN11  LIKE '%" + req.igd + "%' OR  IgdN12  LIKE '%" + req.igd + "%' OR  IgdN13  LIKE '%" + req.igd + "%' OR  IgdN14  LIKE '%" + req.igd + "%' OR  IgdN15 LIKE '%" + req.igd + "%')"
            db.query(query, (err, data) => {
                if (err) reject(`${err}`);
                resolve(data);
            });
        });
    }

    static async GetIgd() {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM FoodIgd";
            db.query(query, (err, data) => {
                if (err) reject(`${err}`)
                resolve(data);
            });
        });
    }

    static async GetUserRFG(req) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM UserRfg where ID=(?)";
            db.query(query, [req.id], (err, data) => {
                if (err) reject(`${err}`)
                resolve(data);
            });
        });
    }

    static async UpdateRFG(user) {
        return new Promise(async (resolve, reject) => {
            const delete_query = "DELETE FROM UserRfg WHERE ID=(?)";
            const insert_query = "INSERT INTO UserRfg(ID, Igdname, Eprdate) VALUES(?, ?, ?);";
            db.query(delete_query, [user.id], (err) => {
                if (err) reject(`${err}`);
                else {
                    db.query(insert_query, [user.id, user.igdname, user.eprdate], (err) => {
                        if (err) reject(`${err}`);
                        else resolve({ success: true });
                    });
                }
            });
        });
    }


}

module.exports = RfgSql;