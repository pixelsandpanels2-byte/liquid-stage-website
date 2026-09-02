document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       HELPERS
    ====================================================== */

    const body =
        document.body;


    const getYouTubeID = (input = "") => {

        const value =
            String(input).trim();


        if (!value) {
            return "";
        }


        /*
         * Allow a raw YouTube ID as a fallback.
         */

        if (
            /^[a-zA-Z0-9_-]{6,}$/.test(value) &&
            !value.includes("/")
        ) {
            return value;
        }


        try {

            const url =
                new URL(value);


            /*
             * Standard:
             * youtube.com/watch?v=VIDEO_ID
             */

            if (
                url.hostname.includes("youtube.com")
            ) {

                const watchID =
                    url.searchParams.get("v");


                if (watchID) {
                    return watchID;
                }


                /*
                 * youtube.com/embed/VIDEO_ID
                 * youtube.com/shorts/VIDEO_ID
                 */

                const pathParts =
                    url.pathname
                        .split("/")
                        .filter(Boolean);


                if (
                    pathParts[0] === "embed" ||
                    pathParts[0] === "shorts"
                ) {

                    return pathParts[1] || "";

                }

            }


            /*
             * youtu.be/VIDEO_ID
             */

            if (
                url.hostname.includes("youtu.be")
            ) {

                return url.pathname
                    .replace("/", "")
                    .split("/")[0];

            }

        }

        catch (error) {

            console.warn(
                "Invalid YouTube URL:",
                value
            );

        }


        return "";

    };



    /* =====================================================
       GALLERY TABS
    ====================================================== */

    const tabs =
        document.querySelectorAll(
            "[data-gallery-tab]"
        );


    const panels =
        document.querySelectorAll(
            ".gallery-panel"
        );


    const activateTab = (tab) => {

        const target =
            tab.dataset.galleryTab;


        tabs.forEach(button => {

            const active =
                button === tab;


            button.classList.toggle(
                "active",
                active
            );


            button.setAttribute(
                "aria-selected",
                active
                    ? "true"
                    : "false"
            );

        });


        panels.forEach(panel => {

            const active =
                panel.id ===
                `gallery-${target}`;


            panel.classList.toggle(
                "active",
                active
            );


            panel.hidden =
                !active;

        });

    };


    tabs.forEach(tab => {

        tab.addEventListener(
            "click",
            () => {

                activateTab(tab);

            }
        );

    });



    /* =====================================================
       YOUTUBE THUMBNAILS

       The client / WordPress only needs to provide a full
       YouTube URL. JS derives the thumbnail automatically.
    ====================================================== */

    const youtubeCards =
        document.querySelectorAll(
            "[data-youtube-url]"
        );


    youtubeCards.forEach(card => {

        const videoID =
            getYouTubeID(
                card.dataset.youtubeUrl
            );


        if (!videoID) {
            return;
        }


        card.dataset.youtubeId =
            videoID;


        const thumbnail =
            card.querySelector(
                "[data-youtube-thumbnail]"
            );


        if (thumbnail) {

            thumbnail.src =
                `https://img.youtube.com/vi/${videoID}/hqdefault.jpg`;

        }

    });



    /* =====================================================
       IMAGE LIGHTBOX
    ====================================================== */

    const lightbox =
        document.querySelector(
            "#gallery-lightbox"
        );


    const lightboxImage =
        document.querySelector(
            "#gallery-lightbox-image"
        );


    const imageCards =
        document.querySelectorAll(
            "[data-gallery-image]"
        );


    const openImageModal = (
        imageURL,
        imageAlt = ""
    ) => {

        if (
            !lightbox ||
            !lightboxImage ||
            !imageURL
        ) {
            return;
        }


        lightboxImage.src =
            imageURL;


        lightboxImage.alt =
            imageAlt;


        lightbox.classList.add(
            "open"
        );


        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );


        body.style.overflow =
            "hidden";

    };


    const closeImageModal = () => {

        if (
            !lightbox ||
            !lightboxImage
        ) {
            return;
        }


        lightbox.classList.remove(
            "open"
        );


        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );


        lightboxImage.src =
            "";


        lightboxImage.alt =
            "";


        body.style.overflow =
            "";

    };


    imageCards.forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const imageURL =
                    card.dataset.galleryImage;


                const imageAlt =
                    card.dataset.galleryAlt ||
                    card
                        .querySelector("img")
                        ?.alt ||
                    "";


                openImageModal(
                    imageURL,
                    imageAlt
                );

            }
        );

    });



    /* =====================================================
       VIDEO MODAL
    ====================================================== */

    const videoModal =
        document.querySelector(
            "#gallery-video-modal"
        );


    const videoPlayer =
        document.querySelector(
            "#gallery-video-player"
        );


    const openVideoModal = (
        videoID
    ) => {

        if (
            !videoID ||
            !videoModal ||
            !videoPlayer
        ) {
            return;
        }


        videoPlayer.innerHTML = `

            <iframe
                src="https://www.youtube.com/embed/${videoID}?autoplay=1&rel=0"
                title="Liquid Stage video"
                allow="autoplay; encrypted-media; picture-in-picture"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen>
            </iframe>

        `;


        videoModal.classList.add(
            "open"
        );


        videoModal.setAttribute(
            "aria-hidden",
            "false"
        );


        body.style.overflow =
            "hidden";

    };


    const closeVideoModal = () => {

        if (
            !videoModal ||
            !videoPlayer
        ) {
            return;
        }


        videoModal.classList.remove(
            "open"
        );


        videoModal.setAttribute(
            "aria-hidden",
            "true"
        );


        /*
         * Removing the iframe immediately stops
         * YouTube playback.
         */

        videoPlayer.innerHTML =
            "";


        body.style.overflow =
            "";

    };


    youtubeCards.forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const videoID =
                    card.dataset.youtubeId ||
                    getYouTubeID(
                        card.dataset.youtubeUrl
                    );


                openVideoModal(
                    videoID
                );

            }
        );

    });



    /* =====================================================
       CLOSE BUTTONS
    ====================================================== */

    document
        .querySelector(
            ".gallery-image-close"
        )
        ?.addEventListener(
            "click",
            closeImageModal
        );


    document
        .querySelector(
            ".gallery-video-close"
        )
        ?.addEventListener(
            "click",
            closeVideoModal
        );



    /* =====================================================
       CLICK OUTSIDE MODAL
    ====================================================== */

    lightbox?.addEventListener(
        "click",
        event => {

            if (
                event.target === lightbox
            ) {

                closeImageModal();

            }

        }
    );


    videoModal?.addEventListener(
        "click",
        event => {

            if (
                event.target === videoModal
            ) {

                closeVideoModal();

            }

        }
    );



    /* =====================================================
       ESCAPE KEY
    ====================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key !== "Escape"
            ) {
                return;
            }


            closeImageModal();

            closeVideoModal();

        }
    );


});