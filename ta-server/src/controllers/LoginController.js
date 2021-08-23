"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const connection_1 = __importDefault(require("../db/connection"));
const jwtSecretKey = require('../../secrets.json').jwtSecretKey;
async function Login(req, res) {
    try {
        const cpf = req.body.cpf;
        const password = req.body.password;
        const query = {
            name: 'login',
            text: 'SELECT * FROM usuarios WHERE cpf = $1 AND password = $2',
            values: [cpf, password]
        };
        const resultado = await connection_1.default.query(query);
        if (resultado.rows.length == 0)
            return res.status(401).send({ message: "Login Inválido" });
        const token = jsonwebtoken_1.default.sign({ cpf, cargo: resultado.rows[0].cargo }, jwtSecretKey);
        res.status(200).send({ auth: true, token, cargo: resultado.rows[0].cargo, cpf });
    }
    catch (error) {
        console.log(error.message);
        res.status(401).send({ "error": "Login Inválido" });
    }
}
exports.Login = Login;
