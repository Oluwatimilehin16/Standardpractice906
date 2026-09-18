document.addEventListener('DOMContentLoaded', () => {

  // 1. Scroll Reveal Observer
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  if (revealEls.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px'
    });

    revealEls.forEach(el => observer.observe(el));
  }

  // 2. Scroll Progress Bar
  const progressBar = document.getElementById('progressBar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + '%';
    });
  }

  // 3. Mobile Nav Toggle
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => navMenu.classList.toggle('active'));
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => navMenu.classList.remove('active'));
    });
  }

  // 4. Testimonial Switcher (Using String Image Paths)
  const clientData = [
    {
      quote: '"Standard Practice brought a level of clarity and discipline our board had been searching for. They challenged us where it mattered and delivered where it counted."',
      initials: 'AO',
      name: 'Adaeze Okafor',
      role: 'Group CEO, Financial Services',
      src: './img/test2.png'
    },
    {
      quote: '"A team that combines the polish of a global firm with a genuine understanding of the Nigerian operating environment. Rare and valuable."',
      initials: 'IB',
      name: 'Ibrahim Bello',
      role: 'Chairman, Energy Group',
      src: './img/test3.png'
    },
    {
      quote: '"Their compliance work put us two years ahead of our regulator\'s expectations. It was a quiet, professional, decisive engagement."',
      initials: 'NA',
      name: 'Tunde Adeyemi',
      role: 'Chief Risk Officer, Bank',
      src: './img/test1.png'
    }
  ];

  window.setTestimonial = function(index) {
    const dots = document.querySelectorAll('#testimonialDots .testimonial-dot-v2');
    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add('active');
        dot.style.width = '48px';
        dot.style.backgroundColor = '#0A3A2A';
      } else {
        dot.classList.remove('active');
        dot.style.width = '32px';
        dot.style.backgroundColor = '#D3D8D4';
      }
    });

    const container = document.getElementById('testimonialContent');
    if (!container) return;

    container.style.opacity = '0';

    setTimeout(() => {
      const data = clientData[index];
      const blockquote = container.querySelector('blockquote');
      const nameEl = document.getElementById('clientName');
      const roleEl = document.getElementById('clientRole');
      const avatarEl = document.getElementById('clientAvatar');

      if (blockquote) blockquote.textContent = data.quote;
      if (nameEl) nameEl.textContent = data.name;
      if (roleEl) roleEl.textContent = data.role;
      if (avatarEl) avatarEl.src = data.src;

      container.style.opacity = '1';
    }, 200);
  };

  // 5. Chat Widget — owned entirely by chatbot.js (markup, state and replies).

  // 6. Back To Top
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.style.display = 'flex';
        requestAnimationFrame(() => backToTopBtn.style.opacity = '1');
      } else {
        backToTopBtn.style.opacity = '0';
        setTimeout(() => {
          if (window.scrollY <= 400) backToTopBtn.style.display = 'none';
        }, 300);
      }
    });
  }

});

