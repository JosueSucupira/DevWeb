const express = require('express');
const cors = require('cors');
const path = require('path'); 

const alunoRoutes = require('./routes/aluno.route');

const app = express();


app.use(cors()); 
app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client')));


app.use('/api/alunos', alunoRoutes);

module.exports = app;