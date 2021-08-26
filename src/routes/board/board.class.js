"use strict";

const BoardSql = require("./boardSql");

class BoardClass {
    constructor(url) {
        this.body = url; // 프론트에서 받아온 req 값을 user.body에 저장함.
    }

    ///////////GET////////////
    async GetFree() {
        const client = this.body;
        try {
            const response = await BoardSql.GetFree(client);
            return response;
        } catch (err) {
            console.log(err);
        }
    }

    async GetNotice() {
        const client = this.body;
        try {
            const response = await BoardSql.GetNotice(client);
            return response;
        } catch (err) {
            console.log(err);
        }
    }

    async GetNoticeId() {
        const client = this.body;
        try {
            const response = await BoardSql.GetNoticeId(client);
            return response;
        } catch (err) {
            console.log(err);
        }
    }

    async GetFreeId() {
        const client = this.body;
        try {
            const response = await BoardSql.GetFreeId(client);
            return response;
        } catch (err) {
            console.log(err);
        }
    }

    ///////ADD/////////
    async AddFree() {
        const client = this.body;
        try {
            const response = await BoardSql.AddFree(client);
            return response;
        } catch (err) {
            console.log(err);
        }
    }

    async AddNotice() {
        const client = this.body;
        try {
            const response = await BoardSql.AddNotice(client);
            return response;
        } catch (err) {
            console.log(err);
        }
    }

    //////DELETE////////
    async DeleteFree() {
        const client = this.body;
        try {
            const response = await BoardSql.DeleteFree(client);
            return response;
        } catch (err) {
            console.log(err);
        }
    }

    //////Reply/////////
    async AddReply() {
        const client = this.body;
        try {
            const response = await BoardSql.AddReply(client);
            return response;
        } catch (err) {
            console.log(err);
        }
    }

    async GetReply() {
        const client = this.body;
        try {
            const response = await BoardSql.GetReply(client);
            return response;
        } catch (err) {
            console.log(err);
        }
    }

    async Updatelikeit() {
        const client = this.body;
        try {
            const response = await BoardSql.Updatelikeit(client);
            return response;
        } catch (err) {
            console.log(err);
        }
    }

    async Deletelikeit() {
        const client = this.body;
        try {
            const response = await BoardSql.Deletelikeit(client);
            return response;
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = BoardClass;
