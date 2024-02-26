import './style.css';
import { gsap } from 'gsap';

// Fonction pour animer les lettres
function animateText(textSelector: string): void {
  const text = document.querySelector(textSelector);
  if (text) {
    // Diviser le texte en lettres
    const letters = text.textContent?.split('') || [];
    text.textContent = ''; // Effacer le texte original
    letters.forEach((letter) => {
      const span = document.createElement('span');
      span.textContent = letter;
      span.style.opacity = '0';
      text.appendChild(span);
    });

    // Animer chaque lettre
    gsap.to(text.children, {
      duration: 1, // Durée de l'animation de chaque lettre
      opacity: 1,
      x: 0,
      y: 0,
      stagger: 0.05, // Délai entre l'animation de chaque lettre
      ease: 'elastic.out(1, 0.5)', // Type d'animation
    });
  }
}

// Appeler la fonction d'animation lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
  animateText('.puzzle-text');
});
