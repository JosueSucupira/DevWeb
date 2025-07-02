const apiURL = 'https://covid19-brazil-api.vercel.app/api/report/v1';
const corpoTabela = document.getElementById('corpo-tabela');

const mediaCasosEl = document.getElementById('media-casos');
const mediaSuspeitosEl = document.getElementById('media-suspeitos');
const mediaFalecimentosEl = document.getElementById('media-falecimentos');
const maiorRelacaoEl = document.getElementById('maior-relacao');
const menorRelacaoEl = document.getElementById('menor-relacao');

async function listarEstados() {
    try {
        const response = await fetch(apiURL);
        const json = await response.json();

        let totalCasos = 0;
        let totalSuspeitos = 0;
        let totalFalecimentos = 0;

        let maiorRelacao = -1;
        let estadoMaiorRelacao = '';
        let menorRelacao = Infinity;
        let estadoMenorRelacao = '';

        json.data.forEach(estado => {
            totalCasos += estado.cases;
            totalSuspeitos += estado.suspects;
            totalFalecimentos += estado.deaths;

            if (estado.deaths > 0) {
                const relacaoAtual = estado.cases / estado.deaths;

               
                if (relacaoAtual > maiorRelacao) {
                    maiorRelacao = relacaoAtual;
                    estadoMaiorRelacao = estado.state;
                }

                if (relacaoAtual < menorRelacao) {
                    menorRelacao = relacaoAtual;
                    estadoMenorRelacao = estado.state;
                }
            }
        });

        const numeroDeEstados = json.data.length;
        const mediaFalecimentos = totalFalecimentos / numeroDeEstados;


        corpoTabela.innerHTML = '';
        json.data.forEach(estado => {
            
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${estado.state}</td>
                <td>${estado.uf}</td>
                <td>${estado.cases}</td>
                <td>${estado.suspects}</td>
                <td>${estado.deaths}</td>
            `;

            if (estado.deaths > mediaFalecimentos) {
                tr.classList.add('destaque');
            }
            corpoTabela.appendChild(tr);
            
        });


        const mediaCasos = totalCasos / numeroDeEstados;
        const mediaSuspeitos = totalSuspeitos / numeroDeEstados;
        
        mediaCasosEl.textContent = `Média do Número de Casos: ${mediaCasos.toFixed(0)}`;
        mediaSuspeitosEl.textContent = `Média do Número de Suspeitos: ${mediaSuspeitos.toFixed(0)}`;
        mediaFalecimentosEl.textContent = `Média do Número de Falecimentos: ${mediaFalecimentos.toFixed(0)}`;

        maiorRelacaoEl.textContent = `Estado com Maior Relação Casos/Falecimentos: ${estadoMaiorRelacao} (${maiorRelacao.toFixed(2)} casos por falecimento)`;
        menorRelacaoEl.textContent = `Estado com Menor Relação Casos/Falecimentos: ${estadoMenorRelacao} (${menorRelacao.toFixed(2)} casos por falecimento)`;

    } catch (error) {
        console.error('Erro ao listar estados:', error);
        corpoTabela.innerHTML = '<tr><td colspan="5">Erro ao carregar dados</td></tr>';
    }
}



listarEstados();