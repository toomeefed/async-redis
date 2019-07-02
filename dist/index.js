"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const redis_commands_1 = require("redis-commands");
function asyncRedis(client) {
    redis_commands_1.list.forEach(function (name) {
        if (name !== 'multi') {
            client[name] = util_1.promisify(client[name]).bind(client);
        }
    });
    const multi = client.multi();
    const mlproto = multi.constructor.prototype;
    mlproto.exec_transaction = util_1.promisify(mlproto.exec_transaction);
    mlproto.exec = mlproto.exec_transaction;
    // mlproto.EXEC = mlproto.exec;
    return client;
}
exports.asyncRedis = asyncRedis;
exports.default = asyncRedis;
