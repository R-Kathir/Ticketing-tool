gsap.registerPlugin(ScrollTrigger);


const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothTouch: false,
});


lenis.on('scroll', ScrollTrigger.update);


gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

const icon = menuBtn.querySelector(".material-icons-outlined");

menuBtn.addEventListener("click", () => {

    nav.classList.toggle("active");

    const open = nav.classList.contains("active");

    icon.textContent = open ? "close" : "menu";

    document.body.style.overflow = open ? "hidden" : "";

    if (typeof lenis !== "undefined") {
        open ? lenis.stop() : lenis.start();
    }

});

document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("active");

        icon.textContent = "menu";

        document.body.style.overflow = "";

        if (typeof lenis !== "undefined") {
            lenis.start();
        }

    });

});

document.addEventListener("click", (e) => {

    if (
        nav.classList.contains("active") &&
        !nav.contains(e.target) &&
        !menuBtn.contains(e.target)
    ) {

        nav.classList.remove("active");

        icon.textContent = "menu";

        document.body.style.overflow = "";

        if (typeof lenis !== "undefined") {
            lenis.start();
        }

    }

});

AOS.init({

    offset: 50,
    delay: 50,
    duration: 800,


    easing: 'ease-out-cubic',


    once: true,
    mirror: false,
    anchorPlacement: 'top-bottom',


    disable: window.innerWidth < 768
});



document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.animate-counter');


    const easeOutQuart = (x) => 1 - Math.pow(1 - x, 4);

    const animateCountUp = (el) => {
        const target = parseFloat(el.getAttribute('data-target'));
        const duration = parseInt(el.getAttribute('data-duration')) || 2000; // Default 2 seconds
        const suffix = el.getAttribute('data-suffix') || '';
        const isDecimal = target % 1 !== 0; // Check if the target has decimals
        let startTimestamp = null;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);


            const easeProgress = easeOutQuart(progress);
            const currentNum = easeProgress * target;


            if (isDecimal) {
                el.innerText = currentNum.toFixed(1) + suffix;
            } else {
                el.innerText = Math.floor(currentNum) + suffix;
            }


            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {

                el.innerText = target + (isDecimal ? '' : '') + suffix;
            }
        };
        window.requestAnimationFrame(step);
    };


    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Triggers when 50% of the element is visible
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCountUp(entry.target);

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);


    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});








document.addEventListener("DOMContentLoaded", () => {


    const scrollCards = gsap.utils.toArray('.scroll-card');

    scrollCards.forEach((card, i) => {
        gsap.fromTo(card,
            {
                opacity: 0,
                y: 100,
                scale: 0.9
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%", // Triggers when the top of the card hits 85% down the viewport
                    end: "top 40%",   // Ends animation when it reaches 40%
                    scrub: 1,         // Connects animation directly to the scrollbar (1 second lag for smoothness)
                    toggleActions: "play none none reverse"
                }
            }
        );
    });


    gsap.to('.sticky-visual img', {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
            trigger: '.modern-sticky-section',
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });



    const sectionHeadings = gsap.utils.toArray('.section-heading');

    sectionHeadings.forEach((heading) => {

        const overline = heading.querySelector('.heading-overline');
        const title = heading.querySelector('h2');
        const desc = heading.querySelector('.heading-desc');


        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: heading,
                start: "top 85%", // Triggers when heading is 85% down the screen
                toggleActions: "play none none reverse"
            }
        });


        if (overline) {
            tl.from(overline, {
                y: -80,         // Drops down from above
                opacity: 0,
                duration: 1,
                ease: "bounce.out"
            });
        }


        if (title) {
            tl.from(title, {
                skewX: 30,      // Tilts the text 30 degrees
                x: -100,        // Slides in from the left
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            }, "-=0.6");       // The "-=0.6" makes it start BEFORE the bounce finishes for a seamless flow
        }


        if (desc) {
            tl.from(desc, {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            }, "-=0.7");
        }
    });
});