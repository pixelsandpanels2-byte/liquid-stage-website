const $ = (s, c=document) => c.querySelector(s);
const $$ = (s, c=document) => [...c.querySelectorAll(s)];

const header = $('.site-header');
const progress = $('.progress-fill');
const menu = $('.nav');
const menuBtn = $('.menu-toggle');

if(!document.querySelector('link[href*="font-awesome"]')){
    const iconStylesheet = document.createElement('link');
    iconStylesheet.rel = 'stylesheet';
    iconStylesheet.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css';
    document.head.append(iconStylesheet);
}

$$('footer .footer-grid > div:first-child').forEach(footerIntro => {
    if($('.footer-social', footerIntro)) return;
    const socialLink = document.createElement('a');
    socialLink.className = 'footer-social';
    socialLink.href = 'https://www.instagram.com/theliquidstage/';
    socialLink.target = '_blank';
    socialLink.rel = 'noopener noreferrer';
    socialLink.setAttribute('aria-label', 'Follow Liquid Stage on Instagram');
    socialLink.innerHTML = '<i class="fa-brands fa-instagram" aria-hidden="true"></i><span>Instagram</span>';
    footerIntro.append(socialLink);
});

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 30);
  if(progress){
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.height = `${Math.min(100, (scrollY / Math.max(1,max)) * 100)}%`;
  }
});

menuBtn?.addEventListener('click', () => {
  menu?.classList.toggle('open');
  menuBtn.textContent = menu?.classList.contains('open') ? '×' : '☰';
});
$$('.nav-dropdown > a').forEach(link => link.addEventListener('click', e => {
    if(window.matchMedia('(max-width: 980px)').matches && !link.parentElement.classList.contains('open')){
        e.preventDefault();
        link.parentElement.classList.add('open');
    }
}));
$$('.nav a').forEach(a => a.addEventListener('click', () => {
    if(!a.parentElement.classList.contains('nav-dropdown')) menu?.classList.remove('open');
}));

// Testimonials
const quotes = $$('.quote');
let quoteIndex = 0;
function showQuote(i){
  if(!quotes.length) return;
  quoteIndex = (i + quotes.length) % quotes.length;
  quotes.forEach((q,n) => q.classList.toggle('active', n === quoteIndex));
}
$('[data-prev]')?.addEventListener('click', () => showQuote(quoteIndex - 1));
$('[data-next]')?.addEventListener('click', () => showQuote(quoteIndex + 1));

// Demo form
$$('.event-form').forEach(form => form.addEventListener('submit', e => {
  e.preventDefault();
  const message = $('.form-message', form);
  if(message){
    message.style.display = 'block';
    message.textContent = 'Brief received. The Liquid Stage team will connect with you shortly.';
  }
  form.reset();
}));

