let lastScroll = 0;

const navbar = document.querySelector(".navbar");

const heroSection = document.querySelector(".hero");

window.addEventListener("scroll", () => {

    const currentScroll = window.pageYOffset;

    const heroHeight = heroSection.offsetHeight;

    // ALWAYS SHOW navbar inside hero section
    if(currentScroll < heroHeight - 100){

        navbar.classList.remove("navbar-hidden");

        return;
    }

    // SCROLL DOWN
    if(currentScroll > lastScroll){

        navbar.classList.add("navbar-hidden");

    } 
    
    // SCROLL UP
    else{

        navbar.classList.remove("navbar-hidden");
    }

    lastScroll = currentScroll;

});