const express = require('express');
const router = express.Router();
const AlunoService = require('../services/aluno.service');

// LISTAR TODOS (GET /)
router.get('/', (req, res) => {
    const listaDeAlunos = AlunoService.listar();
    res.json(listaDeAlunos);
});

// --- NOVA ROTA ---
// BUSCAR POR ID (GET /:id)
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const aluno = AlunoService.buscarPorId(id);
    if (!aluno) {
        return res.status(404).json({ mensagem: "Aluno não encontrado" });
    }
    res.json(aluno);
});

// CRIAR (POST /)
router.post('/', (req, res) => {
    const novoAluno = req.body;
    const alunoCriado = AlunoService.criar(novoAluno);
    res.status(201).json(alunoCriado);
});

// EDITAR (PUT /:id)
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const alunoAtualizado = req.body;
    const alunoEditado = AlunoService.editar(id, alunoAtualizado);
    if (!alunoEditado) {
        return res.status(404).json({ mensagem: "Aluno não encontrado" });
    }
    res.json(alunoEditado);
});

// APAGAR (DELETE /:id)
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sucesso = AlunoService.apagar(id);
    if (!sucesso) {
        return res.status(404).json({ mensagem: "Aluno não encontrado" });
    }
    res.status(204).send();
});

module.exports = router;