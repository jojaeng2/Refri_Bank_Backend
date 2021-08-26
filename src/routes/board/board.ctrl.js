"use strict";

const BoardClass = require("./board.class"),
    url = require('url'),
    bodyParser = require("body-parser");

const board_request = {

    ///////////GET////////////
    GetFree: async (req, res) => {
        const req_get_free = new BoardClass(req.body);
        const res_get_free = await req_get_free.GetFree();
        return res.json(res_get_free);
    },

    GetNotice: async (req, res) => {
        const req_get_notice = new BoardClass(req.body);
        const res_get_notice = await req_get_notice.GetNotice();
        return res.json(res_get_notice);
    },

    GetNoticeId: async (req, res) => {
        const req_notice_id = new BoardClass(req.params.id);
        const res_notice_id = await req_notice_id.GetNoticeId();
        return res.json(res_notice_id);
    },

    GetFreeId: async (req, res) => {
        const req_free_id = new BoardClass(req.params.id);
        const res_free_id = await req_free_id.GetFreeId();
        return res.json(res_free_id);
    },

    ///////ADD/////////
    AddFree: async (req, res) => {
        const req_free_board = new BoardClass(req.body);
        const res_free_board = await req_free_board.AddFree();
        return res.json(res_free_board);
    },

    AddNotice: async (req, res) => {
        const req_free_board = new BoardClass(req.body);
        const res_free_board = await req_free_board.AddNotice();
        return res.json(res_free_board);
    },
    //////DELETE////////
    DeleteFree: async (req, res) => {
        const req_delete_free = new BoardClass(req.params.id);
        const res_response_free = await req_delete_free.DeleteFree();
        return res.json(res_response_free);
    },

    //////Reply/////////
    AddReply: async (req, res) => {
        const req_add_reply = new BoardClass(req.body);
        const res_add_reply = await req_add_reply.AddReply();
        return res.json(res_add_reply);
    },

    GetReply: async (req, res) => {
        const req_get_reply = new BoardClass(req.params.id);
        const res_get_reply = await req_get_reply.GetReply();
        return res.json(res_get_reply);
    },

    Updatelikeit: async (req, res) => {
        const req_update_likeit = new BoardClass(req.body);
        const res_update_likeit = await req_update_likeit.Updatelikeit();
        return res.json(res_update_likeit);
    },

    Deletelikeit: async (req, res) => {
        const req_delete_likeit = new BoardClass(req.body);
        const res_delete_likeit = await req_delete_likeit.Deletelikeit();
        return res.json(res_delete_likeit);
    }

}


module.exports = {
    board_request
};