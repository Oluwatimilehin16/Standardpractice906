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

  // 5. Chat Widget
  const chatTrigger = document.getElementById('chatTrigger');
  const chatBox = document.getElementById('chatBox');
  const chatClose = document.getElementById('chatClose');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatBody = document.getElementById('chatBody');

  if (chatTrigger && chatBox && chatClose) {
    chatTrigger.addEventListener('click', () => chatBox.classList.toggle('active'));
    chatClose.addEventListener('click', () => chatBox.classList.remove('active'));
  }

  function appendUserMessage(text) {
    if (!chatBody) return;
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-msg user';
    userMsg.textContent = text;
    chatBody.appendChild(userMsg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function appendBotMessage(text) {
    if (!chatBody) return;
    const botMsg = document.createElement('div');
    botMsg.className = 'chat-msg bot';
    botMsg.textContent = text;
    chatBody.appendChild(botMsg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  if (chatForm && chatInput) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;
      appendUserMessage(text);
      chatInput.value = '';

      setTimeout(() => {
        appendBotMessage("Thank you for reaching out. A partner from our team will review your query and respond shortly.");
      }, 700);
    });
  }

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