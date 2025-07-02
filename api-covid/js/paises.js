const apiURL = 'https://covid19-brazil-api.vercel.app/api/report/v1/countries';
const corpoTabela = document.getElementById('corpo-tabela');

async function listarPaises() {
    try {
        const response = await fetch(apiURL);
        const json = await response.json();

        corpoTabela.innerHTML = '';
        json.data.forEach(pais => {
            
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${pais.country}</td>
                <td>${pais.confirmed}</td>
                <td>${pais.deaths}</td>
            `;

            if (pais.country === 'Brazil') {
                tr.classList.add('destaque');
            }
            corpoTabela.appendChild(tr);
        
        });

    } catch (error) {
        console.error('Erro ao listar estados:', error);
        corpoTabela.innerHTML = '<tr><td colspan="5">Erro ao carregar dados</td></tr>';
    }
}

listarPaises();