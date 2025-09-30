document.addEventListener('DOMContentLoaded', function () {
  // Variables pour les textes en français et en anglais
  const aboutText_fr = "Bonjour! Je suis Victor Tan, doublement diplômé de l'École Normale Supérieure Paris-Saclay (ENS) avec le Master 2 Mathématiques, Vision, Apprentissage (MVA) et de l'école d'ingénieurs ENSIIE. \nJ'ai suivi un parcours Mathématiques Appliquées + Data science + IA + Machine Learning + Deep Learning. \nJe suis ouvert aux opportunités, n'hésitez pas à me contacter sur LinkedIn par exemple (https://www.linkedin.com/in/tan-victor)";
  const educationText_fr = "Formation ingénieur en Mathématiques Appliquées + Double diplôme ENS Paris-Saclay.";
  const projectsText_fr = "J'ai eu la possibilité de réaliser quelques projets intéressants en Machine Learning et en Deep Learning, à la fois dans le domaine scolaire que personnel.";
  
  const aboutText_en = "Hello! I’m Victor Tan, a dual graduate from École Normale Supérieure Paris-Saclay (ENS) with a Master’s degree in Mathematics, Vision, and Learning (MVA), and from the engineering school ENSIIE. \nMy background combines Applied Mathematics, Data Science, Artificial Intelligence, Machine Learning, and Deep Learning. \nI am open to opportunities, so feel free to reach out to me on LinkedIn for instance (https://www.linkedin.com/in/tan-victor)";
  const educationText_en = "Engineering education in Applied Mathematics + Double degree ENS Paris-Saclay.";
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
