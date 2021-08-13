import { Response } from 'express'
import pool from '../db/connection'

export async function Alunos(req: any, res: Response) {

    try {
        if (req.cargo == 'Professor') {

            const query = {
                name: 'register',
                text: "SELECT N.cpf_aluno AS cpf, array_agg(N.meta || ' : ' || N.nota) FROM notas N GROUP BY N.cpf_aluno"
            }

            const alunos = await pool.query(query)

            res.send(alunos.rows)
        } else {
            res.status(403).send("Unauthorized")
        }
    } catch (err) {
        console.log(err.message)
        req.status(500).send("Bad Request")
    }


}