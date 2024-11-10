document.addEventListener('DOMContentLoaded', function () {
  // Variables pour les textes en français et en anglais
  const aboutText_fr = "Bonjour, je suis Victor Tan, étudiant en dernière année à l'École Normale Supérieure Paris-Saclay (ENS) et actuellement en Master Mathématiques, Vision, Apprentissage (MVA). \nÀ la recherche d'un stage de fin d'études de 5 mois à partir d'avril 2025, je souhaite contribuer dans les domaines de l'intelligence artificielle et du machine learning.";
  const educationText_fr = "Formation ingénieur";
  const projectsText_fr = "Au cours de mon cursus scolaire, j'ai eu la possibilité de réaliser quelques projets intéressants, mais j'ai également réalisé des projets personnels.";
  
  const aboutText_en = "Hello, I'm Victor Tan, a final-year student at École Normale Supérieure Paris-Saclay (ENS), currently pursuing a Master's degree in Mathematics, Vision, and Learning (MVA). \nI'm seeking a 5-month end-of-study internship starting in April 2025, with the aim of contributing in the fields of artificial intelligence and machine learning.";
  const educationText_en = "Engineering education";
  const projectsText_en = "Throughout my studies, I've had the opportunity to work on some interesting academic projects, as well as personal projects.";
  
  // Fonction d'animation du texte lettre par lettre avec une vitesse de 10ms
  function typeText(element, text, index = 0) {
    if (index < text.length) {
      const currentChar = text.charAt(index);

      // Si le caractère est un saut de ligne \n, on ajoute un <br> pour faire un saut de ligne
      if (currentChar === '\n') {
        element.innerHTML += '<br>'; // Insertion d'un saut de ligne HTML
      } else {
        element.innerHTML += currentChar; // Ajoute chaque caractère un par un
      }

      setTimeout(function () {
        typeText(element, text, index + 1); // Appel récursif pour la prochaine lettre
      }, 10); // Délai de 10ms entre chaque lettre
    }
  }

  // Fonction pour insérer du texte dans l'élément de manière progressive
  function insertTextIntoElementOnce(elementId, text) {
    const element = document.getElementById(elementId);
    //element.innerHTML = ''; // Effacer le contenu précédent (si déjà affiché)
    typeText(element, text); // Ajouter du texte de manière progressive
  }

  // Observer les sections et les rendre visibles
  function revealSection(sectionId, text, language) {
    const section = document.getElementById(sectionId);

    // Vérifier si l'élément de la section existe avant de tenter de l'observer
    if (section) {
      const observer = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
          section.classList.add('visible'); // La section devient visible

          // Dès que la section devient visible, on lance l'animation du texte
          const textElement = section.querySelector(`.text-${language}`);
          const animatedTextElement = textElement.querySelector(`#animated-text-${sectionId}-${language}`); 
          // On insère le texte uniquement si ce n'est pas déjà fait
          if (!animatedTextElement.classList.contains('text-animated')) {
            insertTextIntoElementOnce(animatedTextElement.id, text); // Insérer le texte progressivement
            animatedTextElement.classList.add('text-animated'); // Marquer que l'animation a été lancée
          }

          // Rendre les sous-sections visibles instantanément
          const subSections = section.querySelectorAll('.sub-section');
setTimeout(() => {
  subSections.forEach((subSection, index) => {
    setTimeout(() => {
      subSection.classList.add('visible');
    }, index * 500); // Délai de 500ms entre chaque sous-section
  });
}, 1000); // Attendre 3 secondes avant de commencer à afficher les sous-sections

          observer.disconnect(); // Déconnecter l'observateur après la première activation
        }
      }, { threshold: 0.5 }); // L'observateur se déclenche quand 50% de la section est visible

      observer.observe(section);
    } else {
      console.error(`Section avec l'id "${sectionId}" non trouvée`);
    }
  }

  // Observer les sections avec les bons textes et langues
  revealSection('about', aboutText_fr, 'fr');
  revealSection('education', educationText_fr, 'fr');
  revealSection('projects', projectsText_fr, 'fr');

  revealSection('about', aboutText_en, 'en');
  revealSection('education', educationText_en, 'en');
  revealSection('projects', projectsText_en, 'en');

  // Fonction pour changer la langue
  const languageToggleButton = document.getElementById('language-toggle');
  let isFrench = true; // Par défaut, on affiche le français

  languageToggleButton.addEventListener('click', () => {
    isFrench = !isFrench; // Bascule entre les langues

    // Affiche ou cache les sections en fonction de la langue
    const frenchTextElements = document.querySelectorAll('.text-fr');
    const englishTextElements = document.querySelectorAll('.text-en');

    // Changer les intitulés du menu en fonction de la langue
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      if (isFrench) {
        item.textContent = item.getAttribute('data-fr'); // "Formation" et "Projets" en français
      } else {
        item.textContent = item.getAttribute('data-en'); // "Education" et "Projects" en anglais
      }
    });

    // Mise à jour du texte du bouton de langue
    languageToggleButton.textContent = isFrench ? 'English' : 'Français';

    // Changer l'affichage des textes en fonction de la langue
    if (isFrench) {
      frenchTextElements.forEach(el => el.style.display = 'block');
      englishTextElements.forEach(el => el.style.display = 'none');
    } else {
      frenchTextElements.forEach(el => el.style.display = 'none');
      englishTextElements.forEach(el => el.style.display = 'block');
    }
  });

  // Fonction pour gérer le défilement fluide vers la section "About Me"
  const logoLink = document.querySelector('.logo a');
  logoLink.addEventListener('click', (e) => {
    e.preventDefault(); // Empêcher le comportement par défaut (rechargement de la page)
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
  });
});
