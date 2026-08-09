/* =========================================
   KAUSHAL WEBSITE
========================================= */


/* =========================================
   LOADER
========================================= */

window.addEventListener("load", function () {

    const loader = document.getElementById("loader");

    setTimeout(function () {

        loader.classList.add("hide");

    }, 700);

});


/* =========================================
   MOBILE MENU
========================================= */

const menuButton =
    document.getElementById("menuButton");

const nav =
    document.getElementById("nav");


menuButton.addEventListener("click", function () {

    nav.classList.toggle("active");

});


/* Close menu after clicking */

const navLinks =
    document.querySelectorAll("#nav a");


navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        nav.classList.remove("active");

    });

});


/* =========================================
   SMOOTH SCROLL
========================================= */

document.querySelectorAll('a[href^="#"]')
    .forEach(function (link) {

        link.addEventListener("click", function (event) {

            const target =
                document.querySelector(
                    this.getAttribute("href")
                );

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });


/* =========================================
   SOCIAL CARD MOUSE EFFECT
========================================= */

const cards =
    document.querySelectorAll(".social-card");


cards.forEach(function (card) {

    card.addEventListener(
        "mousemove",
        function (event) {

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const rotateX =
                ((y / rect.height) - .5) * -2;

            const rotateY =
                ((x / rect.width) - .5) * 2;

            card.style.transform =
                `perspective(600px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-5px)`;

        }
    );


    card.addEventListener(
        "mouseleave",
        function () {

            card.style.transform = "";

        }
    );

});


/* =========================================
   PARALLAX HERO
========================================= */

const heroImage =
    document.querySelector(".hero-image-box");


window.addEventListener("mousemove", function (event) {

    if (!heroImage) return;

    const x =
        (event.clientX / window.innerWidth - .5);

    const y =
        (event.clientY / window.innerHeight - .5);

    heroImage.style.transform =
        `translate(${x * 8}px, ${y * 8}px)`;

});


/* =========================================
   SCROLL FADE
========================================= */

const animatedElements =
    document.querySelectorAll(
        ".about-box, .content-box, .social-card, .contact-inner"
    );


const observer =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },
        {
            threshold: .1
        }
    );


animatedElements.forEach(function (element) {

    observer.observe(element);

});