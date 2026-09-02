# Liquid Stage — Detailed Desktop Animation Specification

## Motion principles
1. **Motion reveals meaning.** Every animation must explain scale, transformation, coordination or atmosphere.
2. **Native scrolling remains in control.** No hard scroll-jacking. ScrollTrigger pins only the event-world sequence.
3. **One dominant movement per viewport.** Secondary motion stays below 20% of the visual intensity.
4. **Content is readable before decoration.** Headlines resolve before ambient particles, lines or secondary labels.
5. **Reduced-motion is a complete experience.** All content remains visible and logically ordered without pinned or scrubbed sequences.

## Global timings
- Micro hover: 220–350 ms, `cubic-bezier(.22,1,.36,1)`
- Standard reveal: 700–1000 ms, Power3 Out
- Scene transition: 1200–1800 ms, Power2 InOut
- Scroll-scrubbed camera: 0.8–1.2 seconds of catch-up feel
- Stagger: 80–140 ms between related elements
- Header state change: 450 ms

## 1. Header
**Trigger:** ScrollY > 30 px  
**Animation:** Transparent header becomes 78% obsidian with 18 px backdrop blur; vertical padding reduces by 6 px.  
**Attention effect:** Establishes orientation after the opening scene without competing with the hero.  
**Conversion effect:** Keeps “Plan an Event” visible throughout the journey.

## 2. Hero — first pour to event scale
**Load sequence:**
- 0–300 ms: ambient background resolves from 108% to 105% scale.
- 200–1200 ms: eyebrow, headline, paragraph and CTAs rise 55 px with 120 ms stagger.
- Continuous: warm radial light breathes at extremely low amplitude.

**Scroll sequence:**
- Hero background scales from 108% to 100% and drifts 8% vertically.
- Copy stays stable to avoid motion sickness.
- Scroll cue fades by 25% page progress.

**Narrative purpose:** Begins with tactile hospitality and reveals a larger event world.

## 3. Event-world horizontal sequence
**Desktop breakpoint:** 701 px and above.  
**Pin duration:** 3 viewport widths after the first panel.  
**Track movement:** 0 to -75% X translation, linear scrub.  
**Panel copy:** Enters 80 px upward between panel-left 70% and 40% viewport positions.  
**Background:** Optional production version may use 4–6% counter-parallax and subtle light colour interpolation.

**Continuity object for production:** Keep one bar counter or glass aligned in every scene plate. Concert lighting becomes corporate geometry, then F&B table architecture, then a residential island.

**Narrative purpose:** Makes adaptability feel like one continuous expertise rather than four disconnected service cards.

## 4. About — visible experience / invisible system
**Trigger:** Visual reaches 65% viewport height.  
**Animation:** Five operational labels enter alternately from ±60 px, with 30 px vertical offset and scrubbed opacity.  
**Optional advanced layer:** Use a depth-map or WebGL plane to separate foreground glassware, bartender, guest layer and venue background by 2–8 px according to pointer position.

**Narrative purpose:** Shifts emotion from atmosphere to confidence by exposing planning, manpower, inventory, flow and reporting.

## 5. TableTop iO command view
**Entry:** Dashboard moves 100 px from the right, rotates from -18° Y to -8° Y and fades in over 1.4 seconds.  
**Nodes:** Pop from scale 0 in 80 ms intervals.  
**Paths:** In production, draw from central store to each zone using SVG `stroke-dashoffset` over 900 ms.  
**Counters:** Animate once when the section enters at 85% viewport.  
**Live state:** Node pulse repeats every 2 seconds, with no more than five simultaneous pulses.

**Narrative purpose:** Converts an abstract software claim into a spatial operating system.

## 6. Service cards
**Entry:** Cards rise 70 px with a 120 ms column stagger.  
**Hover:** Image scales 1.00 to 1.06 over 800 ms; saturation increases from 75% to 100%; card rises 8 px.  
**Pointer detail:** CTA arrow may move 4 px diagonally, but body copy stays still.

**Narrative purpose:** A slow photographic response signals premium quality while preserving clear navigation.

## 7. Process timeline
**Layout:** Intro remains sticky at 128 px from the top; stages scroll naturally.  
**Stage reveal:** Each step moves 60 px right-to-left and fades from 0 to 1 between 82% and 55% viewport positions.  
**Advanced production option:** A floor-plan SVG progressively draws behind the stages and transforms into a rendered event on “Execute”.

**Narrative purpose:** Turns operational complexity into a calm, repeatable sequence.

## 8. Call-back form
**Entry:** Form and headline enter independently to preserve reading order.  
**Field focus:** Underline transitions to Liquid Gold in 220 ms.  
**Event-type response:** Production version can crossfade the section background over 600 ms based on event type, never reflowing the form.  
**Submit confirmation:** Form does not leave the page; a bordered “Brief received” state appears. A production version may animate the brief into a coaster stamp.

**Narrative purpose:** Personalisation increases emotional ownership while the stable form reduces abandonment.

## 9. Testimonials
**Transition:** Current quote fades 0–1 while moving 18 px; new quote uses the reverse direction.  
**Duration:** 500 ms.  
**No autoplay:** Manual controls preserve reading time and accessibility.

## 10. Recent events
**Entry:** Cards rise 45 px with 60 ms stagger.  
**Hover production option:** Replace still with a 3–5 second muted loop after 250 ms hover intent. Stop and reset on pointer leave.  
**Performance:** Only preload the first event loop; lazy-load all others.

## 11. Inner service pages
- Hero background follows the same 108% to 100% camera settle.
- Statistics count once.
- Offering tiles reveal in row order.
- Awards enter as physical plaques, not spinning 3D objects; maximum 4° perspective shift.
- Specialisation panels use image scale and text elevation only.

## 12. Page transitions — production enhancement
**Recommended transition:** A radial spotlight expands from the clicked CTA coordinates to cover the viewport in 450 ms, route changes at full coverage, then contracts over 550 ms.  
**Fallback:** Standard navigation when View Transitions API is unsupported.  
**Do not delay navigation:** Maximum perceived delay before route change is 450 ms.

## Responsive and accessibility behaviour
- At 700 px and below, horizontal scenes become stacked vertical sections.
- Remove pointer parallax, pinned camera sequences and persistent progress glass.
- Respect `prefers-reduced-motion: reduce`; all transformations resolve instantly and the world sequence becomes normal document flow.
- Never communicate essential information only through colour, motion or hover.
- Keep keyboard focus visible and preserve native tab order.

## Performance budget
- Initial page transfer target: under 2.5 MB after replacing demo imagery.
- Hero image: AVIF/WebP, 1600–2200 px desktop, under 450 KB.
- Below-fold media: lazy-loaded.
- Muted hover loops: under 2 MB each, no simultaneous playback.
- GSAP animations: transform and opacity only where possible.
- Avoid more than 12 actively animated DOM nodes in one viewport.
- Pause intersection-based loops when offscreen.

## Content and data verification before launch
- Replace “5L+” and every operating figure with formally approved claims.
- Add verified awards, client quotes and event names.
- Confirm privacy permissions for private-party imagery.
- Connect the form to the selected backend and add consent/privacy text.
