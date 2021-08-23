"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Register = void 0;
const connection_1 = __importDefault(require("../db/connection"));
async function Register(req, res) {
    try {
        const { cpf, nome, email, password, cargo } = req.body;
        const query = {
            name: 'register',
            text: 'INSERT INTO usuarios VALUES($1, $2, $3, $4, $5)',
            values: [cpf, nome, email, password, cargo]
        };
        const result = await connection_1.default.query(query);
        if (result.error)
            res.status(500).send('Bad Request');
        res.status(200).send({ "success": 'Usuário Cadastrado' });
    }
    catch (error) {
        console.log(error.message);
        res.status(409).send({ "error": "Conflict" });
    }
}
exports.Register = Register;