// GSAP progressive enhancement
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
if(window.gsap && window.ScrollTrigger && !reduceMotion){
  gsap.registerPlugin(ScrollTrigger);
  gsap.to('.hero-media', {scale:1, yPercent:8, ease:'none', scrollTrigger:{trigger:'.hero', start:'top top', end:'bottom top', scrub:true}});
  gsap.from('.hero-copy > *', {y:55, opacity:0, duration:1.1, stagger:.12, ease:'power3.out', delay:.2});

  if($('.world-track') && innerWidth > 700){
    const worlds = $$('.world');
    const rail = $$('.world-rail span');
    const trackTween = gsap.to('.world-track', {
      xPercent:-75,
      ease:'none',
      scrollTrigger:{trigger:'.worlds', pin:true, scrub:1, end:()=>`+=${innerWidth*3}`}
    });
    worlds.forEach((world,i)=>{
      ScrollTrigger.create({
        trigger:world,
        containerAnimation:trackTween,
        start:'left center', end:'right center',
        onEnter:()=>rail.forEach((r,n)=>r.classList.toggle('active',n===i)),
        onEnterBack:()=>rail.forEach((r,n)=>r.classList.toggle('active',n===i))
      });
      gsap.from($('.world-content',world), {y:80, opacity:0, scrollTrigger:{trigger:world, containerAnimation:trackTween, start:'left 70%', end:'left 40%', scrub:true}});
    });
  }

  $$('.reveal').forEach(el => gsap.from(el,{y:55,opacity:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 85%'}}));
  $$('.ops-layer').forEach((el,i)=>gsap.from(el,{x:i%2?60:-60,y:30,opacity:0,scrollTrigger:{trigger:'.layered-visual',start:'top 65%',end:'bottom 65%',scrub:1}}));
  gsap.from('.dashboard',{x:100,rotateY:-18,opacity:0,duration:1.4,ease:'power3.out',scrollTrigger:{trigger:'.tech-section',start:'top 65%'}});
  $$('.stage-node').forEach((el,i)=>gsap.from(el,{scale:0,opacity:0,delay:i*.08,scrollTrigger:{trigger:'.event-map',start:'top 75%'}}));
  $$('.service-card').forEach((el,i)=>gsap.from(el,{y:70,opacity:0,duration:1,delay:(i%2)*.12,scrollTrigger:{trigger:el,start:'top 88%'}}));
  $$('.process-stage').forEach(el=>gsap.from(el,{x:60,opacity:0,scrollTrigger:{trigger:el,start:'top 82%',end:'top 55%',scrub:1}}));
  $$('.event-card,.blog-card,.award,.offering,.mood-card,.motion-card').forEach((el,i)=>gsap.from(el,{y:45,opacity:0,duration:.85,delay:(i%3)*.06,scrollTrigger:{trigger:el,start:'top 90%'}}));
  $$('.stat strong,[data-count]').forEach(el=>{
    const raw = el.dataset.count;
    if(!raw) return;
    const end = Number(raw);
    const suffix = el.dataset.suffix || '';
    const obj={v:0};
    gsap.to(obj,{v:end,duration:1.8,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 85%',once:true},onUpdate:()=>el.textContent=`${Math.round(obj.v).toLocaleString('en-IN')}${suffix}`});
  });
}
/* =========================================================
   SERVICES PAGE — NEW SECTION ANIMATIONS
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    if (
        typeof gsap === "undefined" ||
        typeof ScrollTrigger === "undefined"
    ) {
        return;
    }


    gsap.registerPlugin(ScrollTrigger);



    /* -----------------------------------------------------
       WHY LIQUID STAGE INTRO
    ----------------------------------------------------- */

    gsap.from(".services-why-intro", {

        scrollTrigger: {
            trigger: ".services-why",
            start: "top 75%"
        },

        y: 50,
        opacity: 0,

        duration: 1,
        ease: "power3.out"

    });



    /* -----------------------------------------------------
       CORE STRENGTH CARDS
    ----------------------------------------------------- */

    gsap.from(".strength-card", {

        scrollTrigger: {
            trigger: ".services-strengths-grid",
            start: "top 80%"
        },

        y: 45,
        opacity: 0,

        duration: 0.8,
        stagger: 0.1,

        ease: "power3.out"

    });



    /* -----------------------------------------------------
       TABLETOP COPY
    ----------------------------------------------------- */

    gsap.from(".services-tabletop-copy", {

        scrollTrigger: {
            trigger: ".services-tabletop",
            start: "top 72%"
        },

        x: -45,
        opacity: 0,

        duration: 1,

        ease: "power3.out"

    });



    /* -----------------------------------------------------
       TABLETOP INTERFACE
    ----------------------------------------------------- */

    gsap.from(".tabletop-interface", {

        scrollTrigger: {
            trigger: ".services-tabletop",
            start: "top 72%"
        },

        x: 55,
        scale: 0.96,
        opacity: 0,

        duration: 1.1,

        ease: "power3.out"

    });



    /* -----------------------------------------------------
       TABLETOP DATA CARDS
    ----------------------------------------------------- */

    gsap.from(".tabletop-data-card", {

        scrollTrigger: {
            trigger: ".tabletop-dashboard",
            start: "top 85%"
        },

        y: 20,
        opacity: 0,

        duration: 0.65,
        stagger: 0.08,

        ease: "power2.out"

    });



    /* -----------------------------------------------------
       FINAL CTA
    ----------------------------------------------------- */

    gsap.from(".services-final-cta-content", {

        scrollTrigger: {
            trigger: ".services-final-cta",
            start: "top 75%"
        },

        y: 45,
        opacity: 0,

        duration: 1,

        ease: "power3.out"

    });



    /* -----------------------------------------------------
       FINAL CTA BACKGROUND RINGS
    ----------------------------------------------------- */

    gsap.fromTo(
        ".services-final-cta-glow",
        {
            scale: 0.78,
            opacity: 0.15
        },
        {
            scrollTrigger: {
                trigger: ".services-final-cta",
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5
            },

            scale: 1.15,
            opacity: 0.65,

            ease: "none"
        }
    );

});
/* =========================================================
   TABLETOP iO PAGE ANIMATIONS
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    if (
        typeof gsap === "undefined" ||
        typeof ScrollTrigger === "undefined"
    ) {
        return;
    }


    gsap.registerPlugin(ScrollTrigger);


    /* Only run on TableTop page */

    if (!document.querySelector(".tabletop-page-hero")) {
        return;
    }



    /* -----------------------------------------------------
       HERO MAP
    ----------------------------------------------------- */

    gsap.from(".tabletop-hero-map", {

        x: 60,
        opacity: 0,

        duration: 1.2,
        ease: "power3.out",
        delay: 0.2

    });


    gsap.from(".tabletop-node, .tabletop-hub", {

        scale: 0.8,
        opacity: 0,

        duration: 0.7,
        stagger: 0.12,

        ease: "back.out(1.4)",
        delay: 0.55

    });



    /* -----------------------------------------------------
       OPERATIONAL FLOW LINE
    ----------------------------------------------------- */

    gsap.to(".tabletop-process-line span", {

        width: "100%",

        scrollTrigger: {

            trigger: ".tabletop-process",
            start: "top 78%",
            end: "bottom 55%",

            scrub: 1

        },

        ease: "none"

    });



    /* -----------------------------------------------------
       OPERATIONAL FLOW STEPS
    ----------------------------------------------------- */

    gsap.from(".tabletop-process-step", {

        scrollTrigger: {
            trigger: ".tabletop-process",
            start: "top 78%"
        },

        y: 30,
        opacity: 0,

        duration: 0.7,
        stagger: 0.1,

        ease: "power2.out"

    });



    /* -----------------------------------------------------
       LIVE DASHBOARD
    ----------------------------------------------------- */

    gsap.from(".tabletop-dashboard", {

        scrollTrigger: {
            trigger: ".tabletop-live-section",
            start: "top 72%"
        },

        x: 50,
        scale: 0.97,
        opacity: 0,

        duration: 1,

        ease: "power3.out"

    });


    gsap.from(".tabletop-dashboard-card", {

        scrollTrigger: {
            trigger: ".tabletop-dashboard-stats",
            start: "top 82%"
        },

        y: 18,
        opacity: 0,

        duration: 0.55,
        stagger: 0.08,

        ease: "power2.out"

    });



    /* -----------------------------------------------------
       ACCOUNTABILITY
    ----------------------------------------------------- */

    gsap.from(".tabletop-role", {

        scrollTrigger: {
            trigger: ".tabletop-accountability-row",
            start: "top 78%"
        },

        y: 28,
        opacity: 0,

        duration: 0.7,
        stagger: 0.12,

        ease: "power2.out"

    });



    /* -----------------------------------------------------
       SCALE VISUAL
    ----------------------------------------------------- */

    gsap.from(".tabletop-scale-core", {

        scrollTrigger: {
            trigger: ".tabletop-scale-visual",
            start: "top 75%"
        },

        scale: 0.6,
        opacity: 0,

        duration: 0.8,

        ease: "back.out(1.6)"

    });


    gsap.from(".tabletop-scale-bars span", {

        scrollTrigger: {
            trigger: ".tabletop-scale-visual",
            start: "top 72%"
        },

        scale: 0,
        opacity: 0,

        duration: 0.45,
        stagger: 0.06,

        ease: "back.out(1.7)"

    });

});
/* =========================================================
   HOMEPAGE COCKTAIL MENU
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    if (
        typeof gsap === "undefined" ||
        typeof ScrollTrigger === "undefined"
    ) {
        return;
    }


    if (!document.querySelector(".cocktail-menu-section")) {
        return;
    }


    gsap.registerPlugin(ScrollTrigger);



    /* Heading */

    gsap.from(".cocktail-menu-heading", {

        scrollTrigger: {
            trigger: ".cocktail-menu-section",
            start: "top 75%"
        },

        y: 40,
        opacity: 0,

        duration: 0.9,

        ease: "power3.out"

    });



    /* Cocktail images */

    gsap.from(".cocktail-shot", {

        scrollTrigger: {
            trigger: ".cocktail-collage",
            start: "top 78%"
        },

        y: 55,
        opacity: 0,

        duration: 0.9,

        stagger: 0.12,

        ease: "power3.out"

    });



    /* subtle parallax only on desktop */

    if (window.innerWidth > 900) {

        gsap.to(".cocktail-shot--espresso", {

            y: -35,

            scrollTrigger: {
                trigger: ".cocktail-menu-section",
                start: "top bottom",
                end: "bottom top",
                scrub: 1.4
            }

        });


        gsap.to(".cocktail-shot--gimlet", {

            y: 40,

            scrollTrigger: {
                trigger: ".cocktail-menu-section",
                start: "top bottom",
                end: "bottom top",
                scrub: 1.7
            }

        });


        gsap.to(".cocktail-shot--slush", {

            y: -25,

            scrollTrigger: {
                trigger: ".cocktail-menu-section",
                start: "top bottom",
                end: "bottom top",
                scrub: 1.6
            }

        });

    }

});
/* =========================================================
   HOMEPAGE — RECENT EVENTS
   ========================================================= */

