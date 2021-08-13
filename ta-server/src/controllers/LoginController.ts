import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import pool from '../db/connection'

const jwtSecretKey = require('../../secrets.json').jwtSecretKey

export async function Login(req: Request, res: Response) {
    try {

        const cpf = req.body.cpf
        const password = req.body.password

        const query = {
            name: 'login',
            text: 'SELECT * FROM usuarios WHERE cpf = $1 AND password = $2',
            values: [cpf, password]
        }

        const resultado = await pool.query(query)

        if (resultado.rows.length == 0) return res.status(401).send({ message: "Login Inválido"})

        const token = jwt.sign({ cpf, cargo: resultado.rows[0].cargo}, jwtSecretKey);

        res.status(200).send({ auth: true, token, cargo: resultado.rows[0].cargo, cpf })


    } catch (error) {
        console.log(error.message)
        res.status(401).send({"error":"Login Inválido"})
    }
}
