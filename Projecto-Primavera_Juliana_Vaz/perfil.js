document.addEventListener('DOMContentLoaded', function () {
    const utilizador = JSON.parse(localStorage.getItem('utilizador'));
    const elSettings = document.getElementById('settings')



    if (utilizador && utilizador.id) {
        const url = 'http://localhost:3000/utilizadores/' + utilizador.id;

        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error("Erro ao obter os dados do utilizador.");
                return response.json();
            })
            .then(user => {
                document.getElementById('nome').value = user.nome || '';
                document.getElementById('email').value = user.email || '';
                document.getElementById('morada').value = user.morada || '';
                const [cp4, cp3] = (user.codigo_postal || '').split('-');
                document.getElementById('cp4').value = cp4 || '';
                document.getElementById('cp3').value = cp3 || '';
                document.getElementById('cpLocalidade').value = user.localidade || '';


                let pais = user.pais || '';

                if (pais === "pt") {
                    pais = "Portugal";
                }


                const paisSelect = document.getElementById('pais');
                const options = paisSelect.querySelectorAll('option');

                let paisFound = false;
                options.forEach(option => {
                    if (option.value === pais) {
                        option.selected = true;
                        paisFound = true;
                    }
                });


                if (!paisFound) {
                    paisSelect.value = "";
                }
            })
            .catch(error => console.error("Erro:", error));
    } else {
        console.warn("Utilizador não encontrado no localStorage.");
    };

    const elForm = document.getElementById('formularioPerfil');
    elForm.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!utilizador || !utilizador.id) {
            console.error("Utilizador não encontrado no localStorage.");
            return;
        }
        const dadosAStualiados = {
            id: utilizador.id,
            nome: document.getElementById('nome').value,
            email: utilizador.email,
            morada: document.getElementById('morada').value,
            codigo_postal: document.getElementById('cp4').value + '-' + document.getElementById('cp3').value,
            localidade: document.getElementById('cpLocalidade').value,
            pais: document.getElementById('pais').value,
            senha: utilizador.senha,
            funcao: utilizador.funcao,
            status: utilizador.status,
        };
        fetch('http://localhost:3000/utilizadores/' + utilizador.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosAStualiados)
        })
            .then(response => {
                if (!response.ok) throw new Error("Erro ao atualizar os dados do utilizador.");
                return response.json();
            })
            .then(data => {
                console.log("Dados atualizados com sucesso:", data);
                alert("Dados atualizados com sucesso!");
            })
            .catch(error => console.error("Erro:", error));

    })

    const elFormSenha = document.getElementById('formularioAlterarSenha');
    elFormSenha.addEventListener('submit', function (e) {
        e.preventDefault();

        const senhaAntiga = document.getElementById('senhaAntiga').value;
        const novaSenha = document.getElementById('novaSenha').value;
        const confirmarNovaSenha = document.getElementById('confirmarNovaSenha').value;



        if (senhaAntiga !== utilizador.senha) {
            alert("A senha antiga está incorreta.");
            return;
        }


        if (novaSenha !== confirmarNovaSenha) {
            alert("As novas senhas não coincidem.");
            return;
        }


        const dadosSenhaAtualizados = {
            id: utilizador.id,
            nome: utilizador.nome,
            email: utilizador.email,
            morada: utilizador.morada,
            codigo_postal: utilizador.codigo_postal,
            localidade: utilizador.localidade,
            pais: utilizador.pais,
            senha: novaSenha,
            funcao: utilizador.funcao,
            status: utilizador.status
        };

        fetch('http://localhost:3000/utilizadores/' + utilizador.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosSenhaAtualizados)
        })
            .then(response => {
                if (!response.ok) throw new Error("Erro ao atualizar a senha do utilizador.");
                return response.json();
            })
            .then(data => {
                console.log("Senha atualizada com sucesso:", data);
                alert("Senha alterada com sucesso!");
                document.getElementById('senhaAntiga').value = '';
                document.getElementById('novaSenha').value = '';
                document.getElementById('confirmarNovaSenha').value = '';
            })
            .catch(error => console.error("Erro:", error));
    })
});
