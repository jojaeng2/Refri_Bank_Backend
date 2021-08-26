"use strict";

const db = require("../../config/db"),
    bcrypt = require("bcrypt");
// saltRounds는 env파일에 저장한 값. 비밀번호 해쉬에 사용
const saltRounds = parseInt(process.env.Salt);

class LoginSql {
    static GetLogin(id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM User WHERE id = ?";
            const query2 = "UPDATE User SET visit = visit + 1 WHERE id =(?)"
            db.query(query, [id], (err, data) => {
                if (err) reject(`${err}`)
                else{
                    resolve(data[0]);
                    db.query(query2, [id], (err, datas) => {
                        if (err) reject(`${err}`)
                    });
                }
            });
        });
    }

    static async GetRegister(userInfo) { //req = userinfo req.body.id = asd
        return new Promise(async (resolve, reject) => {
            const hashing = await bcrypt.hash(userInfo.psword, saltRounds);
            const query = "INSERT INTO User(ID, Name, Psword) VALUES(?, ?, ?);";
            db.query(query, [userInfo.id, userInfo.name, hashing], (err) => {
                if (err) reject(`${err}`);
                resolve({ success: true });
            });
        });
    }
    
}

module.exports = LoginSql;