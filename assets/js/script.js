/* ==========================================
   EFEITO DE DIGITAÇÃO
========================================== */

const words = [
    "Java",
    "Spring Boot",
    "Python",
    "JavaScript",
    "Bootstrap",
    "SQL",
    "Android",
    "Full Stack"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

const typing = document.getElementById("typing");

function typeEffect() {

    if (!typing) return;

    const currentWord = words[wordIndex];

    if (!deleting) {

        typing.textContent = currentWord.substring(0, charIndex++);

        if (charIndex > currentWord.length) {

            deleting = true;

            setTimeout(typeEffect, 1500);

            return;

        }

    } else {

        typing.textContent = currentWord.substring(0, charIndex--);

        if (charIndex < 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex >= words.length) {

                wordIndex = 0;

            }

        }

    }

    setTimeout(typeEffect, deleting ? 40 : 120);

}

typeEffect();


/* ==========================================
   NAVBAR AO ROLAR
========================================== */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 60) {

        navbar.style.background = "#07111d";

        navbar.style.boxShadow = "0 10px 25px rgba(0,0,0,.35)";

    } else {

        navbar.style.background = "rgba(12,18,30,.65)";

        navbar.style.boxShadow = "none";

    }

});


/* ==========================================
   CONTADORES
========================================== */

const counters = document.querySelectorAll(".stat-box h2");

const observerCounter = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;

        const text = counter.innerText;

        const value = parseInt(text.replace(/\D/g, ""));

        let current = 0;

        const interval = setInterval(() => {

            current++;

            if (text.includes("%")) {

                counter.innerText = current + "%";

            } else if (text.includes("+")) {

                counter.innerText = "+" + current;

            } else {

                counter.innerText = current;

            }

            if (current >= value) {

                clearInterval(interval);

                counter.innerText = text;

            }

        }, 25);

        observerCounter.unobserve(counter);

    });

});

counters.forEach(counter => observerCounter.observe(counter));


/* ==========================================
   ANIMAÇÃO DOS CARDS
========================================== */

const cards = document.querySelectorAll(

    ".glass-card,.skill-card,.project-card,.contact-card,.stat-box"

);

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {

    threshold: .15

});

cards.forEach(card => {

    card.classList.add("hidden");

    observer.observe(card);

});


/* ==========================================
   BOTÃO VOLTAR AO TOPO
========================================== */

const button = document.createElement("button");

button.innerHTML = '<i class="fas fa-arrow-up"></i>';

button.className = "back-top";

document.body.appendChild(button);

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        button.classList.add("active");

    } else {

        button.classList.remove("active");

    }

});

button.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/* ==========================================
   LINKS SUAVES
========================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});