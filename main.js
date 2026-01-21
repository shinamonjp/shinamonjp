(() => {
  // Obfuscate email to reduce simple scraping.
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
})();
