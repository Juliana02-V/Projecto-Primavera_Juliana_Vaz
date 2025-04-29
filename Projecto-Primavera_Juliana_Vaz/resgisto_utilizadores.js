const elFormulario = document.getElementById("formularioRegisto");
let url = 'http://localhost:3000/utilizadores';
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

    // Verificação de campos obrigatórios
    if (!nome || !email || !morada || !cp4 || !cp3 || !localidade || !pais || !senha || !confirmarSenha) {
        alert("Todos os campos são obrigatórios.");
        return;
    }

    // Verificação de confirmação de senha
    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem.");
        return;
    }

    // Verificação de termos aceites
    if (!aceiteTermos) {
        alert("Tem de aceitar os termos e condições.");
        return;
    }

    // Verificação de força da senha
    if (senha.length < 4) {
        alert("A senha deve ter pelo menos 4 caracteres.");
        return;
    }


    // Verificar duplicação de e-mail antes de inserir
    fetch(url)
        .then(res => res.json())
        .then(utilizadores => {
            const emailExistente = utilizadores.some(u => u.email.toLowerCase() === email.toLowerCase());

            if (emailExistente) {
                alert("Este e-mail já está registado.");
                return;
            }

            // Registo válido, criar utilizador
            const novoUtilizador = {
                nome,
                email,
                morada,
                codigo_postal: `${cp4}-${cp3}`,
                localidade,
                pais,
                senha
            };

            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(novoUtilizador)
            })
                .then(response => {
                    if (!response.ok) throw new Error("Erro ao criar o utilizador.");
                    return response.json();
                })
                .then(data => {
                    alert("Utilizador criado com sucesso!");
                    window.location.href = "primavera.html"; // ou index.html
                })
                .catch(error => {
                    console.error("Erro:", error);
                    alert("Erro ao criar o utilizador. Tente novamente.");
                });
        });
});