document.addEventListener("DOMContentLoaded", async function () {

    const eventsGrid =
        document.querySelector("#homepage-recent-events");

    if (!eventsGrid) {
        return;
    }


    try {

        const source =
            eventsGrid.dataset.source;

        const response =
            await fetch(source);

        if (!response.ok) {
            throw new Error("Unable to load events.");
        }


        const events =
            await response.json();



        /* -----------------------------------------------
           SORT NEWEST FIRST
        ------------------------------------------------ */

        const recentEvents =
            events
                .filter(event => event.published !== false)
                .sort((a, b) => {

                    return new Date(b.addedOn) -
                           new Date(a.addedOn);

                })
                .slice(0, 3);



        /* -----------------------------------------------
           BUILD HOMEPAGE CARDS
        ------------------------------------------------ */

        eventsGrid.innerHTML =
            recentEvents.map(event => {

const imageBase =
    eventsGrid.dataset.imageBase ||
    "assets/images/events/";

const image =
    `${imageBase}${event.image}`;


                return `

                    <article class="event-card">

                        <div
                            class="card-media"
                            style="--bg:url('${image}')">
                        </div>


                        <div class="card-body">


                            <div class="card-meta">

                                <span>
                                    ${event.type}
                                </span>

                                <span>
                                    ${event.year}
                                </span>

                            </div>


                            <h3>
                                ${event.name}
                            </h3>


                            <p>
                                ${event.homepageDescription || ""}
                            </p>


                            <a
                                class="text-link"
                                href="events/#${event.slug}">

                                View Event →

                            </a>


                        </div>

                    </article>

                `;

            }).join("");


    }

    catch (error) {

        console.error(
            "Recent events could not be loaded:",
            error
        );

    }

});


