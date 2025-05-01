document.addEventListener('DOMContentLoaded', function () {
    const elSettings = document.getElementById('settings')
    const url = 'http://localhost:3000/utilizadores';

    function carregarDados() {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                preencherTabela(data);
            })
            .catch(error => console.error('Erro ao carregar os dados:', error));
    }

    function preencherTabela(utilizadores) {
        const tabela = document.getElementById('dadosTabela');
        tabela.innerHTML = '';

        utilizadores.forEach(user => {
            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td>${user.id}</td>
                <td>${user.nome}</td>
                <td>${user.email}</td>
                <td>${user.morada}</td>
                <td>${user.codigo_postal}</td>
                <td>${user.localidade}</td>
                <td>${user.pais}</td>
                <td>
                    <select id="funcao-${user.id}">
                        <option value="utilizador" ${user.funcao === 'utilizador' ? 'selected' : ''}>Utilizador</option>
                        <option value="admin" ${user.funcao === 'admin' ? 'selected' : ''}>Administrador</option>
                    </select>
                </td>
                <td>
                    <select id="status-${user.id}">
                        <option value="ativo" ${user.status === 'ativo' ? 'selected' : ''}>Ativo</option>
                        <option value="inativo" ${user.status === 'inativo' ? 'selected' : ''}>Inativo</option>
                    </select>
                </td>
                <td>
                    <button class="btn btn-warning" onclick="salvarAlteracoes(${user.id})">Save</button>
                </td>
            `;

            tabela.appendChild(tr);
        });
    }

    window.salvarAlteracoes = function (id) {
        const funcao = document.getElementById(`funcao-${id}`).value;
        const status = document.getElementById(`status-${id}`).value;

        fetch(`${url}/${id}`)
            .then(res => res.json())
            .then(utilizadorAtual => {
                const dadosAtualizados = {
                    ...utilizadorAtual,
                    funcao,
                    status
                };

                return fetch(`${url}/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dadosAtualizados)
                });
            })
            .then(response => {
                if (!response.ok) throw new Error('Erro ao atualizar utilizador.');
                alert('Função e estado atualizados com sucesso!');
                carregarDados();
            })
            .catch(error => {
                console.error('Erro ao guardar alterações:', error);
                alert('Erro ao guardar as alterações.');
            });
    };

    carregarDados();
});
