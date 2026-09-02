document.addEventListener("DOMContentLoaded", () => {

    const categories = document.querySelectorAll("[data-cocktail-category]");
    const navLinks = document.querySelectorAll(".cocktail-category-nav a");


    /* =====================================================
       COCKTAIL RAILS
    ====================================================== */

    categories.forEach((category) => {

        const rail = category.querySelector(".cocktail-rail");
        const prevButton = category.querySelector(".cocktail-rail-prev");
        const nextButton = category.querySelector(".cocktail-rail-next");

        if (!rail || !prevButton || !nextButton) return;


        const cards = rail.querySelectorAll(".cocktail-card");


        /* -------------------------------------------------
           SHORT CATEGORIES
        -------------------------------------------------- */

        if (cards.length <= 3) {
            category.classList.add("is-static");
        }


        /* -------------------------------------------------
           GET SCROLL DISTANCE
        -------------------------------------------------- */

        const getScrollAmount = () => {

            const firstCard = rail.querySelector(".cocktail-card");

            if (!firstCard) return rail.clientWidth * 0.8;

            const railStyles = window.getComputedStyle(rail);

            const gap =
                parseFloat(railStyles.columnGap) ||
                parseFloat(railStyles.gap) ||
                0;

            return firstCard.getBoundingClientRect().width + gap;

        };


        /* -------------------------------------------------
           PREVIOUS
        -------------------------------------------------- */

        prevButton.addEventListener("click", () => {

            rail.scrollBy({
                left: -getScrollAmount(),
                behavior: "smooth"
            });

        });


        /* -------------------------------------------------
           NEXT
        -------------------------------------------------- */

        nextButton.addEventListener("click", () => {

            rail.scrollBy({
                left: getScrollAmount(),
                behavior: "smooth"
            });

        });


        /* -------------------------------------------------
           ARROW STATES
        -------------------------------------------------- */

        const updateControls = () => {

            const maxScroll =
                rail.scrollWidth - rail.clientWidth;

            const hasOverflow =
                maxScroll > 4;


            if (!hasOverflow) {

                prevButton.disabled = true;
                nextButton.disabled = true;

                return;

            }


            prevButton.disabled =
                rail.scrollLeft <= 4;


            nextButton.disabled =
                rail.scrollLeft >= maxScroll - 4;

        };


        rail.addEventListener(
            "scroll",
            updateControls,
            { passive: true }
        );


        window.addEventListener(
            "resize",
            updateControls
        );


        requestAnimationFrame(updateControls);

    });



    /* =====================================================
       CATEGORY NAVIGATION
    ====================================================== */

    navLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetSelector =
                link.getAttribute("href");

            const target =
                document.querySelector(targetSelector);


            if (!target) return;


            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });



    /* =====================================================
       ACTIVE CATEGORY
    ====================================================== */

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(

            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) return;


                    navLinks.forEach((link) => {

                        const isCurrent =
                            link.getAttribute("href") ===
                            `#${entry.target.id}`;


                        link.classList.toggle(
                            "active",
                            isCurrent
                        );

                    });

                });

            },

            {
                root: null,
                rootMargin: "-28% 0px -60% 0px",
                threshold: 0
            }

        );


        categories.forEach((category) => {
            observer.observe(category);
        });

    }

});