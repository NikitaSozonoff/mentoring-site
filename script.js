const header = document.querySelector('[data-header]');
const nav = document.querySelector('[data-nav]');
const navToggle = document.querySelector('[data-nav-toggle]');

const closeMenu = () => {
  nav?.classList.remove('is-open');
  navToggle?.setAttribute('aria-expanded', 'false');
};

const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 12);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

navToggle?.addEventListener('click', () => {
  const isOpen = nav?.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(Boolean(isOpen)));
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('click', (event) => {
  if (!header?.contains(event.target)) closeMenu();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && nav?.classList.contains('is-open')) {
    closeMenu();
    navToggle?.focus();
  }
});

const gallery = document.querySelector('[data-gallery]');
const track = gallery?.querySelector('[data-gallery-track]');
const previousButton = gallery?.querySelector('[data-gallery-prev]');
const nextButton = gallery?.querySelector('[data-gallery-next]');
const progress = gallery?.querySelector('[data-gallery-progress]');

if (track && previousButton && nextButton && progress) {
  const updateGallery = () => {
    const maxScroll = track.scrollWidth - track.clientWidth;
    const ratio = maxScroll > 0 ? track.scrollLeft / maxScroll : 1;
    progress.style.width = `${20 + ratio * 80}%`;
    previousButton.disabled = track.scrollLeft < 4;
    nextButton.disabled = track.scrollLeft > maxScroll - 4;
  };

  const scrollOneCard = (direction) => {
    const card = track.querySelector('.query-card');
    const gap = Number.parseFloat(getComputedStyle(track).gap) || 16;
    const distance = (card?.getBoundingClientRect().width || track.clientWidth * .8) + gap;
    track.scrollBy({ left: distance * direction, behavior: 'smooth' });
  };

  previousButton.addEventListener('click', () => scrollOneCard(-1));
  nextButton.addEventListener('click', () => scrollOneCard(1));
  track.addEventListener('scroll', updateGallery, { passive: true });
  if ('ResizeObserver' in window) {
    new ResizeObserver(updateGallery).observe(track);
  } else {
    window.addEventListener('resize', updateGallery);
  }
  updateGallery();
}

const contactContext = document.querySelector('[data-contact-context]');
document.querySelectorAll('a[href="#contact"]').forEach((link) => {
  link.addEventListener('click', () => {
    if (!contactContext) return;
    if (link.dataset.contactNote) {
      contactContext.textContent = link.dataset.contactNote;
    } else if (link.dataset.subject) {
      contactContext.textContent = `${link.dataset.subject}: напишите класс ученика и цель занятий.`;
    } else {
      contactContext.textContent = 'Для начала хватит короткого сообщения.';
    }
  });
});

document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = new Date().getFullYear();
});
