/* ============================================================
   Luana Garden - script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Header scroll effect ---- */
  const header = document.getElementById('header');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  /* ---- Hamburger Menu ---- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = mobileMenu.querySelectorAll('nav a, .mobile-menu-reserve a');

  hamburger.addEventListener('click', function () {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open');
    document.body.style.overflow = isOpen ? 'hidden' : '';
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ---- Smooth Scroll ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const headerH = header ? header.offsetHeight : 72;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ---- Hero Slideshow ---- */
  const slides = document.querySelectorAll('.hero-slide');
  let currentSlide = 0;
  let slideshowTimer;

  function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    let nextSlide = (index + slides.length) % slides.length;
    let attempts = 0;
    while (window.getComputedStyle(slides[nextSlide]).display === 'none' && attempts < slides.length) {
      nextSlide = (nextSlide + 1) % slides.length;
      attempts++;
    }
    currentSlide = nextSlide;
    slides[currentSlide].classList.add('active');
  }

  function startSlideshow() {
    if (slides.length > 1) {
      slideshowTimer = setInterval(function () {
        goToSlide(currentSlide + 1);
      }, 5000);
    }
  }

  if (slides.length > 0) {
    slides[0].classList.add('active');
    startSlideshow();
  }

  /* ---- Scroll Reveal ---- */
  const revealEls = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(function (el) {
    observer.observe(el);
  });

  /* ---- Reserve Modal ---- */
  const modalOverlay = document.getElementById('reserveModal');
  const modalOpenBtns = document.querySelectorAll('.js-open-modal');
  const modalClose = document.getElementById('modalClose');

  modalOpenBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      modalOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', function (e) {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });

});
