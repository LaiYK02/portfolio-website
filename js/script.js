let lastScroll = 0;

const navbar = document.querySelector(".navbar");
const heroSection = document.querySelector(".hero");

window.addEventListener("scroll", () =>{

    const currentScroll = window.pageYOffset;

    /* HOME PAGE */
    if(heroSection){

        const heroHeight = heroSection.offsetHeight;

        /* Always show navbar inside hero section */
        if(currentScroll < heroHeight - 100){

            navbar.classList.remove("navbar-hidden");

            return;
        }
    }

    /* Scroll down - hide navbar */
    if(currentScroll > lastScroll){

        navbar.classList.add("navbar-hidden");
    }

    /* Scroll up - show navbar */
    else{

        navbar.classList.remove("navbar-hidden");
    }

    lastScroll = currentScroll;
});

/* PROJECT PAGE ANIMATIONS */

const projectRows = document.querySelectorAll('.project-row');

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add('show');
        }

    });

}, {
    threshold: 0.15
});

projectRows.forEach(row => {
    observer.observe(row);
});

const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeModal = document.querySelector('.close-modal');

const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

const imageCounter = document.getElementById('imageCounter');

let currentGallery = [];
let currentIndex = 0;

/* OPEN IMAGE */

function openImage(index){

    currentIndex = index;

    modalImage.src = currentGallery[currentIndex].src;

    imageCounter.textContent =
        `${currentIndex + 1} / ${currentGallery.length}`;

    imageModal.classList.add('active');

    document.body.style.overflow = 'hidden';
}

/* CLOSE IMAGE */

function closeImage(){

    imageModal.classList.remove('active');

    document.body.style.overflow = '';
}

/* NEXT IMAGE */

function showNext(){

    currentIndex++;

    if(currentIndex >= currentGallery.length){

        currentIndex = 0;
    }

    modalImage.src = currentGallery[currentIndex].src;

    imageCounter.textContent =
        `${currentIndex + 1} / ${currentGallery.length}`;
}

/* PREVIOUS IMAGE */

function showPrev(){

    currentIndex--;

    if(currentIndex < 0){

        currentIndex = currentGallery.length - 1;
    }

    modalImage.src = currentGallery[currentIndex].src;

    imageCounter.textContent =
        `${currentIndex + 1} / ${currentGallery.length}`;
}

/* EACH PROJECT GALLERY */

document.querySelectorAll('.project-gallery').forEach(gallery => {

    const images = gallery.querySelectorAll('img');

    images.forEach((image, index) => {

        image.addEventListener('click', () => {

            currentGallery = images;

            openImage(index);
        });

    });

});

/* BUTTONS */

if(imageModal)
{
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.querySelector('.close-modal');

    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    const imageCounter = document.getElementById('imageCounter');

    let currentGallery = [];
    let currentIndex = 0;
    
    closeModal.addEventListener('click', closeImage);

    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);

    /* CLICK OUTSIDE */

    imageModal.addEventListener('click', (e) => {

        if(e.target === imageModal){

            closeImage();
        }

    });

    /* KEYBOARD CONTROLS */

    document.addEventListener('keydown', (e) => {

        if(!imageModal.classList.contains('active')) return;

        if(e.key === 'Escape'){

            closeImage();
        }

        if(e.key === 'ArrowRight'){

            showNext();
        }

        if(e.key === 'ArrowLeft'){

            showPrev();
        }

    });
}

const backToTopBtn = document.getElementById('backToTop');

if(backToTopBtn){

    backToTopBtn.addEventListener('click', () => {

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

    });
}