document.addEventListener("DOMContentLoaded", async () => {

    const eventsContainer =
        document.querySelector("#events-page-grid");

    const filterContainer =
        document.querySelector("#events-filter");

    const resultCount =
        document.querySelector("#events-result-count");

    const emptyState =
        document.querySelector("#events-empty-state");


    if (!eventsContainer) {
        return;
    }


    /* =====================================================
       HELPERS
    ====================================================== */

    const escapeHTML = (value = "") => {

        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");

    };


    const hasValue = (value) => {

        return (
            value !== null &&
            value !== undefined &&
            value !== ""
        );

    };


    const makeStat = (
        label,
        value,
        wide = false
    ) => {

        if (!hasValue(value)) {
            return "";
        }


        return `
            <div
                class="event-story-stat
                ${wide ? "event-story-stat--wide" : ""}">

                <span class="event-story-stat-label">
                    ${escapeHTML(label)}
                </span>

                <span class="event-story-stat-value">
                    ${escapeHTML(value)}
                </span>

            </div>
        `;

    };


    /* =====================================================
       LOAD DATA
    ====================================================== */

    try {

        const source =
            eventsContainer.dataset.source;

        const response =
            await fetch(source);


        if (!response.ok) {

            throw new Error(
                `Unable to load events: ${response.status}`
            );

        }


        const data =
            await response.json();


        const events =
            Array.isArray(data)
                ? data
                : data.events;


        if (!Array.isArray(events)) {

            throw new Error(
                "No events array found."
            );

        }


        /* =================================================
           PUBLISHED + SORT
        ================================================= */

        const publishedEvents =
            events

                .filter(event =>
                    event.published !== false
                )

                .sort((a, b) => {

                    return (
                        new Date(b.addedOn || 0) -
                        new Date(a.addedOn || 0)
                    );

                });


        /* =================================================
           BUILD FILTERS
        ================================================= */

        if (filterContainer) {

            const preferredOrder = [
                "Concert",
                "Festival",
                "Corporate",
                "Comedy"
            ];


            const eventTypes =
                [
                    ...new Set(
                        publishedEvents
                            .map(event => event.type)
                            .filter(Boolean)
                    )
                ];


            eventTypes.sort((a, b) => {

                const aIndex =
                    preferredOrder.indexOf(a);

                const bIndex =
                    preferredOrder.indexOf(b);


                if (
                    aIndex !== -1 ||
                    bIndex !== -1
                ) {

                    return (
                        (aIndex === -1 ? 999 : aIndex) -
                        (bIndex === -1 ? 999 : bIndex)
                    );

                }


                return a.localeCompare(b);

            });


            const filterLabels = {
                Concert: "Concerts",
                Festival: "Festivals",
                Corporate: "Corporate",
                Comedy: "Comedy"
            };


            eventTypes.forEach(type => {

                const button =
                    document.createElement("button");


                button.type = "button";

                button.className =
                    "events-filter-button";

                button.dataset.eventFilter =
                    type.toLowerCase();

                button.setAttribute(
                    "aria-pressed",
                    "false"
                );

                button.textContent =
                    filterLabels[type] || type;


                filterContainer.appendChild(button);

            });

        }


        /* =================================================
           BUILD EVENT CARDS
        ================================================= */

        eventsContainer.innerHTML =
            publishedEvents.map(event => {


                /* -----------------------------------------
                   LOCATION
                ----------------------------------------- */

                let locationLabel = "";


                if (
                    event.cityCount &&
                    event.cityCount > 1
                ) {

                    locationLabel =
                        `${event.cityCount} Cities`;

                }

                else if (
                    Array.isArray(event.cities) &&
                    event.cities.length
                ) {

                    locationLabel =
                        event.cities[0];

                }

                else if (event.location) {

                    locationLabel =
                        event.location;

                }


                /* -----------------------------------------
                   IMAGE
                ----------------------------------------- */

                const image =
                    event.image
                        ? `../assets/images/events/${event.image}`
                        : "";


                const imageMarkup =
                    image

                        ? `
                            <img
                                src="${escapeHTML(image)}"
                                alt="${escapeHTML(
                                    `${event.name || "Liquid Stage event"} event`
                                )}"
                                loading="lazy"
                                decoding="async">
                          `

                        : `
                            <div class="event-story-image-fallback">
                                <span>Liquid Stage Event</span>
                            </div>
                          `;


                /* -----------------------------------------
                   TABLETOP iO
                ----------------------------------------- */

                let tabletopValue = "";


                if (event.tabletopIO === true) {

                    if (
                        event.tabletopIOCoverage &&
                        event.tabletopIOCoverage !== "All stops"
                    ) {

                        const coverage =
                            String(
                                event.tabletopIOCoverage
                            );


                        tabletopValue =
                            coverage
                                .toLowerCase()
                                .includes("stop")

                                ? coverage

                                : `${coverage} stop`;

                    }

                    else {

                        tabletopValue = "Yes";

                    }

                }


                /* -----------------------------------------
                   STATS
                ----------------------------------------- */

                const stats = [

                    makeStat(
                        "Bars Deployed",
                        event.barsDeployed
                    ),

                    makeStat(
                        "Guests Served",
                        event.guestsServed
                    ),

                    makeStat(
                        "Team",
                        event.team
                    ),

                    makeStat(
                        "VIP Tables / Lounges",
                        event.vipTablesLounges
                    ),

                    makeStat(
                        "TableTop iO",
                        tabletopValue
                    ),

                    makeStat(
                        "Scope",
                        event.scope,
                        true
                    )

                ]
                .filter(Boolean)
                .join("");


                /* -----------------------------------------
                   CITY DETAILS
                ----------------------------------------- */

                let citiesDetails = "";


                if (
                    Array.isArray(event.cities) &&
                    event.cities.length > 1
                ) {

                    citiesDetails = `
                        <details class="event-story-cities">

                            <summary>
                                View ${event.cities.length} cities
                            </summary>

                            <p>
                                ${event.cities
                                    .map(city =>
                                        escapeHTML(city)
                                    )
                                    .join(" · ")}
                            </p>

                        </details>
                    `;

                }


                /* -----------------------------------------
                   CARD
                ----------------------------------------- */

                return `
                    <article
                        class="event-story-card"
                        id="${escapeHTML(event.slug || "")}"
                        data-event-type="${escapeHTML(
                            String(event.type || "")
                                .toLowerCase()
                        )}">


                        <div class="event-story-media">

                            ${imageMarkup}

                        </div>


                        <div class="event-story-panel">


                            <div class="event-story-top">


                                <span class="event-story-type">
                                    ${escapeHTML(
                                        event.type || "Event"
                                    )}
                                </span>


                                <span class="event-story-location">

                                    ${escapeHTML(
                                        event.year || ""
                                    )}

                                    ${event.year && locationLabel
                                        ? " · "
                                        : ""
                                    }

                                    ${escapeHTML(
                                        locationLabel
                                    )}

                                </span>


                            </div>


                            <h3 class="h3 event-story-title">
                                ${escapeHTML(
                                    event.name || ""
                                )}
                            </h3>


                            ${
                                stats
                                    ? `
                                        <div class="event-story-stats">
                                            ${stats}
                                        </div>
                                      `
                                    : ""
                            }


                            ${citiesDetails}


                        </div>


                    </article>
                `;


            }).join("");


        /* =================================================
           FILTERING
        ================================================= */

        const cards =
            [
                ...eventsContainer.querySelectorAll(
                    ".event-story-card"
                )
            ];


        const filterButtons =
            filterContainer

                ? [
                    ...filterContainer.querySelectorAll(
                        ".events-filter-button"
                    )
                  ]

                : [];


        const updateCount = () => {

            const visibleCards =
                cards.filter(card =>
                    !card.hidden
                );


            if (resultCount) {

                resultCount.textContent =
                    `${visibleCards.length} ${
                        visibleCards.length === 1
                            ? "Event"
                            : "Events"
                    }`;

            }


            if (emptyState) {

                emptyState.hidden =
                    visibleCards.length !== 0;

            }

        };


        const applyFilter = (filter) => {

            cards.forEach(card => {

                const type =
                    card.dataset.eventType;


                card.hidden =
                    !(
                        filter === "all" ||
                        type === filter
                    );

            });


            filterButtons.forEach(button => {

                const active =
                    button.dataset.eventFilter ===
                    filter;


                button.classList.toggle(
                    "active",
                    active
                );


                button.setAttribute(
                    "aria-pressed",
                    active
                        ? "true"
                        : "false"
                );

            });


            updateCount();

        };


        filterButtons.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    applyFilter(
                        button.dataset.eventFilter
                    );

                }
            );

        });


        updateCount();


    }

    catch (error) {

        console.error(
            "Events page could not load:",
            error
        );


        eventsContainer.innerHTML = `
            <div class="events-empty-state">

                <span class="eyebrow">
                    Portfolio Unavailable
                </span>

                <p class="body-copy">
                    Event information could not be loaded.
                </p>

            </div>
        `;

    }

});