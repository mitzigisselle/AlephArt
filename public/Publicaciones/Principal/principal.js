// script.js

function createCard(imageSrc, title, description, buttonImages) {
  const card = document.createElement('div');
  card.classList.add('card');

  const img = document.createElement('img');
  img.src = imageSrc;
  img.alt = title;
  img.classList.add('card-image');

  const cardContent = document.createElement('div');
  cardContent.classList.add('card-content');

  const cardTitle = document.createElement('h2');
  cardTitle.classList.add('card-title');
  cardTitle.textContent = title;

  const cardDescription = document.createElement('p');
  cardDescription.classList.add('card-description');
  cardDescription.textContent = description;

  const imageButtons = document.createElement('div');
  imageButtons.classList.add('image-buttons');

  buttonImages.forEach(({ src, reactions }) => {
      const button = document.createElement('button');
      button.classList.add('image-button');
      const img = document.createElement('img');
      img.src = src;
      img.alt = 'Button image';
      const reactionCount = document.createElement('span');
      reactionCount.classList.add('reaction-count');
      reactionCount.textContent = reactions;

      button.appendChild(img);
      button.appendChild(reactionCount);
      imageButtons.appendChild(button);
  });

  cardContent.appendChild(cardTitle);
  cardContent.appendChild(cardDescription);
  cardContent.appendChild(imageButtons);
  card.appendChild(img);
  card.appendChild(cardContent);

  return card;
}

const cardContainer = document.getElementById('card-container');

// Lista de imágenes, títulos y descripciones
const images = [
  '../../../assets/imgPublicaciones/1.jpg',
  '../../../assets/imgPublicaciones/2.jpg',
  '../../../assets/imgPublicaciones/3.jpg',
  '../../../assets/imgPublicaciones/4.jpg',
  '../../../assets/imgPublicaciones/5.jpg',
  '../../../assets/imgPublicaciones/6.jpg',
  '../../../assets/imgPublicaciones/7.jpg',
  '../../../assets/imgPublicaciones/8.jpg',
  '../../../assets/imgPublicaciones/9.jpg',
  '../../../assets/imgPublicaciones/10.jpg'
];

const titles = [
  'Usuario 1',
  'Usuario 2',
  'Usuario 3',
  'Usuario 4',
  'Usuario 5',
  'Usuario 6',
  'Usuario 7',
  'Usuario 8',
  'Usuario 9',
  'Usuario 10'
];

const descriptions = [
  '"🎨✨ ¡Acabo de terminar esta obra y no podría estar más satisfecho/a con el resultado! Cada pincelada ha sido una expresión de mi pasión y dedicación, y ver el producto final me llena de orgullo."',
  '“Preparándome para capturar el momento perfecto 📸✨”',
  '“Un verdadero tesoro del pasado que cuenta historias y conecta con la historia de manera única. ¡Increíble!”',
  '“¡La música cobra vida en mis manos! 🎸✨”',
  '“Sumergido en la magia del concierto, rodeado de buena música y grandes vibraciones. ¡Una noche inolvidable llena de ritmo y emoción! 🎶✨”',
  '“Dejando que las cuerdas del violín cuenten mi historia. 🎻✨ ¡Cada nota es un viaje musical que disfruto al máximo!”',
  '“Perdiéndome en el ritmo y las melodías de la guitarra. 🎸✨ Cada acorde es una expresión de pasión y creatividad. ¡Así es como vivo la música!”',
  '“Explorando el arte a través de formas y texturas. 🗿✨ Cada escultura es una obra maestra que inspira y cuenta una historia. ¡Un deleite para los sentidos!”',
  '“Preparándome para capturar el momento perfecto. 📸✨ ¡Listo para inmortalizar esta instantánea y convertirla en un recuerdo!”',
  '“Preparado para dar vida a un lienzo en blanco. 🎨✨ ¡Pronto empezarán a surgir colores y formas que transformarán esta obra!”'
];

// Crear y agregar 10 tarjetas con imágenes, títulos y descripciones únicas
for (let i = 0; i < 10; i++) {
  const newCard = createCard(
      images[i], // Imagen específica para cada tarjeta
      titles[i], // Título específico para cada tarjeta
      descriptions[i], // Descripción específica para cada tarjeta
      [
          { src: '../../assets/iconos/meeting.png', reactions: 12 },
          { src: '../../assets/iconos/share.png', reactions: 7 },
          { src: '../../assets/iconos/sparkles.png', reactions: 25 }
      ]
  );
  cardContainer.appendChild(newCard);
}
