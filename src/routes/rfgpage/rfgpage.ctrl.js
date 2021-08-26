"use strict";

const RfgClass = require("./rfgpage.class"),
    url = require('url'),
    bodyParser = require("body-parser");

const rfgpage_request = {

    GetIgdrc: async (req, res) => {
        const req_get_igdrc = new RfgClass(req.body);
        const res_get_igdrc = await req_get_igdrc.GetIgdrc();
        return res.json(res_get_igdrc);
    },

    GetIgd : async (req,res)=>{
        const req_get_igd = new RfgClass(req.body);
        const res_get_igd = await req_get_igd.GetIgd();
        return res.json(res_get_igd);
    },

    GetUserRFG : async (req, res) => {
        const req_get_RFG = new RfgClass(req.body);
        const res_get_RFG = await req_get_RFG.GetUserRFG();
        return res.json(res_get_RFG);
    },

    UpdateRFG : async (req, res) => {
        const req_update_rfg = new RfgClass(req.body);
        const res_update_rfg = await req_update_rfg.UpdateRFG();
        return res.json(res_update_rfg);
    },

}

module.exports = {
    rfgpage_request
};