"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alunos = void 0;
const connection_1 = __importDefault(require("../db/connection"));
async function Alunos(req, res) {
    try {
        if (req.cargo == 'Professor') {
            const query = {
                name: 'register',
                text: "SELECT N.cpf_aluno AS cpf, array_agg(N.meta || ' : ' || N.nota) FROM notas N GROUP BY N.cpf_aluno"
            };
            const alunos = await connection_1.default.query(query);
            res.send(alunos.rows);
        }
        else {
            res.status(403).send("Unauthorized");
        }
    }
    catch (err) {
        console.log(err.message);
        req.status(500).send("Bad Request");
    }
}
exports.Alunos = Alunos;
