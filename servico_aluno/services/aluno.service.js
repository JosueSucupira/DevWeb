const alunos = require('../data/alunos');
let proximoId = alunos.length > 0 ? Math.max(...alunos.map(a => a.id)) + 1 : 1;

class AlunoService {
    listar() {
        return alunos;
    }

    buscarPorId(id) {
        const idNum = parseInt(id, 10);
        return alunos.find(a => a.id === idNum);
    }

    criar(novoAluno) {
        novoAluno.id = proximoId++;
        alunos.push(novoAluno);
        return novoAluno;
    }

    editar(id, alunoAtualizado) {
        const idNum = parseInt(id, 10);
        const index = alunos.findIndex(a => a.id === idNum);
        if (index === -1) { return null; }
        alunos[index] = { ...alunos[index], ...alunoAtualizado };
        return alunos[index];
    }

    apagar(id) {
        const idNum = parseInt(id, 10);
        const index = alunos.findIndex(a => a.id === idNum);
        if (index === -1) { return false; }
        alunos.splice(index, 1);
        return true;
    }
}

module.exports = new AlunoService();