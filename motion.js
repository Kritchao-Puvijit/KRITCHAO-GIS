// Shared scroll motion: nav solidify-on-scroll, section fade-in reveal,
// and staggered card-grid cascade. Used by index.html and every project page.
(function () {
  const navEl = document.querySelector('nav');
  if (navEl) {
    const setNavScrolled = () => navEl.classList.toggle('scrolled', window.scrollY > 40);
    setNavScrolled();
    window.addEventListener('scroll', setNavScrolled, { passive: true });
  }

  const faders = document.querySelectorAll('.fade-in');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); } });
  }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });
  faders.forEach(f => io.observe(f));

  const cardGrids = ['.proj-card', '.skill-card', '.cert-card', '.shot-card']
    .map(sel => document.querySelectorAll(sel))
    .filter(g => g.length);
  const cardIo = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show'); cardIo.unobserve(e.target); } });
  }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });
  cardGrids.forEach(grid => {
    grid.forEach((card, i) => {
      card.style.transitionDelay = (i * 70) + 'ms';
      cardIo.observe(card);
    });
  });

  // Safety net: some tall sections (long photo galleries) can fail to trigger the
  // reveal animation on certain browsers/viewports — never let content stay hidden.
  setTimeout(() => {
    faders.forEach(f => f.classList.add('show'));
    cardGrids.forEach(grid => grid.forEach(c => c.classList.add('show')));
  }, 1200);
})();
