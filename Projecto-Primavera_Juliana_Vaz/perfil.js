document.addEventListener('DOMContentLoaded', function () {
    const utilizador = JSON.parse(localStorage.getItem('utilizador'));

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
    }
});
