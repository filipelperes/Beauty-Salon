// SELECTORS
const nav = document.querySelector('#header nav');
const toggle = document.querySelectorAll('nav .toggle');
const links = document.querySelectorAll('nav ul li a');
const header = document.querySelector('#header');
const backToTopButton = document.querySelector('.back-to-top');
const sections = document.querySelectorAll('main section[id]');

const { offsetHeight: headerHeight } = header;

// OPEN/CLOSE MENU LISTENER
for (const element of toggle) {
   element.addEventListener('click', () => { nav.classList.toggle('show'); });
}

// CLOSE MENU ON CLICK LINK
for (const link of links) {
   link.addEventListener('click', () => { nav.classList.remove('show'); });
}

// ADD BOX-SHADOW ON WINDOW SCROLL
const changeHeaderOnScroll = () => {
   if (window.scrollY >= headerHeight) header.classList.add('scroll');
   else header.classList.remove('scroll');
};

// SLIDER | SWIPER
const swiper = new Swiper('.swiper', {
   slidesPerView: 1,
   pagination: {
      el: '.swiper-pagination'
   },
   mousewheel: true,
   keyboard: true,
   breakpoints: {
      767: {
         slidesPerView: 2,
         setWrapperSize: true,
      },
      1200: {
         slidesPerView: 3,
         mousewheel: false,
         keyboard: false,
         pagination: {
            enabled: false
         }
      }
   }
});

//SCROLL REVEAL
const scrollReveal = ScrollReveal({
   origin: 'top',
   distance: '30px',
   duration: 700,
   reset: true
});

scrollReveal.reveal(
   `#home .image, #home .text,
   #about .image, #about .text,
   #services header, #services .card,
   #testimonials header, #testimonials .testimonials,
   #contact .text, #contact .links,
   footer .brand, footer .social
   `,
   { interval: 100 }
);

// BACK TO TOP BUTTON
const backToTop = () => {
   if (window.scrollY >= 600) backToTopButton.classList.add('show');
   else backToTopButton.classList.remove('show');
};

// ACTIVE MENU ACCORDING VISIBLE SECTION
const activateMenuAtCurrentSection = () => {
   const checkpoint = window.pageYOffset + (window.innerHeight / 8) * 4;
   for (const section of sections) {
      const { offsetTop: sectionTop, offsetHeight: sectionHeight } = section;
      const sectionId = section.getAttribute('id');
      const checkpointStart = checkpoint >= sectionTop;
      const checkpointEnd = checkpoint <= sectionTop + sectionHeight;

      if (checkpointStart && checkpointEnd) document
         .querySelector(`nav ul li a[href*=${sectionId}]`)
         .classList.add('active');
      else document
         .querySelector(`nav ul li a[href*=${sectionId}]`)
         .classList.remove('active');
   }
};

// ON SCROLL
window.addEventListener('scroll', () => {
   changeHeaderOnScroll();
   backToTop();
   activateMenuAtCurrentSection();
});