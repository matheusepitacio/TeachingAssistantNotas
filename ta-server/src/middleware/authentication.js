"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecretKey = require('../../secrets.json').jwtSecretKey;
async function verifyJWT(req, res, next) {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token)
        return res.status(403).send({ auth: false, message: 'Sem Autorização' });
    jsonwebtoken_1.default.verify(token, jwtSecretKey, function (err, usuario) {
        if (err)
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        req.cargo = usuario === null || usuario === void 0 ? void 0 : usuario.cargo;
        req.cpf = usuario === null || usuario === void 0 ? void 0 : usuario.cpf;
        next();
    });
}
exports.verifyJWT = verifyJWT;
