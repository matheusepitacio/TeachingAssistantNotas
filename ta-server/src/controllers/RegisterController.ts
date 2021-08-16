import { Request, Response } from 'express'
import pool from '../db/connection'

export async function Register(req: Request, res: Response) {
    try {
        
        const { cpf, nome, email, password, cargo } = req.body

        const query = {
            name: 'register',
            text: 'INSERT INTO usuarios VALUES($1, $2, $3, $4, $5)',
            values: [cpf, nome, email, password, cargo]
        }

        const result = await pool.query(query)

        if (result.error) res.status(500).send('Bad Request')

        res.status(200).send({"success": 'Usuário Cadastrado'})

    } catch (error) {
        console.log(error.message)
        res.status(409).send({"error": "Conflict"})
    }
}
