"use strict";

const db = require("../../config/db"),
    bcrypt = require("bcrypt");
// saltRounds는 env파일에 저장한 값. 비밀번호 해쉬에 사용
const saltRounds = parseInt(process.env.Salt);

class BoardSql {
    static async GetFree() {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM freeboard;"
            db.query(query, (err, data) => {
                if (err) reject(`${err}`);
                resolve(data);
            });
        });
    }

    static async GetNotice() {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM noticeboard;"
            db.query(query, (err, data) => {
                if (err) reject(`${err}`);
                resolve(data);
            });
        });
    }

    static async GetNoticeId(number) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM noticeboard WHERE number=(?)"
            db.query(query, [number], (err, data) => {
                if (err) reject(`${err}`);
                resolve(data);
            });
        });
    }

    static async GetFreeId(number) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM freeboard WHERE number=(?)"
            db.query(query, [number], (err, data) => {
                if (err) reject(`${err}`);
                resolve(data);
            });
        });
    }

    static async AddFree(req) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO freeboard(id, nickname, title, description, created, count) VALUES(?, ?, ?, ?, NOW(), 0);"
            db.query(query, [req.id, req.nickname, req.title, req.description], (err, data) => {
                if (err) reject(`${err}`);
                resolve(data);
            });
        });
    }

    static async AddNotice(req) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO noticeboard(id, title, description, createdate) VALUES(?, ?, ?, NOW());"
            db.query(query, [req.id, req.title, req.description], (err, data) => {
                if (err) reject(`${err}`);
                resolve(data);
            });
        });
    }

    static async DeleteFree(req) {
        return new Promise((resolve, reject) => {
            const dfree = "DELETE FROM freeboard WHERE number=(?);"
            const dreply = "DELETE FROM Reply WHERE number=(?);"
            const dlikeit = "DELETE FROM freelikeit WHERE number=(?);"

            db.query(dfree, [req], (err, data) => {
                if (err) reject(`${err}`);
                else {
                    db.query(dreply, [req], (err, data) => {
                        if (err) reject(`${err}`);
                        else {
                            db.query(dlikeit, [req], (err, data) => {
                                if (err) reject(`${err}`);
                                resolve(data);
                            });
                        }
                    });
                }
            });
        });
    }

    ////////Reply////////
    static async AddReply(req) {
        console.log(req);
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO Reply(number, userid, nickname, description, created) VALUES(?, ?, ?, ?, ?);"
            const ucount = "UPDATE freeboard SET count = count + 1 WHERE number =(?);"
            db.query(query, [req.number, req.userid, req.nickname, req.description, req.created], (err, data) => {
                console.log(req.created)
                if (err) reject(`${err}`);
                db.query(ucount, [req.number], (err) => {
                    if (err) reject(`${err}`);
                    resolve(data);
                });

            });
        });
    }

    static async GetReply(req) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM Reply WHERE number=(?);"
            db.query(query, [req], (err, data) => {
                if (err) reject(`${err}`);
                resolve(data);
            });
        });
    }

    static async Updatelikeit(req) {
        return new Promise((resolve, reject) => {
            const check_likeit = "SELECT * FROM freelikeit WHERE number=(?) and userid=(?)"
            const ucount = "UPDATE freeboard SET likeit = likeit + 1 WHERE number =(?);"
            const insert_likeit = "INSERT INTO freelikeit(number , title , userid) VALUES(?, ?, ?);"

            db.query(check_likeit, [req.number, req.userid], (err, length) => {
                if (err) reject(`${err}`);
                else if (length.length < 1) {
                    db.query(ucount, [req.number], (err, data) => {
                        if (err) reject(`${err}`);
                        else {
                            db.query(insert_likeit, [req.number, req.title, req.userid], (err) => {
                                if (err) reject(`${err}`);
                                else {
                                    resolve({ success: true });
                                }
                            });
                        }
                    });
                }
                else {
                    resolve({ success: false })
                }
            })

        });

    }

    static async Deletelikeit(req) {
        return new Promise((resolve, reject) => {
            const delete_likeit = "DELETE FROM likeit WHERE foodid=(?) and userid=(?);"
            db.query(delete_likeit, [req.number, req.userid], (err, length) => {
                if (err) reject(`${err}`);
                else {
                    resolve({ success: true })
                }
            })

        });

    }
}

module.exports = BoardSql;