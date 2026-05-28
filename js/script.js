let lastScroll = 0;

const navbar = document.querySelector(".navbar");

const heroSection = document.querySelector(".hero");

window.addEventListener("scroll", () => {

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