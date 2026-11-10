// Kaushal — website interactions and public audience counts.

const STATS = {
    youtube: "440+",
    instagram: "160+",
    tiktok: "400+",
    facebook: "20+"
};

function loadStats() {
    const values = {
        youtubeSubs: STATS.youtube,
        instagramFollowers: STATS.instagram,
        tiktokFollowers: STATS.tiktok,
        facebookFollowers: STATS.facebook
    };

    Object.entries(values).forEach(([id, value]) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadStats();

    // Scroll reveal
    const revealItems = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    revealItems.forEach(el => observer.observe(el));

    // Mobile navigation
    const menuBtn = document.getElementById("menuBtn");
    const nav = document.querySelector(".navbar nav");
    if (menuBtn && nav) {
        menuBtn.addEventListener("click", () => {
            nav.classList.toggle("open");
            menuBtn.textContent = nav.classList.contains("open") ? "×" : "☰";
        });
        nav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                nav.classList.remove("open");
                menuBtn.textContent = "☰";
            });
        });
    }

    // Scroll progress
    const progress = document.querySelector(".scroll-progress");
    const updateProgress = () => {
        if (!progress) return;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    // Cursor glow on desktop
    const glow = document.querySelector(".cursor-glow");
    if (glow && window.matchMedia("(pointer:fine)").matches) {
        window.addEventListener("pointermove", e => {
            glow.style.left = `${e.clientX}px`;
            glow.style.top = `${e.clientY}px`;
        }, { passive: true });
    }

    // Magnetic buttons
    document.querySelectorAll(".magnetic").forEach(el => {
        el.addEventListener("pointermove", e => {
            const r = el.getBoundingClientRect();
            const x = (e.clientX - r.left - r.width / 2) * 0.10;
            const y = (e.clientY - r.top - r.height / 2) * 0.10;
            el.style.transform = `translate(${x}px, ${y}px)`;
        });
        el.addEventListener("pointerleave", () => {
            el.style.transform = "";
        });
    });

    // Subtle 3D tilt
    document.querySelectorAll(".tilt").forEach(card => {
        card.addEventListener("pointermove", e => {
            if (!window.matchMedia("(pointer:fine)").matches) return;
            const r = card.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - .5;
            const y = (e.clientY - r.top) / r.height - .5;
            card.style.transform = `perspective(900px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg) translateY(-3px)`;
        });
        card.addEventListener("pointerleave", () => {
            card.style.transform = "";
        });
    });

    // Back to top
    const topBtn = document.getElementById("topBtn");
    if (topBtn) {
        const toggleTop = () => topBtn.classList.toggle("show", window.scrollY > 600);
        window.addEventListener("scroll", toggleTop, { passive: true });
        toggleTop();
        topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    }

    // Smooth same-page links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", e => {
            const target = document.querySelector(link.getAttribute("href"));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });
});

// Current year
const footerYear = document.querySelector("footer small");
if (footerYear) footerYear.textContent = `© ${new Date().getFullYear()} Kaushal. All rights reserved.`;
