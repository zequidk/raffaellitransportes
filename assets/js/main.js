(() => {
  const header = document.querySelector('.site-header');
  const nav = document.getElementById('nav');
  const navToggle = document.querySelector('.nav-toggle');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

  const closeNav = () => {
    if (!header || !navToggle) return;
    header.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Abrir menu');
    document.body.classList.remove('nav-locked');
  };

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeNav();
        return;
      }
      header.classList.add('nav-open');
      navToggle.setAttribute('aria-expanded', 'true');
      navToggle.setAttribute('aria-label', 'Fechar menu');
      document.body.classList.add('nav-locked');
    });
  }

  if (nav) {
    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeNav);
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeNav();
  });

  document.addEventListener('click', (event) => {
    if (header && header.classList.contains('nav-open') && !header.contains(event.target)) {
      closeNav();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1080) closeNav();
  }, { passive: true });

  const onScroll = () => {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 24);
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const navLinks = Array.from(document.querySelectorAll('.nav a[href^="#"]'));
  const linkById = new Map(navLinks.map((link) => [link.getAttribute('href').slice(1), link]));

  if ('IntersectionObserver' in window && linkById.size) {
    const sections = Array.from(document.querySelectorAll('main section[id]'));
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => link.classList.remove('is-active'));
        const active = linkById.get(entry.target.id);
        if (active) active.classList.add('is-active');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach((section) => sectionObserver.observe(section));
  }

  const revealElements = document.querySelectorAll('.reveal');

  if (!reducedMotion.matches && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    revealElements.forEach((element) => revealObserver.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add('is-visible'));
  }

  const numberFormatter = new Intl.NumberFormat('pt-BR');
  const counters = document.querySelectorAll('[data-count]');

  const animateCounter = (element) => {
    const target = Number(element.dataset.count) || 0;
    const prefix = element.dataset.prefix || '';
    const suffix = element.dataset.suffix || '';
    const render = (value) => {
      element.textContent = `${prefix}${numberFormatter.format(value)}${suffix}`;
    };

    if (reducedMotion.matches) {
      render(target);
      return;
    }

    const duration = 1500;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      render(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  if (!reducedMotion.matches && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      });
    }, { threshold: 0.5 });

    counters.forEach((counter) => counterObserver.observe(counter));
  } else {
    counters.forEach((counter) => animateCounter(counter));
  }

  if (finePointer.matches && !reducedMotion.matches) {
    document.querySelectorAll('.tilt').forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        card.style.setProperty('--ry', `${((px - 0.5) * 7).toFixed(2)}deg`);
        card.style.setProperty('--rx', `${((0.5 - py) * 7).toFixed(2)}deg`);
        card.style.setProperty('--gx', `${(px * 100).toFixed(1)}%`);
        card.style.setProperty('--gy', `${(py * 100).toFixed(1)}%`);
        card.classList.add('is-tilting');
      });

      card.addEventListener('pointerleave', () => {
        card.classList.remove('is-tilting');
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      });
    });

    document.querySelectorAll('.btn-magnetic').forEach((button) => {
      button.addEventListener('pointermove', (event) => {
        const rect = button.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        button.style.setProperty('--mx', `${(px * 10).toFixed(1)}px`);
        button.style.setProperty('--my', `${(py * 8).toFixed(1)}px`);
      });

      button.addEventListener('pointerleave', () => {
        button.style.setProperty('--mx', '0px');
        button.style.setProperty('--my', '0px');
      });
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  const canvas = document.getElementById('road-canvas');

  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    const hero = canvas.closest('.hero');
    let width = 0;
    let height = 0;
    let dpr = 1;
    let progress = 0.18;
    let currentX = 0.5;
    let targetX = 0.5;
    let rafId = 0;
    let lastTime = 0;
    let inView = true;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(rect.width, 1);
      height = Math.max(rect.height, 1);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reducedMotion.matches) drawRoad(0);
    };

    const easeRoad = (value) => Math.pow(value, 2.4);

    const drawRoad = (delta) => {
      if (!width || !height) return;
      ctx.clearRect(0, 0, width, height);

      const horizon = height * 0.46;
      const baseY = height + 28;
      const vanishingX = width * (0.5 + (currentX - 0.5) * 0.18);

      const glow = ctx.createRadialGradient(vanishingX, horizon, 0, vanishingX, horizon, Math.max(width * 0.5, 1));
      glow.addColorStop(0, 'rgba(31, 91, 255, 0.32)');
      glow.addColorStop(0.45, 'rgba(31, 91, 255, 0.1)');
      glow.addColorStop(1, 'rgba(31, 91, 255, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      for (let i = -4; i <= 4; i += 1) {
        const bottomX = width * 0.5 + i * width * 0.135;
        const alpha = i === 0 ? 0.42 : 0.1 + (4 - Math.abs(i)) * 0.012;
        ctx.beginPath();
        ctx.moveTo(vanishingX, horizon);
        ctx.lineTo(bottomX, baseY);
        ctx.strokeStyle = i === 0 ? `rgba(255, 163, 26, ${alpha})` : `rgba(127, 166, 255, ${alpha})`;
        ctx.lineWidth = i === 0 ? 1.4 : 1;
        ctx.stroke();
      }

      const crossCount = 16;
      for (let i = 0; i < crossCount; i += 1) {
        const p = (i / crossCount + progress) % 1;
        const eased = easeRoad(p);
        const y = horizon + (baseY - horizon) * eased;
        const half = width * 0.55 * eased + 3;
        ctx.beginPath();
        ctx.moveTo(vanishingX - half, y);
        ctx.lineTo(vanishingX + half, y);
        ctx.strokeStyle = `rgba(127, 166, 255, ${Math.min(0.5, 0.04 + p * 0.42)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      const markerCount = 10;
      for (let i = 0; i < markerCount; i += 1) {
        const p = (i / markerCount + progress * 1.5) % 1;
        const eased = easeRoad(p);
        const y = horizon + (baseY - horizon) * eased;
        const half = width * 0.55 * eased + 3;
        ctx.fillStyle = `rgba(255, 163, 26, ${0.16 + p * 0.5})`;
        ctx.beginPath();
        ctx.arc(vanishingX - half + 5, y, 1.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(vanishingX + half - 5, y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      const dashCount = 12;
      for (let i = 0; i < dashCount; i += 1) {
        const p = (i / dashCount + progress * 1.2) % 1;
        const startY = horizon + (baseY - horizon) * easeRoad(p);
        const endY = horizon + (baseY - horizon) * easeRoad(Math.min(p + 0.05, 1));
        ctx.beginPath();
        ctx.moveTo(vanishingX, startY);
        ctx.lineTo(vanishingX, endY);
        ctx.strokeStyle = `rgba(255, 163, 26, ${0.08 + p * 0.42})`;
        ctx.lineWidth = 1.4 + p * 2.6;
        ctx.stroke();
      }

      if (delta > 0) {
        progress = (progress + delta * 0.12) % 1;
        currentX += (targetX - currentX) * 0.045;
      }
    };

    const frame = (now) => {
      const delta = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      drawRoad(delta);
      if (inView && !document.hidden) {
        rafId = requestAnimationFrame(frame);
      } else {
        rafId = 0;
      }
    };

    const startRoad = () => {
      if (rafId || reducedMotion.matches || !inView || document.hidden) return;
      lastTime = performance.now();
      rafId = requestAnimationFrame(frame);
    };

    const stopRoad = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };

    resizeCanvas();
    startRoad();

    let resizeTimer = 0;
    window.addEventListener('resize', () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        resizeCanvas();
        startRoad();
      }, 150);
    }, { passive: true });

    if ('IntersectionObserver' in window) {
      const roadObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          inView = entry.isIntersecting;
          if (inView) startRoad();
          else stopRoad();
        });
      }, { threshold: 0 });

      roadObserver.observe(canvas);
    }

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopRoad();
      else startRoad();
    });

    if (hero && !reducedMotion.matches && finePointer.matches) {
      hero.addEventListener('pointermove', (event) => {
        const rect = hero.getBoundingClientRect();
        targetX = (event.clientX - rect.left) / rect.width;
        hero.style.setProperty('--hx', `${((targetX - 0.5) * 16).toFixed(1)}px`);
        const py = (event.clientY - rect.top) / rect.height;
        hero.style.setProperty('--hy', `${((py - 0.5) * 10).toFixed(1)}px`);
      });

      hero.addEventListener('pointerleave', () => {
        targetX = 0.5;
        hero.style.setProperty('--hx', '0px');
        hero.style.setProperty('--hy', '0px');
      });
    }
  }
})();
