const slides = document.querySelectorAll(".slide");


let currentIndex = 0;

const totalSlides = slides.length;


function mostrarSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = (i === index) ? "block" : "none";
    });
}


function mudarSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    mostrarSlide(currentIndex);
}


mostrarSlide(currentIndex);


setInterval(mudarSlide, 5000);
