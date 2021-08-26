"use strict";

const MypageClass = require("./mypage.class"),
    url = require('url'),
    bodyParser = require("body-parser");

const mypage_request = {
    likeitpage: async (req, res) => {
        const req_mypage_likeit = new MypageClass(req.body);
        const res_mypage_likeit = await req_mypage_likeit.likeitpage();
        return res.json(res_mypage_likeit);
    },
    GetMyBoard : async (req,res)=>{
        const req_get_myboard = new MypageClass(req.body);
        const res_get_myboard = await req_get_myboard.GetMyBoard();
        return res.json(res_get_myboard);
    }

}



module.exports = {
    mypage_request
};