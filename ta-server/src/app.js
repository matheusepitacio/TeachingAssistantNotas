"use strict";
const express = require('express'), app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { verifyJWT } = require('./middleware/authentication');
const LoginController = require('./controllers/LoginController');
const RegisterController = require('./controllers/RegisterController');
const AlunosController = require('./controllers/AlunosController');
const NotasController = require('./controllers/NotasController');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());
app.use(express.json());
app.post('/register', RegisterController.Register);
app.post('/login', LoginController.Login);
app.get('/notas', verifyJWT, AlunosController.Alunos);
app.get('/notas/:cpf', verifyJWT, NotasController.GetAlunoNotas);
app.post('/notas/:cpf', verifyJWT, NotasController.editarAlunoNota);
app.post('/meta', verifyJWT, NotasController.DeleteMeta);
app.post('/aluno', verifyJWT, NotasController.DeleteAluno);
const port = 3000;
app.listen(port, () => {
    console.log("App is listen on port " + port);
});
