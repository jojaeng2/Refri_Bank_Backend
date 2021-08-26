"use strict";

const MainClass = require("./mainpage.class"),
    url = require('url'),
    bodyParser = require("body-parser");

const mainpage_request = {

    GetFoodMain : async (req,res)=>{
        const req_get_foodmain = new MainClass(req.body);
        const res_get_foodmain = await req_get_foodmain.GetFoodMain();
        return res.json(res_get_foodmain);
    },

    GetRank : async (req,res)=>{
        const req_get_rank = new MainClass(req.body);
        const res_get_rank = await req_get_rank.GetRank();
        return res.json(res_get_rank);
    },

}

module.exports = {
    mainpage_request
};