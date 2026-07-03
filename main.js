(() => {
  // ── Email obfuscation (anti-scrape) ──────────────────────
  const user = 'contact';
  const domain = 'shinamon.jp';

  const targets = document.querySelectorAll('[data-email]');
  targets.forEach((el) => {
    const local = document.createElement('span');
    local.textContent = user;

    const at = document.createElement('span');
    at.className = 'at-icon';
    at.setAttribute('aria-hidden', 'true');

    const host = document.createElement('span');
    host.textContent = domain;

    const link = document.createElement('a');
    link.className = 'mail';
    link.href = `mailto:${user}@${domain}`;
    link.setAttribute('aria-label', `${user} at ${domain}`);

    link.appendChild(local);
    link.appendChild(at);
    link.appendChild(host);

    el.textContent = '';
    el.appendChild(link);
  });

  // ── Scroll-triggered fade-in animations ─────────────────
  const fadeEls = document.querySelectorAll('.fade-up');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    fadeEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback: show all immediately
    fadeEls.forEach((el) => el.classList.add('is-visible'));
  }

  // ── Smooth scroll for nav links ─────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const top =
          target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ── Header background on scroll ─────────────────────────
  const header = document.getElementById('header');
  if (header) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (window.scrollY > 60) {
            header.style.background = 'rgba(8, 8, 12, 0.95)';
          } else {
            header.style.background = 'rgba(8, 8, 12, 0.85)';
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }
})();
