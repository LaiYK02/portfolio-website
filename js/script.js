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

/* =========================
   CONTACT FORM (EmailJS)
========================= */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function(e){

        e.preventDefault();

        emailjs.sendForm(
            "service_2b5ix04",
            "template_31iequh",
            this
        )
        .then(() => {

            alert("Thank you! Your message has been sent successfully.");

            contactForm.reset();

        })
        .catch((error) => {

            console.error(error);

            alert("Failed to send message. Please try again.");

        });

    });

}

/* =========================
   COPY EMAIL / PHONE
========================= */

const copyCards = document.querySelectorAll(".copy-card");
const copyMessage = document.getElementById("copyMessage");

if(copyCards.length && copyMessage){

    copyCards.forEach(card => {

        card.addEventListener("click", () => {

            const text = card.dataset.copy;
            const type = card.dataset.type;

            navigator.clipboard.writeText(text);

            if(type === "email"){

                copyMessage.textContent =
                    "✓ Email copied to clipboard!";
            }
            else{

                copyMessage.textContent =
                    "✓ Phone number copied to clipboard!";
            }

            copyMessage.classList.add("show");

            setTimeout(() => {

                copyMessage.classList.remove("show");

            }, 2500);

        });

    });

}

/* =========================
   PROJECT NAVIGATOR
========================= */

const projectMenuBtn =
    document.getElementById("projectMenuBtn");

const projectMenu =
    document.getElementById("projectMenu");

if(projectMenuBtn && projectMenu){

    projectMenuBtn.addEventListener("click", () => {

        projectMenu.classList.toggle("active");

    });

}

document
.querySelectorAll(".project-menu a")
.forEach(link => {

    link.addEventListener("click", () => {

        projectMenu.classList.remove("active");

    });

});

const sections = document.querySelectorAll(".project-row");
const navLinks = document.querySelectorAll(".project-menu a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.offsetHeight;

        if(window.scrollY >= sectionTop &&
           window.scrollY < sectionTop + sectionHeight){

            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){

            link.classList.add("active");
        }
    });

});

window.dispatchEvent(new Event("scroll"));

const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".nav-links");

if(menuToggle && mobileNav){

    menuToggle.addEventListener("click", () => {

        mobileNav.classList.toggle("active");

        if(mobileNav.classList.contains("active")){
            menuToggle.innerHTML = "✕";
        }
        else{
            menuToggle.innerHTML = "☰";
        }

    });

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            mobileNav.classList.remove("active");
            menuToggle.innerHTML = "☰";

        });

    });

}