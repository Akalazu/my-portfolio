/* ==========================================================================
   Case-study pages — GSAP + ScrollTrigger + SplitText + Lenis
   (self-contained; the homepage uses site.js)
   ========================================================================== */

(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));

  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const hasGsap = !!(window.gsap && window.ScrollTrigger && window.SplitText);
  const curtain = $(".curtain");
  const nav = $(".nav");

  if (window.lucide) lucide.createIcons();
  $$(".year").forEach((el) => (el.textContent = new Date().getFullYear()));

  /* ---------- Static fallback: no GSAP, or the visitor prefers reduced motion ---------- */

  if (!hasGsap || reduceMotion) {
    if (curtain) curtain.remove();
    const onScroll = () => nav.classList.toggle("is-scrolled", scrollY > 40);
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    initMenu(null);
    return;
  }

  gsap.registerPlugin(ScrollTrigger, SplitText);
  gsap.defaults({ ease: "power3.out" });

  // Take the curtain over from the CSS fail-safe
  if (curtain) {
    curtain.style.animation = "none";
    gsap.set(curtain, { clipPath: "inset(0% 0 0 0)" });
  }

  // Smooth scroll
  let lenis = null;
  if (window.Lenis) {
    lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
  }

  const menu = initMenu(lenis);

  /* ---------- Page transitions ---------- */

  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-transition]");
    if (!a || !curtain || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    menu.close();
    gsap.set(curtain, { clipPath: "inset(100% 0 0 0)" });
    gsap.to(curtain, {
      clipPath: "inset(0% 0 0 0)",
      duration: 0.8,
      ease: "expo.inOut",
      onComplete: () => (location.href = a.href),
    });
  });
  addEventListener("pageshow", (e) => e.persisted && curtain && gsap.set(curtain, { clipPath: "inset(100% 0 0 0)" }));

  // In-page "back to top"
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href="#top"]');
    if (!a) return;
    e.preventDefault();
    menu.close();
    lenis ? lenis.scrollTo(0, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) }) : scrollTo({ top: 0, behavior: "smooth" });
  });

  const fontsReady = Promise.race([
    document.fonts ? document.fonts.ready : Promise.resolve(),
    new Promise((r) => setTimeout(r, 2000)),
  ]);

  fontsReady.then(() => {
    try {
      init();
    } catch (err) {
      console.error(err);
      if (curtain) gsap.set(curtain, { clipPath: "inset(100% 0 0 0)" });
      if (lenis) lenis.start();
    }
  });

  function init() {
    const split = (el, vars) => SplitText.create(el, { wordsClass: "w", charsClass: "c", ...vars });

    /* ---------- Intro: curtain wipes away, header builds in ---------- */

    const title = split(".pj-title", { type: "words,chars" });
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.to(curtain, { clipPath: "inset(0% 0 100% 0)", duration: 1.1, ease: "expo.inOut" })
      .set(curtain, { clipPath: "inset(100% 0 0 0)" })
      .add(() => lenis && lenis.start())
      .from(".nav", { yPercent: -100, autoAlpha: 0, duration: 0.9 }, 0.5)
      .from(".pj-back", { x: -30, autoAlpha: 0, duration: 0.8 }, 0.55)
      .from(".pj-hero .eyebrow", { x: -20, autoAlpha: 0, duration: 0.8 }, 0.65)
      .from(title.chars, { yPercent: 115, rotation: 7, duration: 1.2, stagger: 0.02 }, 0.55)
      .from(".pj-kicker", { y: 30, autoAlpha: 0, duration: 0.9 }, 0.95)
      .from(".pj-lead", { y: 30, autoAlpha: 0, duration: 0.9 }, 1.05)
      .from(".pj-links .pill", { y: 20, autoAlpha: 0, duration: 0.8, stagger: 0.08 }, 1.15)
      .from(".pj-meta div", { y: 24, autoAlpha: 0, duration: 0.8, stagger: 0.08 }, 1.15)
      .from(".pj-frame", { y: 120, autoAlpha: 0, duration: 1.4 }, 1.1);

    /* ---------- Cursor + magnetic buttons ---------- */

    if (finePointer) {
      const cursor = $(".cursor");
      const dx = gsap.quickTo(".cursor__dot", "x", { duration: 0.12, ease: "power3" });
      const dy = gsap.quickTo(".cursor__dot", "y", { duration: 0.12, ease: "power3" });
      const rx = gsap.quickTo(".cursor__ring", "x", { duration: 0.5, ease: "power3" });
      const ry = gsap.quickTo(".cursor__ring", "y", { duration: 0.5, ease: "power3" });
      gsap.set(cursor, { autoAlpha: 0 });

      addEventListener("mousemove", (e) => {
        gsap.to(cursor, { autoAlpha: 1, duration: 0.3, overwrite: "auto" });
        dx(e.clientX);
        dy(e.clientY);
        rx(e.clientX);
        ry(e.clientY);
      });
      document.addEventListener("mouseleave", () => gsap.to(cursor, { autoAlpha: 0, duration: 0.3 }));
      document.addEventListener("mouseover", (e) => {
        cursor.classList.toggle("is-hover", !!e.target.closest("a, button, .skill-card, .mini-card"));
      });

      $$(".magnetic").forEach((el) => {
        const strength = el.classList.contains("btn") ? 0.2 : 0.35;
        const mx = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
        const my = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });
        el.addEventListener("mousemove", (e) => {
          const r = el.getBoundingClientRect();
          mx((e.clientX - (r.left + r.width / 2)) * strength);
          my((e.clientY - (r.top + r.height / 2)) * strength);
        });
        el.addEventListener("mouseleave", () => gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.35)" }));
      });
    }

    /* ---------- Progress bar + nav ---------- */

    gsap.to(".progress", { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });

    let navHidden = false;
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate(self) {
        const y = self.scroll();
        nav.classList.toggle("is-scrolled", y > 40);
        const hide = self.direction === 1 && y > 500 && !menu.isOpen();
        if (hide !== navHidden) {
          navHidden = hide;
          gsap.to(nav, { yPercent: hide ? -110 : 0, duration: 0.5, ease: "power3.out", overwrite: "auto" });
        }
      },
    });

    /* ---------- Reusable reveals ---------- */

    const revealTitle = (el) => {
      const s = split(el, { type: "words,chars" });
      gsap.from(s.chars, {
        yPercent: 115,
        rotation: 6,
        duration: 1,
        ease: "power4.out",
        stagger: 0.022,
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
    };

    const countUp = (el, trigger) => {
      const end = parseFloat(el.dataset.count);
      const dec = parseInt(el.dataset.decimals || "0", 10);
      const o = { v: 0 };
      el.textContent = (0).toFixed(dec);
      gsap.to(o, {
        v: end,
        duration: 2.2,
        ease: "power3.out",
        scrollTrigger: { trigger, start: "top 88%" },
        onUpdate: () => (el.textContent = o.v.toFixed(dec)),
      });
    };

    $$(".eyebrow").forEach((el) => {
      if (el.closest(".pj-hero")) return;
      gsap.from(el, { x: -20, autoAlpha: 0, duration: 0.8, scrollTrigger: { trigger: el, start: "top 90%" } });
    });

    /* ---------- Hero visual: tilts flat as it scrolls into view ---------- */

    gsap.set(".pj-frame", { transformPerspective: 1600 });
    gsap.fromTo(
      ".pj-frame",
      { rotationX: 12, scale: 0.9 },
      {
        rotationX: 0,
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: ".pj-visual", start: "top 90%", end: "top 25%", scrub: true },
      }
    );
    if ($(".pj-frame img")) {
      gsap.fromTo(
        ".pj-frame img",
        { scale: 1.12, yPercent: -3 },
        {
          scale: 1,
          yPercent: 0,
          ease: "none",
          scrollTrigger: { trigger: ".pj-visual", start: "top 85%", end: "bottom 30%", scrub: true },
        }
      );
    }
    gsap.from(".pj-glow", {
      autoAlpha: 0,
      scale: 0.7,
      duration: 2,
      scrollTrigger: { trigger: ".pj-visual", start: "top 85%" },
    });
    // Illustrated interfaces (no screenshot) animate in like the homepage cards
    gsap
      .timeline({ scrollTrigger: { trigger: ".pj-visual", start: "top 70%" } })
      .from($$(".pj-frame .mock__filters span"), { y: 14, autoAlpha: 0, stagger: 0.05, duration: 0.5 })
      .from($$(".pj-frame .mock__videos .v"), { scale: 0.6, autoAlpha: 0, stagger: 0.07, duration: 0.7, ease: "back.out(1.6)" }, 0.1);

    /* ---------- Results ---------- */

    gsap.from(".pj-stat", {
      y: 50,
      autoAlpha: 0,
      duration: 1,
      stagger: 0.1,
      scrollTrigger: { trigger: ".pj-results", start: "top 85%" },
    });
    $$(".pj-results [data-count]").forEach((el) => countUp(el, ".pj-results"));

    /* ---------- Story blocks ---------- */

    $$(".pj-block").forEach((block) => {
      const h2 = $("h2", block);
      const lines = SplitText.create(h2, { type: "lines", mask: "lines", linesClass: "ln" });
      gsap.from(lines.lines, {
        yPercent: 110,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.1,
        scrollTrigger: { trigger: block, start: "top 80%" },
      });

      const words = split($("p", block), { type: "words" });
      gsap.fromTo(
        words.words,
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: $("p", block), start: "top 85%", end: "bottom 55%", scrub: true },
        }
      );
    });

    /* ---------- Feature cards ---------- */

    gsap.set(".pj-feature", { transformPerspective: 1000 });
    ScrollTrigger.batch(".pj-feature", {
      start: "top 90%",
      once: true,
      onEnter: (batch) =>
        gsap.from(batch, { y: 80, rotationX: -18, autoAlpha: 0, duration: 1.1, stagger: 0.1, ease: "power4.out" }),
    });

    $$(".pj-feature").forEach((card) => {
      const icon = $(".icon-tile", card);
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
      card.addEventListener("mouseenter", () => {
        gsap.fromTo(icon, { rotation: 0 }, { rotation: 360, duration: 0.9, ease: "back.out(1.6)" });
        gsap.to(icon, { backgroundColor: "#2b55e6", color: "#fff", borderColor: "#2b55e6", duration: 0.3 });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(icon, { backgroundColor: "#fff", color: "#2b55e6", borderColor: "#e6e8ee", duration: 0.3 });
      });
    });

    $$(".pj-minis").forEach((grid) => {
      gsap.from($$(".mini-card", grid), {
        y: 40,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.08,
        scrollTrigger: { trigger: grid, start: "top 88%" },
      });
    });

    /* ---------- Gallery ---------- */

    $$(".pj-shot").forEach((shot) => {
      gsap.fromTo(
        $(".mock", shot),
        { clipPath: "inset(12% 8% 0% 8% round 22px)", y: 60 },
        {
          clipPath: "inset(0% 0% 0% 0% round 22px)",
          y: 0,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: shot, start: "top 80%" },
        }
      );
      gsap.fromTo(
        $("img", shot),
        { scale: 1.15 },
        { scale: 1, ease: "none", scrollTrigger: { trigger: shot, start: "top bottom", end: "bottom top", scrub: true } }
      );
      gsap.from($("figcaption", shot), {
        y: 20,
        autoAlpha: 0,
        duration: 0.8,
        scrollTrigger: { trigger: shot, start: "bottom 90%" },
      });
    });

    /* ---------- Next project + CTA ---------- */

    const nextTitle = split(".pj-next__title", { type: "words,chars" });
    gsap
      .timeline({ scrollTrigger: { trigger: ".pj-next", start: "top 75%" } })
      .from(".pj-next__label", { x: -20, autoAlpha: 0, duration: 0.7 })
      .from(nextTitle.chars, { yPercent: 110, duration: 1.1, ease: "power4.out", stagger: 0.025 }, 0.1)
      .from(".pj-next__kicker", { y: 20, autoAlpha: 0, duration: 0.8 }, 0.5)
      .from(".pj-next__arrow", { scale: 0, rotation: -90, duration: 0.9, ease: "back.out(2)" }, 0.6);

    revealTitle($(".pj-cta .split-title"));
    gsap.from(".pj-cta .btn", {
      y: 30,
      autoAlpha: 0,
      duration: 0.9,
      delay: 0.3,
      scrollTrigger: { trigger: ".pj-cta", start: "top 80%" },
    });

    /* ---------- Footer wordmark ---------- */

    const word = split(".footer__word", { type: "chars" });
    gsap.from(word.chars, {
      yPercent: 110,
      duration: 1.2,
      ease: "power4.out",
      stagger: 0.05,
      scrollTrigger: { trigger: ".footer", start: "top 90%" },
    });
    gsap.from(".footer__row > *", {
      y: 20,
      autoAlpha: 0,
      duration: 0.8,
      stagger: 0.08,
      scrollTrigger: { trigger: ".footer__row", start: "top 98%" },
    });

    addEventListener("load", () => ScrollTrigger.refresh());
  }

  /* ---------- Mobile menu (works with or without GSAP) ---------- */

  function initMenu(lenisInstance) {
    const burger = $(".burger");
    const menuEl = $(".menu");
    let open = false;

    function set(next) {
      if (next === open) return;
      open = next;
      document.body.classList.toggle("menu-open", open);
      burger.setAttribute("aria-expanded", open);
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      menuEl.setAttribute("aria-hidden", !open);
      if (lenisInstance) open ? lenisInstance.stop() : lenisInstance.start();

      if (hasGsap && !reduceMotion) {
        gsap.killTweensOf([menuEl, ".menu__links a", ".menu__foot"]);
        if (open) {
          gsap.set(menuEl, { visibility: "visible" });
          gsap.to(menuEl, { clipPath: "inset(0 0 0% 0)", duration: 0.8, ease: "expo.inOut" });
          gsap.fromTo(
            ".menu__links a",
            { yPercent: 60, autoAlpha: 0 },
            { yPercent: 0, autoAlpha: 1, duration: 0.8, stagger: 0.07, ease: "power4.out", delay: 0.3 }
          );
          gsap.fromTo(".menu__foot", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, delay: 0.6 });
        } else {
          gsap.to(menuEl, {
            clipPath: "inset(0 0 100% 0)",
            duration: 0.6,
            ease: "expo.inOut",
            onComplete: () => gsap.set(menuEl, { visibility: "hidden" }),
          });
        }
      } else {
        menuEl.style.visibility = open ? "visible" : "hidden";
        menuEl.style.clipPath = open ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)";
      }
    }

    burger.addEventListener("click", () => set(!open));
    addEventListener("keydown", (e) => e.key === "Escape" && set(false));
    matchMedia("(min-width: 1101px)").addEventListener("change", (e) => e.matches && set(false));
    return { close: () => set(false), isOpen: () => open };
  }
})();