/* ==========================================================================
   Smooth Card Auto-Switching (Practice Cards & Insights Cards Only)
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  function setupSmoothMobileAutoSwitch(containerSelector, itemSelector, intervalMs = 4500) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const items = container.querySelectorAll(itemSelector);
    if (items.length <= 1) return;

    let currentIndex = 0;

    // Set initial active card
    items.forEach((item, index) => {
      if (index === 0) {
        item.classList.add("active");
      } else {
        item.classList.remove("active", "exiting");
      }
    });

    setInterval(() => {
      // Auto-switch only on mobile view
      if (window.innerWidth <= 600) {
        const previousItem = items[currentIndex];

        // Advance to next card
        currentIndex = (currentIndex + 1) % items.length;
        const nextItem = items[currentIndex];

        // Transition out previous item
        previousItem.classList.remove("active");
        previousItem.classList.add("exiting");

        // Transition in next item
        nextItem.classList.remove("exiting");
        nextItem.classList.add("active");

        // Clean up transition class
        setTimeout(() => {
          previousItem.classList.remove("exiting");
        }, 800);
      } else {
        // Reset classes for desktop layout
        items.forEach((item) => item.classList.remove("active", "exiting"));
      }
    }, intervalMs);
  }

  // Initialize auto-switch ONLY for Practice cards and Insight cards
  setupSmoothMobileAutoSwitch(".services-grid", ".service-card", 4500);
  setupSmoothMobileAutoSwitch(".insights-grid", ".article-card", 4500);
});
/* ==========================================================================
   7. FORMS — contact enquiry + footer newsletter
   Both post to the firm's real inbox (info@standardpracticeprofessional.com)
   through FormSubmit, over AJAX so the visitor never leaves the page.
   If the request fails — offline, blocked, service down — we fall back to
   opening a pre-filled email in the visitor's own mail client, so a message
   is never silently lost.
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {

  const FIRM_EMAIL = 'info@standardpracticeprofessional.com';
  const ENDPOINT = 'https://formsubmit.co/ajax/' + FIRM_EMAIL;

  function showStatus(el, type, html) {
    if (!el) return;
    el.className = 'form-status is-visible is-' + type;
    el.innerHTML = html;
  }

  function buildMailtoFallback(subject, body) {
    return 'mailto:' + FIRM_EMAIL +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);
  }

  /* ---- Contact page enquiry form ---------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    // The page may override the delivery address via data-mailto.
    const formEmail = contactForm.dataset.mailto || FIRM_EMAIL;
    const formEndpoint = 'https://formsubmit.co/ajax/' + formEmail;
    const statusEl = document.getElementById('contactFormStatus');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.innerHTML : '';

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Let the browser run its own required/type validation first.
      if (!contactForm.reportValidity()) return;

      const data = new FormData(contactForm);

      // Honeypot filled in means a bot: pretend success, send nothing.
      if (data.get('_honey')) {
        showStatus(statusEl, 'success', 'Thank you — your message has been received.');
        contactForm.reset();
        return;
      }

      const name = (data.get('name') || '').toString().trim();
      const practiceSelect = contactForm.querySelector('#practice');
      const practiceLabel = practiceSelect && practiceSelect.selectedIndex > 0
        ? practiceSelect.options[practiceSelect.selectedIndex].text
        : 'Not specified';

      // FormSubmit shows field names verbatim in the email it sends, so give
      // them readable labels rather than the lowercase input names.
      const payload = {
        _subject: 'New enquiry from standardpracticeprofessional.com',
        _template: 'table',
        _captcha: 'false',
        Name: name,
        Email: (data.get('email') || '').toString().trim(),
        Company: (data.get('company') || '').toString().trim() || 'Not provided',
        Phone: (data.get('phone') || '').toString().trim() || 'Not provided',
        'Service of interest': practiceLabel,
        Message: (data.get('message') || '').toString().trim()
      };

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending…';
      }
      showStatus(statusEl, 'success', 'Sending your message…');

      fetch(formEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })
        .then((res) => res.json().catch(() => ({})).then((json) => ({ ok: res.ok, json })))
        .then(({ ok, json }) => {
          const delivered = ok && (json.success === 'true' || json.success === true);
          if (!delivered) throw new Error(json.message || 'Delivery failed');

          showStatus(
            statusEl,
            'success',
            '<strong>Thank you' + (name ? ', ' + escapeHtml(name.split(' ')[0]) : '') +
            '.</strong> Your message is on its way to ' + formEmail +
            '. We reply within one business day with the right partner to have the conversation with.'
          );
          contactForm.reset();
        })
        .catch(() => {
          const body =
            'Name: ' + payload.Name + '\n' +
            'Email: ' + payload.Email + '\n' +
            'Company: ' + payload.Company + '\n' +
            'Phone: ' + payload.Phone + '\n' +
            'Service of interest: ' + payload['Service of interest'] + '\n\n' +
            payload.Message;

          showStatus(
            statusEl,
            'error',
            'We could not send that automatically. <a href="' +
            buildMailtoFallback('Enquiry — ' + (payload.Name || 'Website'), body) +
            '">Click here to send it by email instead</a>, or call us on +234-805-606-9623.'
          );
        })
        .then(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
          }
        });
    });
  }

  /* ---- Footer newsletter (present on every page) ------------------------- */
  document.querySelectorAll('.newsletter-form').forEach((form) => {
    // Drop the inline no-op handler the markup ships with.
    form.removeAttribute('onsubmit');

    const input = form.querySelector('input[type="email"]');
    const button = form.querySelector('button');
    if (!input || !button) return;

    const originalBtnText = button.textContent;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;

      const email = input.value.trim();
      button.disabled = true;
      button.textContent = '…';

      fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: 'Newsletter signup — standardpracticeprofessional.com',
          _captcha: 'false',
          Email: email,
          Source: window.location.pathname
        })
      })
        .then((res) => res.json().catch(() => ({})).then((json) => ({ ok: res.ok, json })))
        .then(({ ok, json }) => {
          if (!(ok && (json.success === 'true' || json.success === true))) {
            throw new Error('Delivery failed');
          }
          form.reset();
          button.textContent = 'Joined ✓';
        })
        .catch(() => {
          // Never hijack the page with a mail client here — just tell them.
          button.textContent = 'Try again';
          input.value = '';
          input.placeholder = 'Email us at ' + FIRM_EMAIL;
        })
        .then(() => {
          setTimeout(() => {
            button.disabled = false;
            button.textContent = originalBtnText;
          }, 3500);
        });
    });
  });

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (ch) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[ch]);
  }

});

/* ==========================================================================
   8. INSIGHTS FILTER + SEARCH (insight.html)
   The pills and the search box were decorative; this makes them work.
   Filtering is by the card's data-category, search is a plain substring
   match across the title and excerpt.
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {

  const grid = document.getElementById('insightsGrid');
  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll('.insight-card'));
  const pills = Array.from(document.querySelectorAll('.filter-pill'));
  const searchInput = document.getElementById('insightSearch');
  const emptyState = document.getElementById('insightsEmpty');

  let activeCategory = 'all';
  let activeQuery = '';

  function cardText(card) {
    const title = card.querySelector('.insight-title');
    const excerpt = card.querySelector('.insight-excerpt');
    return ((title ? title.textContent : '') + ' ' + (excerpt ? excerpt.textContent : '')).toLowerCase();
  }

  function apply() {
    let visible = 0;

    cards.forEach((card) => {
      const category = (card.dataset.category || '').toLowerCase();
      const matchesCategory = activeCategory === 'all' || category === activeCategory;
      const matchesQuery = !activeQuery || cardText(card).indexOf(activeQuery) !== -1;
      const show = matchesCategory && matchesQuery;

      card.hidden = !show;
      if (show) visible++;
    });

    if (emptyState) emptyState.hidden = visible !== 0;
    grid.hidden = visible === 0;
  }

  function setCategory(category) {
    activeCategory = (category || 'all').toLowerCase();
    pills.forEach((pill) => {
      pill.classList.toggle('active', (pill.dataset.category || '').toLowerCase() === activeCategory);
    });
    apply();
  }

  pills.forEach((pill) => {
    pill.addEventListener('click', () => setCategory(pill.dataset.category));
  });

  if (emptyState) {
    const reset = emptyState.querySelector('[data-category]');
    if (reset) {
      reset.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        activeQuery = '';
        setCategory('all');
      });
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      activeQuery = searchInput.value.trim().toLowerCase();
      apply();
    });
  }

  apply();
});
