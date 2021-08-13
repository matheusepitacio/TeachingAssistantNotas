import { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken';

const jwtSecretKey = require('../../secrets.json').jwtSecretKey

export async function verifyJWT(req: any, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) return res.status(403).send({ auth: false, message: 'Sem Autorização' });

  jwt.verify(token, jwtSecretKey, function (err: any, usuario: any) {

    if (err)
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    req.cargo = usuario?.cargo;
    req.cpf = usuario?.cpf;

    next();
  });

}