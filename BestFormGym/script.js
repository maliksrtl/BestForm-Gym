// Mobil Menü Aç/Kapat
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
});

// SSS (FAQ) Akordeon Yapısı
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    item.addEventListener('click', () => {
        const expanded = item.getAttribute('aria-expanded') === 'true';
        item.setAttribute('aria-expanded', !expanded);
    });
});

// Güncel Yılı Footer'a Yazdır
document.getElementById('year').textContent = new Date().getFullYear();

// Sayfa İçi Yumuşak Kaydırma (Smooth Scroll)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
