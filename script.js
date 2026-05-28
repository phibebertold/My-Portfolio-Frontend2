document.addEventListener('DOMContentLoaded', () => {

  // 1. 🖋️ TYPEWRITER EFFECT (Subtitle inajandika yenyewe)
  const subtitle = document.querySelector('header p');
  if (subtitle) {
    const text = subtitle.textContent;
    subtitle.textContent = '';
    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        subtitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 45); // Badilisha 45 kuwa 30 (fast) au 60 (slow)
      }
    }
    typeWriter();
  }

  // 2. 📊 SCROLL PROGRESS BAR (Mstari wa purple juu ya screen)
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed; top: 0; left: 0; height: 4px; 
    background: linear-gradient(90deg, #7C3AED, #A78BFA);
    width: 0%; z-index: 9999; transition: width 0.1s ease;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + "%";
  });

  // 3. ️ SMOOTH SCROLL & ACTIVE NAV HIGHLIGHT
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        window.scrollTo({ top: targetSection.offsetTop - 70, behavior: 'smooth' });
      }
    });
  });

  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) link.classList.add('active');
    });
  });

  // 4.  STAGGERED SCROLL REVEAL (Cards zinaingia moja baada ya nyingine)
  const revealItems = document.querySelectorAll('.skill-card, .project-card, .timeline-item, .contact-btn');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealItems.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `all 0.6s ease ${index * 0.1}s`;
    revealObserver.observe(el);
  });

  // 5. 📅 DYNAMIC FOOTER YEAR
  const footerText = document.querySelector('footer p');
  if (footerText) {
    footerText.innerHTML = `&copy; ${new Date().getFullYear()} Phibe Wilbert Bertold. Built with ❤️`;
  }

  // 6. 🌟 CONSOLE GREETING (Kwa developers wanao-open inspect)
  const hour = new Date().getHours();
  let greeting = 'Good Evening';
  if (hour < 12) greeting = 'Good Morning';
  else if (hour < 18) greeting = 'Good Afternoon';
  console.log(`✨ ${greeting}! Thanks for visiting my portfolio.`);
  console.log('🔧 Built with: HTML5, CSS3, Vanilla JS, Vercel & Render');
});