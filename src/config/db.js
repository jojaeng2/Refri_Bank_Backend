const mysql = require("mysql");

const db = mysql.createPool({ //수정예정
    host: "211.47.75.102", //db 주소
    port: "3306", //db 포트
    user: "qkrtmfqls", //db 유저이름
    password: "awdawd15963", //db 패스워드
    database: "dbqkrtmfqls", //db 스키마
});

module.exports = db;