// script.js - header shrink, reveal-on-scroll with intersection observer, staggered cards
document.addEventListener('DOMContentLoaded', ()=>{

  // Header shrink
  const header = document.querySelector('header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 50);
  window.addEventListener('scroll', onScroll);
  onScroll();

  // IntersectionObserver for reveal elements
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        // apply stagger if child items with data-delay
        const children = entry.target.querySelectorAll('[data-delay]');
        children.forEach((el, idx) => {
          const delay = (parseFloat(el.getAttribute('data-delay')) || (idx*0.08));
          el.style.transitionDelay = `${delay}s`;
          el.style.opacity = 1;
          el.style.transform = 'translateY(0)';
        });
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal, .services-cards, .home-services-preview, .clients-preview, .about-page').forEach(el => io.observe(el));

  // stagger direct children of .services-cards
  document.querySelectorAll('.services-cards').forEach(grid => {
    const items = Array.from(grid.children);
    items.forEach((it, i) => it.setAttribute('data-delay', (i*0.08).toFixed(2)));
  });

});
