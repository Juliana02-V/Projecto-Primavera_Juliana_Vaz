let url = "http://localhost:3000/utilizadores";

const elLogin = document.querySelector("#login");
const elUserName = document.querySelector("#username");
const elPassword = document.querySelector("#password");

elLogin.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = elUserName.value.trim();
    const password = elPassword.value.trim();

    if (username === "" || password === "") {
        alert("Preencha todos os campos!");
        return;
    }
    try {
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                const user = data.find(
                    (user) => user.username === username && user.password === password
                );
                if (user) {
                    alert("Login bem-sucedido!");
                    window.location.href = "index.html"; // Redireciona para a página inicial
                } else {
                    alert("Nome de utilizador ou palavra-passe incorretos!");
                }
            })
            .catch((error) => {
                console.error("Erro ao fazer login:", error);
            });
    }
    catch (error) {
        console.error("Erro ao fazer login:", error);
    }
}
);

