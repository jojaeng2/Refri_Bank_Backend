"use strict";

const db = require("../../config/db")


class Mypagesql {
    static async likeitpage(user){
        return new Promise(async (resolve, reject) => {
            const query = "SELECT * FROM likeit WHERE userid = (?)"
            db.query(query,[user.id], (err,data) => {
                if (err) reject(`${err}`);
                else resolve({data});
            });
        });
    }

    static async GetMyBoard(req) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM freeboard WHERE id=(?)";
            db.query(query, [req.id], (err, data) => {
                if (err) reject(`${err}`)
                resolve(data);
            });
        });
    }
}

module.exports = Mypagesql;