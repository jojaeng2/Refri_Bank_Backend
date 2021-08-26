"use strict";

const LoginClass = require("./login.class"),
    url = require('url'),
    bodyParser = require("body-parser");

// login, register 함수를 index_supervise_user에 넣음
// User class이용해서 return 값으로 {success : true} 를 받을경우 로그인 성공
const login_request = {
    GetLogin: async (req, res) => {
        const ctrl_request_user = new LoginClass(req.body);
        const ctrl_response_user = await ctrl_request_user.GetLogin();
        return res.send(ctrl_response_user);
    },
    GetTokenCheck: async (req, res) => {
        const ctrl_request_user = new LoginClass(req.body);
        const ctrl_response_user = await ctrl_request_user.GetTokenCheck();
        return res.send(ctrl_response_user);
    },
    GetRegister: async (req, res) => {
        const ctrl_request_user = new LoginClass(req.body);
        const ctrl_response_user = await ctrl_request_user.GetRegister();
        return res.json(ctrl_response_user);
    },

}

module.exports = {
    login_request,
};


