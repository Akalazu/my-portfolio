/* ==========================================================================
   Akalazu David — portfolio interactions (GSAP + ScrollTrigger + SplitText + Lenis)
   ========================================================================== */

(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));

  const preloader = $(".preloader");
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const hasGsap = !!(window.gsap && window.ScrollTrigger && window.SplitText);

  if (window.lucide) lucide.createIcons();
  $$(".year").forEach((el) => (el.textContent = new Date().getFullYear()));

  let lenis = null;

  /* ---------------------------------------------------------------------
     Pieces that work with or without GSAP
     --------------------------------------------------------------------- */

  // Role tabs in the hero card
  const roleTabs = $$(".hire-card .role-tab");
  const rolePanels = $$(".hire-card .role-panel");
  let currentRole = 0;

  function showRole(index) {
    if (index === currentRole) return;
    const from = rolePanels[currentRole];
    const to = rolePanels[index];
    roleTabs.forEach((t, i) => {
      t.classList.toggle("is-active", i === index);
      t.setAttribute("aria-selected", i === index);
    });
    currentRole = index;

    if (hasGsap && !reduceMotion) {
      gsap.killTweensOf([from, to, ...to.children]);
      gsap.to(from, {
        autoAlpha: 0,
        y: -12,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => from.classList.remove("is-active"),
      });
      to.classList.add("is-active");
      gsap.fromTo(to, { autoAlpha: 0, y: 0 }, { autoAlpha: 1, duration: 0.01, delay: 0.2 });
      gsap.fromTo(
        to.children,
        { y: 16, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.55, stagger: 0.05, ease: "power3.out", delay: 0.2 }
      );
    } else {
      from.classList.remove("is-active");
      to.classList.add("is-active");
    }
  }

  roleTabs.forEach((tab, i) => {
    tab.addEventListener("click", () => showRole(i));
    tab.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const next = (i + (e.key === "ArrowRight" ? 1 : -1) + roleTabs.length) % roleTabs.length;
      roleTabs[next].focus();
      showRole(next);
    });
  });

  // Topic radios in the contact form
  const form = $(".form-card");
  const topicTabs = $$(".form-card .topic-select label");
  function syncTopics() {
    topicTabs.forEach((t) => {
      const input = t.querySelector("input");
      t.classList.toggle("is-active", input.checked);
      if (input.checked) $("#f-msg").placeholder = input.dataset.hint;
    });
  }
  topicTabs.forEach((t) => t.querySelector("input").addEventListener("change", syncTopics));

  // Contact form → Formspree via fetch (falls back to a normal POST without JS)
  if (form) {
    const status = $(".form-status", form);
    const btn = $("button[type=submit]", form);
    const label = $(".btn__label", btn);

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      status.className = "form-status";
      status.textContent = "";
      btn.disabled = true;
      label.textContent = "Sending…";

      try {
        const res = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });
        if (res.ok) {
          form.reset();
          syncTopics();
          status.classList.add("is-ok");
          status.textContent = "Thanks! Your message is on its way. I'll get back to you soon.";
          if (hasGsap) gsap.from(status, { y: 10, autoAlpha: 0, duration: 0.5, ease: "power3.out" });
        } else {
          const data = await res.json().catch(() => ({}));
          throw new Error(
            (data.errors && data.errors.map((x) => x.message).join(", ")) || "Something went wrong."
          );
        }
      } catch (err) {
        status.classList.add("is-error");
        status.textContent = `${err.message} You can also email akalazuudochukwu@gmail.com.`;
      } finally {
        btn.disabled = false;
        label.textContent = "Send message";
      }
    });
  }

  // Mobile menu
  const burger = $(".burger");
  const menu = $(".menu");
  let menuOpen = false;

  function setMenu(open) {
    if (open === menuOpen) return;
    menuOpen = open;
    document.body.classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", open);
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.setAttribute("aria-hidden", !open);

    if (lenis) open ? lenis.stop() : lenis.start();

    if (hasGsap && !reduceMotion) {
      gsap.killTweensOf([menu, ".menu__links a", ".menu__foot"]);
      if (open) {
        gsap.set(menu, { visibility: "visible" });
        gsap.to(menu, { clipPath: "inset(0 0 0% 0)", duration: 0.8, ease: "expo.inOut" });
        gsap.fromTo(
          ".menu__links a",
          { yPercent: 60, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 0.8, stagger: 0.07, ease: "power4.out", delay: 0.3 }
        );
        gsap.fromTo(".menu__foot", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, delay: 0.6 });
      } else {
        gsap.to(menu, {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.6,
          ease: "expo.inOut",
          onComplete: () => gsap.set(menu, { visibility: "hidden" }),
        });
      }
    } else {
      menu.style.visibility = open ? "visible" : "hidden";
      menu.style.clipPath = open ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)";
    }
  }

  burger.addEventListener("click", () => setMenu(!menuOpen));
  addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));
  matchMedia("(min-width: 1101px)").addEventListener("change", (e) => e.matches && setMenu(false));

  // Smooth in-page anchors
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href");
    const target = id === "#top" || id === "#" ? 0 : $(id);
    if (target === null) return;
    e.preventDefault();
    setMenu(false);
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) });
    } else if (target === 0) {
      scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    } else {
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    }
  });

  /* ---------------------------------------------------------------------
     No GSAP (CDN blocked) or reduced motion: static, fully readable page
     --------------------------------------------------------------------- */

  if (!hasGsap || reduceMotion) {
    if (preloader) preloader.remove();
    if (hasGsap) {
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.create({
        start: 40,
        end: "max",
        onToggle: (self) => $(".nav").classList.toggle("is-scrolled", self.isActive),
      });
    }
    return;
  }

  /* ---------------------------------------------------------------------
     Full motion experience
     --------------------------------------------------------------------- */

  gsap.registerPlugin(ScrollTrigger, SplitText);
  gsap.defaults({ ease: "power3.out" });

  // Page transitions: the curtain rises, then we navigate
  const curtain = $(".curtain");
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-transition]");
    if (!a || !curtain || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    setMenu(false);
    gsap.to(curtain, { clipPath: "inset(0% 0 0 0)", duration: 0.8, ease: "expo.inOut", onComplete: () => (location.href = a.href) });
  });
  // Back/forward cache can restore the page with the curtain still down
  addEventListener("pageshow", (e) => e.persisted && curtain && gsap.set(curtain, { clipPath: "inset(100% 0 0 0)" }));

  // Lenis smooth scroll driven by GSAP's ticker
  if (window.Lenis) {
    lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
  }

  // Keep the preloader name hidden until fonts are in
  gsap.set(".preloader__name span, .preloader__name b", { yPercent: 110 });

  const fontsReady = Promise.race([
    document.fonts ? document.fonts.ready : Promise.resolve(),
    new Promise((r) => setTimeout(r, 2500)),
  ]);

  fontsReady.then(() => {
    try {
      init();
    } catch (err) {
      console.error(err);
      if (preloader) preloader.remove();
      if (lenis) lenis.start();
    }
  });

  function init() {
    const split = (el, vars) => SplitText.create(el, { wordsClass: "w", charsClass: "c", ...vars });

    /* ---------- Preloader → hero intro ---------- */

    const num = $(".preloader__num");
    const counter = { v: 0 };
    const intro = gsap.timeline();

    const seen = document.documentElement.classList.contains("seen");

    if (seen) {
      // Returning visitor (e.g. back from a case study): skip the loader, just wipe the curtain away
      intro
        .set(".preloader__inner", { autoAlpha: 0 })
        .to(".preloader", { clipPath: "inset(0 0 100% 0)", duration: 0.9, ease: "expo.inOut", delay: 0.1 });
    } else
      intro
      .to(".preloader__name span, .preloader__name b", {
        yPercent: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power4.out",
      })
      .to(".preloader__bar i", { scaleX: 1, duration: 1.4, ease: "power2.inOut" }, 0.2)
      .to(
        counter,
        {
          v: 100,
          duration: 1.4,
          ease: "power2.inOut",
          onUpdate: () => (num.textContent = Math.round(counter.v)),
        },
        0.2
      )
      .to(".preloader__inner", { yPercent: -40, autoAlpha: 0, duration: 0.5, ease: "power2.in" })
      .to(".preloader", { clipPath: "inset(0 0 100% 0)", duration: 1, ease: "expo.inOut" }, "-=0.1");

    intro
      .add(() => {
        preloader.remove();
        if (lenis) lenis.start();
        try {
          sessionStorage.setItem("intro", "1");
        } catch (e) {}
        // Arriving from a case study (…/#work): jump to that section once the layout is final
        if (location.hash && location.hash !== "#top") {
          const target = $(location.hash);
          if (target) setTimeout(() => (lenis ? lenis.scrollTo(target, { immediate: true }) : target.scrollIntoView()), 150);
        }
      })
      .add(heroIntro(), "-=0.6");

    function heroIntro() {
      const title = split(".hero__title .line", { type: "words,chars" });
      const tl = gsap.timeline({ defaults: { ease: "power4.out" }, onComplete: heroInteractive });

      tl.from(".nav", { yPercent: -100, autoAlpha: 0, duration: 1 }, 0)
        .from(title.chars, { yPercent: 115, rotation: 8, duration: 1.1, stagger: 0.018 }, 0.05)
        .from(".hero__badge", { y: 20, autoAlpha: 0, duration: 0.8 }, 0.15)
        .from(".hero__lead", { y: 30, autoAlpha: 0, duration: 1 }, 0.55)
        .from(".mini-card", { y: 40, autoAlpha: 0, duration: 0.9, stagger: 0.08 }, 0.7)
        .from(
          ".hire-card",
          {
            y: 90,
            rotationX: -16,
            autoAlpha: 0,
            transformPerspective: 1200,
            transformOrigin: "50% 100%",
            duration: 1.4,
          },
          0.35
        )
        .from(".hire-card .role-tab", { y: 18, autoAlpha: 0, stagger: 0.06, duration: 0.7 }, 0.85)
        .from(".hero__glow", { scale: 0.6, autoAlpha: 0, duration: 2, ease: "power2.out" }, 0)
        .from(".scroll-cue", { autoAlpha: 0, y: 10, duration: 0.8 }, 1.2);

      return tl;
    }

    // Card tilt + glow that follow the mouse in the hero
    function heroInteractive() {
      if (!finePointer) return;
      const hero = $(".hero");
      const card = $(".hire-card");
      const glow = $(".hero__glow");
      gsap.set(card, { transformPerspective: 1200 });
      const rx = gsap.quickTo(card, "rotationX", { duration: 0.8, ease: "power3" });
      const ry = gsap.quickTo(card, "rotationY", { duration: 0.8, ease: "power3" });
      const gx = gsap.quickTo(glow, "x", { duration: 1.6, ease: "power3" });
      const gy = gsap.quickTo(glow, "y", { duration: 1.6, ease: "power3" });

      hero.addEventListener("mousemove", (e) => {
        const nx = e.clientX / innerWidth - 0.5;
        const ny = e.clientY / innerHeight - 0.5;
        gx(nx * 160);
        gy(ny * 160);
        const r = card.getBoundingClientRect();
        const cx = (e.clientX - (r.left + r.width / 2)) / innerWidth;
        const cy = (e.clientY - (r.top + r.height / 2)) / innerHeight;
        ry(gsap.utils.clamp(-7, 7, cx * 14));
        rx(gsap.utils.clamp(-7, 7, -cy * 14));
      });
      hero.addEventListener("mouseleave", () => {
        rx(0);
        ry(0);
      });
    }

    // Hero content drifts up and fades as you scroll away
    gsap.to(".hero__grid", {
      yPercent: -8,
      autoAlpha: 0.25,
      ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
    });

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
        const hot = e.target.closest("a, button, label.role-tab, .skill-card, .mini-card, .project");
        cursor.classList.toggle("is-hover", !!hot);
      });

      $$(".magnetic").forEach((el) => {
        const strength = el.classList.contains("btn--block") ? 0.12 : 0.35;
        const mx = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
        const my = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });
        el.addEventListener("mousemove", (e) => {
          const r = el.getBoundingClientRect();
          mx((e.clientX - (r.left + r.width / 2)) * strength);
          my((e.clientY - (r.top + r.height / 2)) * strength);
        });
        el.addEventListener("mouseleave", () => {
          gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.35)" });
        });
      });
    }

    /* ---------- Global: progress bar, nav state, active link ---------- */

    gsap.to(".progress", {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
    });

    const nav = $(".nav");
    let navHidden = false;
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate(self) {
        const y = self.scroll();
        nav.classList.toggle("is-scrolled", y > 40);
        const hide = self.direction === 1 && y > 500 && !menuOpen;
        if (hide !== navHidden) {
          navHidden = hide;
          gsap.to(nav, { yPercent: hide ? -110 : 0, duration: 0.5, ease: "power3.out", overwrite: "auto" });
        }
      },
    });

    const navLinks = $$(".nav__links a");
    navLinks.forEach((link) => {
      const section = $(link.getAttribute("href"));
      if (!section) return;
      ScrollTrigger.create({
        trigger: section,
        start: "top 50%",
        end: "bottom 50%",
        onToggle: (self) => self.isActive && navLinks.forEach((l) => l.classList.toggle("is-active", l === link)),
        onLeaveBack: () => link === navLinks[0] && link.classList.remove("is-active"),
      });
    });

    /* ---------- Reusable reveals ---------- */

    function revealTitle(el) {
      const s = split(el, { type: "words,chars" });
      gsap.from(s.chars, {
        yPercent: 115,
        rotation: 6,
        duration: 1,
        ease: "power4.out",
        stagger: 0.022,
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
    }

    function revealUp(targets, trigger, vars = {}) {
      gsap.from(targets, {
        y: 50,
        autoAlpha: 0,
        duration: 1,
        stagger: 0.1,
        scrollTrigger: { trigger: trigger || targets, start: "top 85%" },
        ...vars,
      });
    }

    function countUp(el, trigger) {
      const end = parseFloat(el.dataset.count);
      const dec = parseInt(el.dataset.decimals || "0", 10);
      const o = { v: 0 };
      el.textContent = (0).toFixed(dec);
      gsap.to(o, {
        v: end,
        duration: 2.2,
        ease: "power3.out",
        scrollTrigger: { trigger: trigger || el, start: "top 88%" },
        onUpdate: () => (el.textContent = o.v.toFixed(dec)),
      });
    }

    $$(".eyebrow").forEach((el) => {
      if (el.closest(".hero")) return;
      gsap.from(el, {
        x: -20,
        autoAlpha: 0,
        duration: 0.8,
        scrollTrigger: { trigger: el, start: "top 90%" },
      });
    });

    /* ---------- Marquee (speed + direction follow scroll velocity) ---------- */

    const loops = $$(".marquee__row").map((row, i) => {
      const track = $(".marquee__track", row);
      for (let n = 0; n < 2; n++) {
        const clone = track.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        row.appendChild(clone);
      }
      const tracks = $$(".marquee__track", row);
      return i % 2 === 0
        ? gsap.to(tracks, { xPercent: -100, ease: "none", duration: 30, repeat: -1 })
        : gsap.fromTo(tracks, { xPercent: -100 }, { xPercent: 0, ease: "none", duration: 34, repeat: -1 });
    });
    loops.forEach((t) => t.totalTime(t.duration() * 200));

    let speed = 1;
    let targetSpeed = 1;
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate(self) {
        const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 220, 6);
        targetSpeed = self.direction * boost;
      },
    });
    gsap.ticker.add(() => {
      const base = targetSpeed < 0 ? -1 : 1;
      targetSpeed += (base - targetSpeed) * 0.04;
      speed += (targetSpeed - speed) * 0.1;
      loops.forEach((t) => t.timeScale(speed));
    });

    gsap.from(".marquee", {
      clipPath: "inset(0 50% 0 50%)",
      duration: 1.4,
      ease: "expo.inOut",
      scrollTrigger: { trigger: ".marquee", start: "top 92%" },
    });

    /* ---------- Stats ---------- */

    revealUp(".stat", ".stats", { stagger: 0.12 });
    $$(".stats [data-count]").forEach((el) => countUp(el, ".stats"));

    /* ---------- About ---------- */

    gsap.fromTo(
      ".portrait",
      { clipPath: "inset(100% 0% 0% 0% round 28px)" },
      {
        clipPath: "inset(0% 0% 0% 0% round 28px)",
        duration: 1.6,
        ease: "expo.out",
        scrollTrigger: { trigger: ".about", start: "top 70%" },
      }
    );
    gsap.fromTo(
      ".portrait img",
      { yPercent: -14, scale: 1.15 },
      {
        yPercent: 0,
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: ".portrait", start: "top bottom", end: "bottom top", scrub: true },
      }
    );
    gsap.from(".portrait__caption > *, .portrait__tag", {
      y: 20,
      autoAlpha: 0,
      duration: 0.9,
      stagger: 0.1,
      ease: "power3.out",
      delay: 0.9,
      scrollTrigger: { trigger: ".about", start: "top 70%" },
    });

    const about = split(".reveal-text", { type: "words" });
    gsap.fromTo(
      about.words,
      { opacity: 0.12 },
      {
        opacity: 1,
        ease: "none",
        stagger: 0.1,
        scrollTrigger: { trigger: ".reveal-text", start: "top 78%", end: "bottom 50%", scrub: true },
      }
    );
    revealUp(".facts div", ".facts", { stagger: 0.08, y: 30 });

    /* ---------- Skills ---------- */

    revealTitle($(".skills .split-title"));
    gsap.set(".skill-card", { transformPerspective: 1000 });
    ScrollTrigger.batch(".skill-card", {
      start: "top 88%",
      once: true,
      onEnter: (batch) =>
        gsap.from(batch, {
          y: 80,
          rotationX: -20,
          autoAlpha: 0,
          duration: 1.1,
          stagger: 0.1,
          ease: "power4.out",
        }),
    });

    $$(".skill-card").forEach((card) => {
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

    /* ---------- Experience ---------- */

    revealTitle($(".experience .split-title"));
    gsap.to(".timeline__line i", {
      scaleY: 1,
      ease: "none",
      scrollTrigger: { trigger: ".timeline", start: "top 65%", end: "bottom 65%", scrub: 0.6 },
    });
    $$(".job").forEach((job) => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: job, start: "top 82%" } });
      tl.from($(".job__dot", job), { scale: 0, duration: 0.6, ease: "back.out(3)" })
        .from($(".job__card", job), { x: 80, autoAlpha: 0, duration: 1, ease: "power4.out" }, 0.05)
        .from($$(".metrics div, .chips span", job), { y: 16, autoAlpha: 0, stagger: 0.05, duration: 0.6 }, 0.4);
    });

    /* ---------- Work: pinned horizontal scroll on desktop ---------- */

    const work = $(".work");
    const track = $(".work__track");
    const projects = $$(".project");
    revealTitle($(".work .split-title"));

    function animateMock(project, scrollTrigger) {
      const tl = gsap.timeline({ scrollTrigger });
      tl.from($(".project__visual", project), { y: 40, rotation: -2, autoAlpha: 0, duration: 1, ease: "power4.out" })
        .from($$(".shot img", project), { scale: 1.3, duration: 1.6, ease: "power3.out" }, 0)
        .from($$(".mock__chart i", project), { scaleY: 0, duration: 0.9, stagger: 0.06, ease: "power4.out" }, 0.3)
        .from($$(".mock__tiles div, .mock__roles span, .mock__filters span", project), { y: 14, autoAlpha: 0, stagger: 0.04, duration: 0.5 }, 0.3)
        .from($$(".mock__videos .v", project), { scale: 0.6, autoAlpha: 0, stagger: { each: 0.06, grid: "auto", from: "start" }, duration: 0.7, ease: "back.out(1.6)" }, 0.3)
        .from($$(".mock__news > div", project), { x: -24, autoAlpha: 0, stagger: 0.1, duration: 0.6 }, 0.3)
        .from($$(".mock__news p i", project), { scaleX: 0, stagger: 0.05, duration: 0.6 }, 0.5)
        .from($$(".mock__live, .mock__kpis span", project), { scale: 0.7, autoAlpha: 0, stagger: 0.08, duration: 0.6, ease: "back.out(2)" }, 0.6)
        .from($(".project__info", project).children, { y: 30, autoAlpha: 0, stagger: 0.07, duration: 0.8 }, 0.15);
      return tl;
    }

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      work.classList.add("is-horizontal");
      const distance = () => Math.max(0, track.scrollWidth - innerWidth);

      const scroller = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: work,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          refreshPriority: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      projects.forEach((p, i) => {
        if (i === 0) {
          animateMock(p, { trigger: work, start: "top 55%" });
          return;
        }
        animateMock(p, { trigger: p, containerAnimation: scroller, start: "left 80%" });
        gsap.from(p, {
          scale: 0.9,
          rotation: 2,
          ease: "none",
          scrollTrigger: { trigger: p, containerAnimation: scroller, start: "left right", end: "left 45%", scrub: true },
        });
      });

      return () => work.classList.remove("is-horizontal");
    });

    mm.add("(max-width: 1023px)", () => {
      projects.forEach((p) => {
        gsap.from(p, { y: 60, autoAlpha: 0, duration: 1, scrollTrigger: { trigger: p, start: "top 85%" } });
        animateMock(p, { trigger: p, start: "top 75%" });
      });
    });

    /* ---------- Education ---------- */

    gsap.from(".edu-card", {
      y: 80,
      autoAlpha: 0,
      duration: 1.2,
      ease: "power4.out",
      scrollTrigger: { trigger: ".education", start: "top 75%" },
    });
    gsap.fromTo(
      ".edu-ring .fill",
      { strokeDasharray: "0 1" },
      {
        strokeDasharray: "0.95 1",
        duration: 2.4,
        ease: "power3.inOut",
        scrollTrigger: { trigger: ".edu-card", start: "top 70%" },
      }
    );
    $$(".edu-ring [data-count]").forEach((el) => countUp(el, ".edu-card"));
    revealUp(".edu-copy h2, .edu-school", ".edu-card", { y: 30, delay: 0.2 });
    gsap.from(".honors li", {
      x: -30,
      autoAlpha: 0,
      duration: 0.8,
      stagger: 0.1,
      delay: 0.4,
      scrollTrigger: { trigger: ".edu-card", start: "top 70%" },
    });

    /* ---------- Contact ---------- */

    revealTitle($(".contact__title"));
    revealUp(".contact__lead, .contact__list li", ".contact__copy", { y: 30, stagger: 0.08, delay: 0.3 });
    gsap.from(".social", {
      scale: 0,
      autoAlpha: 0,
      duration: 0.7,
      stagger: 0.08,
      ease: "back.out(2.2)",
      scrollTrigger: { trigger: ".socials", start: "top 92%" },
    });
    gsap.from(".form-card", {
      y: 40,
      autoAlpha: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: { trigger: ".form-card", start: "top 85%" },
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
    revealUp(".footer__row > *", ".footer__row", { y: 20, stagger: 0.08, scrollTrigger: { trigger: ".footer__row", start: "top 98%" } });

    // Recalculate once images have their final size
    addEventListener("load", () => ScrollTrigger.refresh());
  }
})();
