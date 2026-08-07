// 0. Scroll Reveal Observer — fades/slides sections and cards into view
document.addEventListener('DOMContentLoaded', () => {
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // animate once
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px'
  });

  revealEls.forEach(el => observer.observe(el));
});

// 1. Scroll Progress Bar logic
    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      document.getElementById('progressBar').style.width = scrolled + '%';
    });

    // 2. Mobile Nav Toggle
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');

    hamburgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => navMenu.classList.remove('active'));
    });

    // 3. Testimonials Data Switcher
const clientData = [
    {
      quote: '"Standard Practice brought a level of clarity and discipline our board had been searching for. They challenged us where it mattered and delivered where it counted."',
      initials: 'AO',
      name: 'Adaeze Okafor',
      role: 'Group CEO, Financial Services',
      avatar: 'https://i.pravatar.cc/100?img=45'
    },
    {
      quote: '"A team that combines the polish of a global firm with a genuine understanding of the Nigerian operating environment. Rare and valuable."',
      initials: 'IB',
      name: 'Ibrahim Bello',
      role: 'Chairman, Energy Group',
      avatar: 'https://i.pravatar.cc/100?img=12'
    },
    {
      quote: '"Their compliance work put us two years ahead of our regulator\'s expectations. It was a quiet, professional, decisive engagement."',
      initials: 'NA',
      name: 'Ngozi Adeyemi',
      role: 'Chief Risk Officer, Bank',
      avatar: 'https://i.pravatar.cc/100?img=33'
    }
  ];

  function setTestimonial(index) {
  
    const dots = document.querySelectorAll('#testimonialDots button');
    dots.forEach((dot, i) => {
      dot.style.width = i === index ? '48px' : '32px';
      dot.style.backgroundColor = i === index ? '#0A3A2A' : '#D3D8D4';
    });

    const container = document.getElementById('testimonialContent');
    container.style.opacity = '0';

    setTimeout(() => {
      const data = clientData[index];
      container.querySelector('blockquote').textContent = data.quote;
      document.getElementById('clientName').textContent = data.name;
      document.getElementById('clientRole').textContent = data.role;
      document.getElementById('clientAvatar').src = data.avatar;
      container.querySelector('div > div > div:first-child').textContent = data.initials;
      container.style.opacity = '1';
    }, 200);
  }
    // 4. Interactive Chat Widget Logic
    const chatTrigger = document.getElementById('chatTrigger');
    const chatBox = document.getElementById('chatBox');
    const chatClose = document.getElementById('chatClose');
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const chatBody = document.getElementById('chatBody');

    chatTrigger.addEventListener('click', () => {
      chatBox.classList.toggle('active');
    });

    chatClose.addEventListener('click', () => {
      chatBox.classList.remove('active');
    });

    function appendUserMessage(text) {
      const userMsg = document.createElement('div');
      userMsg.className = 'chat-msg user';
      userMsg.textContent = text;
      chatBody.appendChild(userMsg);
      chatBody.scrollTop = chatBody.scrollHeight;
    }

    function appendBotMessage(text) {
      const botMsg = document.createElement('div');
      botMsg.className = 'chat-msg bot';
      botMsg.textContent = text;
      chatBody.appendChild(botMsg);
      chatBody.scrollTop = chatBody.scrollHeight;
    }

    function sendQuickReply(text) {
      appendUserMessage(text);
      setTimeout(() => {
        if (text.includes('services')) {
          appendBotMessage("We offer 7 core practices including Business Consulting, Corporate Advisory, Strategy Consulting, Regulatory Compliance, Risk Management, Project Management, and Financial Consulting.");
        } else if (text.includes('consultation')) {
          appendBotMessage("You can book a consultation by filling our contact form or calling +234 800 000 0000. Our partners respond within one business day.");
        } else {
          appendBotMessage("Feel free to browse our latest insights section on the page for regulatory and market updates!");
        }
      }, 600);
    }

    // Back to top button: show after scrolling down, hide near the top
const backToTopBtn = document.getElementById('backToTop');

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
  

// Replace the original setTestimonial function with this fixed version:
function setTestimonial(index) {
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
  container.style.opacity = '0';

  setTimeout(() => {
    const data = clientData[index];
    container.querySelector('blockquote').textContent = data.quote;
    document.getElementById('clientName').textContent = data.name;
    document.getElementById('clientRole').textContent = data.role;
    document.getElementById('clientAvatar').src = data.avatar;
    container.style.opacity = '1';
  }, 200);
}