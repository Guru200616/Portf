// main.js - interactive behavior: navigation active state, form submit (local), filtering
document.addEventListener('DOMContentLoaded', () => {
  // year
  document.getElementById('year').textContent = new Date().getFullYear();

  // nav smooth scroll
  document.querySelectorAll('.sticky-nav a').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.sticky-nav a').forEach(x => x.classList.remove('active'));
      a.classList.add('active');
      const target = document.querySelector(a.getAttribute('href'));
      if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });

  // simple portfolio filter
  const select = document.getElementById('categorySelect');
  select.addEventListener('change', () => {
    const val = select.value;
    document.querySelectorAll('.portfolio-item').forEach(item => {
      if(val === 'all' || item.dataset.category === val) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });

  // contact form (no backend) - fallback: opens mailto with form data
  const form = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if(!name || !email || !message){
      formMsg.textContent = 'Please complete all fields.';
      return;
    }

    // Use mailto as a simple fallback
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    // open mail client (works when client configured) or show message
    window.location.href = `mailto:rguru160706@gmail.com?subject=${subject}&body=${body}`;

    formMsg.textContent = 'Opening your mail client...';
    form.reset();
    setTimeout(()=> formMsg.textContent = '', 5000);
  });

  // highlight nav on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.sticky-nav a');
  function onScroll() {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      if(section.offsetTop <= scrollPos && (section.offsetTop + section.offsetHeight) > scrollPos) {
        const id = section.getAttribute('id');
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  }
  window.addEventListener('scroll', onScroll);
  onScroll();
});
