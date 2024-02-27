import './style.css';
import './style/base.css';
import './style/animations.css';
import './style/components.css';
import './style/navigation.css';
import './style/formation.css';
import './style/footer.css';
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
      duration: 0.01, // Durée de l'animation de chaque lettre
      opacity: 1,
      x: 0,
      y: 0,
      stagger: 0.02, // Délai entre l'animation de chaque lettre
      ease: 'elastic.out(1, 0.5)', // Type d'animation
    });
  }
}

// Appeler la fonction d'animation lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
  animateText('.puzzle-text');
});

// Gestion du menu mobile
document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', () => {
      // Toggle the 'hidden' class
      if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
      } else {
        mobileMenu.classList.add('hidden');
      }
    });
  } else {
    console.error('Menu button or mobile menu element is missing.');
  }
});

/* Gestion des bulles lors du click à l'écran */
document.addEventListener('click', function (e) {
  // Crée une nouvelle bulle
  var bubble = document.createElement('div');
  bubble.classList.add('bubble');
  document.body.appendChild(bubble);

  // La taille et la position de la bulle
  var size = Math.random() * 50 + 20; // Taille entre 20px et 70px
  bubble.style.width = bubble.style.height = size + 'px';
  bubble.style.left = e.clientX + window.scrollX - size / 2 + 'px';
  bubble.style.top = e.clientY + window.scrollY - size / 2 + 'px';

  // Définit une couleur aléatoire pour la bulle
  const colors = ['#ff007a', '#00d9e9', '#bd00ff', '#4ade80'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  bubble.style.backgroundColor = randomColor;

  // Supprime la bulle
  setTimeout(function () {
    document.body.removeChild(bubble);
  }, 2000); // Correspond à la durée de l'animation
});

// Gestion de canvas pour le footer
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('particleCanvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;

  canvas.width = window.innerWidth;
  canvas.height = 200; // Hauteur fixe pour le footer

  interface ParticleProps {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    color: string;
  }

  class Particle implements ParticleProps {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    color: string;

    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 5 + 1;
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * 3 - 1.5;
      this.color = ['#ff007a', '#00d9e9', '#bd00ff', '#4ade80'][
        Math.floor(Math.random() * 4)
      ];
    }

    update(): void {
      this.x += this.speedX;
      this.y += this.speedY;

      // Régénération des particules lorsqu'elles sortent du canvas
      if (
        this.x < 0 ||
        this.x > canvas.width ||
        this.y < 0 ||
        this.y > canvas.height
      ) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
      }
    }

    draw(): void {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  let particlesArray: Particle[] = [];

  function init(): void {
    particlesArray = [];
    let initialCount = 100;
    for (let i = 0; i < initialCount; i++) {
      particlesArray.push(new Particle());
    }
  }

  function animate(): void {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach((particle, index) => {
      particle.update();
      particle.draw();
    });

    // Maintenir le nombre de particules entre 20 et 100
    if (particlesArray.length < 20) {
      let additionalParticles =
        Math.random() * (80 - particlesArray.length) +
        20 -
        particlesArray.length;
      for (let i = 0; i < additionalParticles; i++) {
        particlesArray.push(new Particle());
      }
    }

    requestAnimationFrame(animate);
  }

  init();
  animate();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = 200;
    init();
  });
});
