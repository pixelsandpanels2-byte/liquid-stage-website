# Liquid Stage — Cinematic Website Prototype

## Open the website
Open `index.html` in a browser. For the most reliable local experience, run a local server from this folder:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Included pages
- Homepage
- Services overview
- Concerts detail
- Corporate Events detail
- F&B detail
- House Parties detail
- About page
- Sample event case study
- Visual moodboard / creative direction page
- Detailed desktop animation specification

## Production notes
- Demo photography is loaded from Unsplash and should be replaced with licensed Liquid Stage imagery before launch.
- The visual system follows the supplied brand palette. The prototype uses an Oswald fallback for the Cabinet Grotesk display direction; install and self-host the licensed Cabinet Grotesk files in production.
- Forms are front-end demonstrations. Connect them to the chosen CRM, email service or backend endpoint.
- Awards, event figures, testimonials and case studies are placeholders until verified by Liquid Stage.
- GSAP ScrollTrigger is loaded from a CDN for progressive enhancement. The site remains readable without it.
