import { Response } from 'express'
import pool from '../db/connection'

module.exports = {

    //utilizei o req como tipo any pois estava alterando ele
    //e dava erro se colocasse como tipo Request

    async GetAlunoNotas(req: any, res: Response) {
        
        try {
            const cpf = req.params.cpf;

            if (req.cargo === 'Aluno' && cpf !== req.cpf) return res.status(403).send("Não tente olhar as notas dos outros alunos")

            const query = {
                name: "get-grades",
                text: "SELECT meta, nota FROM notas WHERE cpf_aluno = $1",
                values: [cpf]
            }

            const result = await pool.query(query)

            if (result.error) return res.status(500).send("Bad Request")

            console.log(result.rows)

            res.send(result.rows)

        } catch (err) {
            console.log(err)
            res.status(500).send("Bad Request")
        }


    },

    async editarAlunoNota(req: any, res: Response) {

        try {
            if (req.cargo === "Professor") {
                const { meta, nota } = req.body;


                const query = {
                    name: "post-grades",
                    text: "INSERT INTO notas VALUES ($1,$2,$3,$4) ON CONFLICT(cpf_aluno,meta) DO UPDATE SET nota = $4, cpf_professor = $2",
                    values: [req.params.cpf, req.cpf, meta, nota]
                }

                const result = await pool.query(query)

                if (result.error) return res.status(500).send("Bad Request")

                return res.send();

            } else {
                return res.status(403).send("Unathorized")
            }
        } catch (err) {
            console.log(err)
            res.status(500).send("Bad Request")
        }

    },


    async DeleteMeta(req: any, res: Response) {
        try {
            if (req.cargo === "Professor") {
                const { meta } = req.body;

                const query = {
                    name: "delete-mark",
                    text: "DELETE FROM notas WHERE meta = $1",
                    values: [meta]
                }

                const result = await pool.query(query)

                if (result.error) return res.status(500).send("Bad Request")

                return res.send();

            } else {
                return res.status(403).send("Unathorized")
            }
        } catch (err) {
            console.log(err)
            res.status(500).send("Bad Request")
        }
    },

    async DeleteAluno(req: any, res: Response) {
        try {
            if (req.cargo === "Professor") {
                const { cpf } = req.body;

                const query = {
                    name: "delete-student",
                    text: "DELETE FROM notas WHERE cpf_aluno = $1",
                    values: [cpf]
                }

                const result = await pool.query(query)

                if (result.error) return res.status(500).send("Bad Request")

                return res.send();

            } else {
                return res.status(403).send("Unathorized")
            }
        } catch (err) {
            console.log(err)
            res.status(500).send("Bad Request")
        }
    }
}