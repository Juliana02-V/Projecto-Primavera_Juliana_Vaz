let url = `localhost:3000/utilizadores`;

const elIcon = document.querySelector('.fa-magnifying-glass');
const elSearch = document.getElementById('textoPesquisa');
const elOpenModal = document.getElementById('openModal');
const elModal = document.getElementById('loginModal');
const elCloseModal = document.querySelector('.btModalCase');
const elEmail = document.getElementById('email');


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

});

elCloseModal.addEventListener('click', function () {
    elModal.style.display = 'none';
    document.body.style.overflow = '';
});









