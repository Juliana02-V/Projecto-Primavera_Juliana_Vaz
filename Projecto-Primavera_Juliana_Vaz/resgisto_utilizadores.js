const elFormulario = document.getElementById("formularioRegisto");
let url = 'http://localhost:3000/utilizadores';


function validarCamposObrigatorios(campos) {
    for (const campo of campos) {
        if (!campo.value.trim()) {
            alert(`${campo.name} é obrigatório.`);
            return false;
        }
    }
    return true;
}


function validarSenhas(senha, confirmarSenha) {
    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem.");
        return false;
    }
    return true;
}


function validarSenhaForte(senha) {
    const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!regexSenha.test(senha)) {
        alert("A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um símbolo.");
        return false;
    }
    return true;
}

function validarEmail(email) {
    const regexEmail = /@example\.com$/;
    if (!regexEmail.test(email)) {
        alert("O e-mail deve conter o domínio '@example.com'.");
        return false;
    }
    return true;
}

function verificarEmailExistente(email) {
    return fetch(url)
        .then(res => res.json())
        .then(utilizadores => {
            const emailExistente = utilizadores.some(u => u.email.toLowerCase() === email.toLowerCase());
            if (emailExistente) {
                alert("Este e-mail já está registado.");
                return true;
            }
            return false;
        })
        .catch(error => {
            console.error("Erro ao verificar e-mail existente:", error);
            alert("Erro ao verificar o e-mail. Tente novamente.");
            return true;
        });
}


function registarUtilizador(utilizador) {
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(utilizador)
    })
        .then(response => {
            if (!response.ok) throw new Error("Erro ao criar o utilizador.");
            return response.json();
        });
}

elFormulario.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.querySelector("#nome").value.trim();
    const email = document.querySelector("#emailRegisto").value.trim();
    const morada = document.querySelector("#morada").value.trim();
    const cp4 = document.querySelector("#cp4").value.trim();
    const cp3 = document.querySelector("#cp3").value.trim();
    const localidade = document.querySelector("#cpLocalidade").value.trim();
    const pais = document.querySelector("select").value;
    const senha = document.querySelector("#senha").value;
    const confirmarSenha = document.querySelector("#confirmarSenha").value;
    const aceiteTermos = document.querySelector("#confirmo").checked;


    const campos = [
        { name: "Nome", value: nome },
        { name: "Email", value: email },
        { name: "Morada", value: morada },
        { name: "Código Postal (parte 4)", value: cp4 },
        { name: "Código Postal (parte 3)", value: cp3 },
        { name: "Localidade", value: localidade },
        { name: "País", value: pais },
        { name: "Senha", value: senha },
        { name: "Confirmar Senha", value: confirmarSenha }
    ];

    if (!validarCamposObrigatorios(campos)) return;
    if (!validarSenhas(senha, confirmarSenha)) return;
    if (!aceiteTermos) {
        alert("Tem de aceitar os termos e condições.");
        return;
    }
    if (!validarSenhaForte(senha)) return;
    if (!validarEmail(email)) return;


    verificarEmailExistente(email)
        .then(emailExistente => {
            if (emailExistente) return;


            const novoUtilizador = {
                nome,
                email,
                morada,
                codigo_postal: `${cp4}-${cp3}`,
                localidade,
                pais,
                senha,
                funcao: "utilizador",
                status: "inativo",
            };


            registarUtilizador(novoUtilizador)
                .then(() => {
                    alert("Utilizador criado com sucesso!");
                    window.location.href = "primavera.html";
                })
                .catch(error => {
                    console.error("Erro:", error);
                    alert("Erro ao criar o utilizador. Tente novamente.");
                });
        });
});
