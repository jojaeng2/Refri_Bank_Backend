"use strict";

const AdminClass = require("./admin.class"),
    url = require('url'),
    bodyParser = require("body-parser");

const admin_request = {
    getuser : async (req,res)=>{
        const req_get_user = new AdminClass(req.body);
        const res_get_user = await req_get_user.getuser();
        return res.json(res_get_user);
    },
    changepswd : async (req,res)=>{
        const req_chg_psd = new AdminClass(req.body);
        const res_chg_psd = await req_chg_psd.changepswd();
        return res.json(res_chg_psd);
    }

}


module.exports = {
    admin_request
};