let url = 'http://localhost:3000/utilizadores';

const elIcon = document.querySelector('.fa-magnifying-glass');
const elSearch = document.getElementById('textoPesquisa');
const elOpenModal = document.getElementById('openModal');
const elModal = document.getElementById('loginModal');
const elCloseModal = document.querySelector('.btModalCase');
const elEmail = document.getElementById('email');
const elPassword = document.getElementById('password');
const elForm = document.getElementById('loginForm');
const elError = document.querySelector('#mensagemErro');
const elSaudacao = document.querySelector('#saudacao')
const elLogout = document.getElementById('logoutModal');



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


elOpenModal.addEventListener('click', function (e) {
    e.preventDefault();
    elModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    elEmail.focus();
    elError.style.display = 'none';
    elError.textContent = '';

});

elCloseModal.addEventListener('click', function () {
    elModal.style.display = 'none';
    document.body.style.overflow = '';
});

elForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = elEmail.value.trim();
    const password = elPassword.value.trim();

    if (email === '' || password === '') {
        elError.textContent = 'Os dois campos são de preenchimento obrigatório.';
        elError.style.display = 'block';
        return;
    }

    fetch(url)
        .then(response => response.json())
        .then(utilizadores => {
            const user = utilizadores.find(u => u.email === email && u.senha === password);
            console.log(utilizadores);
            if (!user) {
                elError.textContent = 'Utilizador inexistente!';
                elError.style.display = 'block';
                return;
            }


            localStorage.setItem('userName', user.nome);


            saudacao(user.nome);

            alternarIcon(true);

            elModal.style.display = 'none';
            document.body.style.overflow = '';
        })

        .catch(error => {
            console.error('Erro ao aceder à base de dados:', error);
            elError.textContent = 'Erro de ligação ao servidor.';
            elError.style.display = 'block';
        });
});

function saudacao(nome) {
    const saudacao = document.getElementById('saudacao');
    saudacao.textContent = `Bem-vindo, ${nome}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const nome = localStorage.getItem('userName');
    if (nome) {
        saudacao(nome);
        alternarIcon(true);
    }
});

function alternarIcon(icon) {
    if (icon) {
        elOpenModal.style.display = 'none';
        elLogout.style.display = 'block';
    } else {
        elOpenModal.style.display = 'block';
        elLogout.style.display = 'none';
    }
}


elLogout.addEventListener('click', function () {
    localStorage.removeItem('userName');
    elEmail.value = '';
    elPassword.value = '';
    elSaudacao.textContent = '';
    elError.style.display = 'none';
    alternarIcon(false);

});






