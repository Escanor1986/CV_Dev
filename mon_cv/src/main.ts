import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-right');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    },
  );

  document.querySelectorAll('.animation-target').forEach((target: Element) => {
    observer.observe(target);
  });
});