/* =========================================================
   WEDDING MOMENTS CAROUSEL
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const carousel =
        document.querySelector("#wedding-carousel");

    const prevButton =
        document.querySelector(".wedding-carousel-prev");

    const nextButton =
        document.querySelector(".wedding-carousel-next");


    if (
        !carousel ||
        !prevButton ||
        !nextButton
    ) {
        return;
    }


    function getScrollAmount() {

        const card =
            carousel.querySelector(".wedding-carousel-card");

        if (!card) {
            return 0;
        }


        const carouselStyles =
            window.getComputedStyle(carousel);


        const gap =
            parseFloat(carouselStyles.columnGap) || 18;


        return card.offsetWidth + gap;

    }


    nextButton.addEventListener(
        "click",
        function () {

            carousel.scrollBy({
                left: getScrollAmount(),
                behavior: "smooth"
            });

        }
    );


    prevButton.addEventListener(
        "click",
        function () {

            carousel.scrollBy({
                left: -getScrollAmount(),
                behavior: "smooth"
            });

        }
    );

});

/* =========================================================
   HOUSE PARTY CAROUSEL
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const carousel =
        document.querySelector("#house-party-carousel");

    const prevButton =
        document.querySelector(".house-party-carousel-prev");

    const nextButton =
        document.querySelector(".house-party-carousel-next");


    if (
        !carousel ||
        !prevButton ||
        !nextButton
    ) {
        return;
    }


    function getScrollAmount() {

        const card =
            carousel.querySelector(".wedding-carousel-card");

        if (!card) {
            return 0;
        }


        const carouselStyles =
            window.getComputedStyle(carousel);


        const gap =
            parseFloat(carouselStyles.columnGap) || 18;


        return card.offsetWidth + gap;

    }


    nextButton.addEventListener(
        "click",
        function () {

            carousel.scrollBy({
                left: getScrollAmount(),
                behavior: "smooth"
            });

        }
    );


    prevButton.addEventListener(
        "click",
        function () {

            carousel.scrollBy({
                left: -getScrollAmount(),
                behavior: "smooth"
            });

        }
    );

});

/* =========================================================
   HERO — EVENT EXPERIENCE COUNTER
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const counter =
        document.querySelector("[data-event-count]");

    if (!counter) {
        return;
    }


    const target =
        Number(counter.dataset.eventCount) || 0;


    const reduceMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    /* Accessibility / reduced motion */

    if (reduceMotion) {

        counter.textContent =
            target.toLocaleString("en-IN");

        return;

    }


    const duration = 1800;

    const startTime =
        performance.now();


    /*
     * Ease-out cubic:
     * fast enough at the beginning,
     * slower and more elegant toward 750.
     */

    const easeOutCubic = t =>
        1 - Math.pow(1 - t, 3);


    const animate = currentTime => {

        const progress =
            Math.min(
                (currentTime - startTime) / duration,
                1
            );


        const eased =
            easeOutCubic(progress);


        const currentValue =
            Math.round(
                target * eased
            );


        counter.textContent =
            currentValue.toLocaleString("en-IN");


        if (progress < 1) {

            requestAnimationFrame(
                animate
            );

        }

    };


    requestAnimationFrame(
        animate
    );

});