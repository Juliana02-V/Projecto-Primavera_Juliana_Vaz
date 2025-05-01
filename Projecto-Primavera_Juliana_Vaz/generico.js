document.addEventListener('DOMContentLoaded', () => {
    const utilizador = JSON.parse(localStorage.getItem('utilizador'));
    const elSettings = document.getElementById('settings');


    const elIcon = document.querySelector('.fa-magnifying-glass');
    const elSearch = document.getElementById('textoPesquisa');
    const elOpenModal = document.getElementById('openModal');
    const elModal = document.getElementById('loginModal');
    const elCloseModal = document.querySelector('.btModalCase');
    const elEmail = document.getElementById('email');
    const elPassword = document.getElementById('password');
    const elForm = document.getElementById('loginForm');
    const elError = document.querySelector('#mensagemErro');
    const elSaudacao = document.querySelector('#saudacao');
    const elLogout = document.getElementById('logoutModal');
    const elPerfil = document.getElementById('perfilModal');
    const elRegisto = document.getElementById('registoModal');

    let url = 'http://localhost:3000/utilizadores';

    if (utilizador && utilizador.funcao === 'admin') {
        if (elSettings) elSettings.style.display = 'block';
    } else if (window.location.pathname.includes('primavera.html') && elSettings) {
        elSettings.style.display = 'none';
    }

    if (elIcon && elSearch) {
        elIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            elSearch.classList.add('active');
            elSearch.focus();
        });

        document.addEventListener('click', (e) => {
            if (!elSearch.contains(e.target) && !elIcon.contains(e.target)) {
                elSearch.classList.remove('active');
            }
        });
    }

    if (elOpenModal) {
        elOpenModal.addEventListener('click', function (e) {
            e.preventDefault();
            elModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            elEmail.focus();
            elError.style.display = 'none';
            elError.textContent = '';
        });
    }

    if (elCloseModal) {
        elCloseModal.addEventListener('click', function () {
            elModal.style.display = 'none';
            document.body.style.overflow = '';
        });
    }

    if (elForm) {
        elForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = elEmail.value.trim();
            const password = elPassword.value.trim();

            if (email === '' || password === '') {
                elError.textContent = 'Os dois campos são de preenchimento obrigatório.';
                elError.style.display = 'block';
                return;
            }

            fetch('http://localhost:3000/utilizadores')
                .then(res => res.json())
                .then(utilizadores => {
                    const user = utilizadores.find(u => u.email === email && u.senha === password);
                    if (!user) {
                        elError.textContent = 'Utilizador inexistente!';
                        elError.style.display = 'block';
                        return;
                    }
                    if (user.status !== 'ativo') {
                        alert('A sua conta está inativa. Aguarde aprovação por parte do administrador.');
                        window.location.href = 'primavera.html';
                        return;
                    }

                    if (user.funcao === 'admin') {

                        localStorage.setItem('utilizador', JSON.stringify(user));
                        localStorage.setItem('userName', user.nome);
                        saudacao(user.nome);
                        alternarIcon(true);
                        elSettings.style.display = 'block';
                        elModal.style.display = 'none';
                        document.body.style.overflow = '';
                    } else {
                        localStorage.setItem('utilizador', JSON.stringify(user));
                        saudacao(user.nome);
                        alternarIcon(true);
                        elModal.style.display = 'none';
                        document.body.style.overflow = '';
                    }
                })
                .catch(error => {
                    console.error('Erro ao aceder à base de dados:', error);
                    elError.textContent = 'Erro de ligação ao servidor.';
                    elError.style.display = 'block';
                });
        });
    }





    function alternarIcon(icon) {
        if (!elOpenModal || !elLogout || !elPerfil || !elRegisto) return;
        if (icon) {
            elOpenModal.style.display = 'none';
            elLogout.style.display = 'block';
            elPerfil.style.display = 'block';
            elRegisto.style.display = 'none';
        } else {
            elOpenModal.style.display = 'block';
            elLogout.style.display = 'none';
            elPerfil.style.display = 'none';
            elRegisto.style.display = 'block';
        }
    }

    if (elLogout) {
        elLogout.addEventListener('click', function () {
            localStorage.removeItem('utilizador');
            localStorage.removeItem('userName');
            sessionStorage.clear();
            if (elEmail) elEmail.value = '';
            if (elPassword) elPassword.value = '';
            if (elSaudacao) elSaudacao.textContent = '';
            alternarIcon(false);
            if (elSettings) elSettings.style.display = 'none';
            window.location.href = 'primavera.html';

        });
    }

    /*==================
     Saudação ao carregar a página
     ===================*/
    function saudacao(nome) {
        const saudacao = document.getElementById('saudacao');
        saudacao.textContent = `Bem-vindo, ${nome}`;
    }

    if (utilizador) {
        saudacao(utilizador.nome);
        alternarIcon(true);
    } else {
        alternarIcon(false);
    }

    /*======================
     Cookies
    ========================*/
    if (!localStorage.getItem("cookiesAceitos")) {
        document.getElementById("tela").style.display = "block";
    } else {
        document.getElementById("tela").style.display = "none";
    }

    document.getElementById("btLiAceito").addEventListener("click", function () {
        localStorage.setItem("cookiesAceitos", "true");
        document.getElementById("tela").style.display = "none";
    });
});
