"use strict";

const db = require("../../config/db"),
    bcrypt = require("bcrypt");
// saltRounds는 env파일에 저장한 값. 비밀번호 해쉬에 사용
const saltRounds = parseInt(process.env.Salt);

class Adminsql {
    static async getuser(user){
        return new Promise(async (resolve, reject) => {
            const query = "SELECT * FROM User ;";
            db.query(query, (err,data) => {
                if (err) reject(`${err}`);
                resolve(data);
            });
        });
    }
    
    static async changepswd(user){
        return new Promise(async (resolve, reject) => {
            const hashing = await bcrypt.hash(user.psword, saltRounds);
            const query = "UPDATE User SET psword = (?) WHERE id =(?)"
            db.query(query,[hashing,user.id], (err,data) => {
                if (err) reject(`${err}`);
                else resolve({success:true});
            });
        });
    }
}

module.exports = Adminsql;