//Кнопки закрытия popup
const popupCloseButtons = document.querySelectorAll('.popup__close-button');

//Поля профиля на странице
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');

//Кнопка редактирования профиля
const profileEditButton = document.querySelector('.profile__edit-button');

//Popup редактирования профиля
const popupProfile = document.querySelector('.popup_type_profile');
const popupFormProfile = popupProfile.querySelector('.popup__form');
const inputName = popupProfile.querySelector('.popup__input_type_name');
const inputAbout = popupProfile.querySelector('.popup__input_type_about');

//Галерея для вставки карточки места
const gallery = document.querySelector('.gallery');

//Шаблон карточки места
const cardTemplate = document.querySelector('#cardTemplate').content;

//Кнопка добавления карточки места
const cardAddButton = document.querySelector('.profile__add-button');

//Popup создания карточки места
const popupCard = document.querySelector('.popup_type_card');
const popupFormCard = popupCard.querySelector('.popup__form');
const inputPlace = popupCard.querySelector('.popup__input_type_place');
const inputLink = popupCard.querySelector('.popup__input_type_link');

//Popup фотографии места
const popupFigure = document.querySelector('.popup_type_img');
const popupImg = popupFigure.querySelector('.popup__img');
const popupCaption = popupFigure.querySelector('.popup__caption')

//Первичный массив карточек мест
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Открытие и закрытие popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

popupCloseButtons.forEach((popupCloseButton) => {
  popupCloseButton.addEventListener('click', (evt) => {
    closePopup(evt.currentTarget.closest('.popup'));
  });
});

// Редактирование профиля
profileEditButton.addEventListener('click', () => {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  openPopup(popupProfile);
});

function savePopupProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup(popupProfile);
};

popupFormProfile.addEventListener('submit', savePopupProfile);

// Открытие изображения на весь экран
function openImg(name, link) {
  popupImg.src = link;
  popupImg.alt = name;
  popupCaption.textContent = name;
  openPopup(popupFigure);
};

//Формирование карточки места
function createCard(name, link) {
  const cardElement = cardTemplate.querySelector('.gallery__item').cloneNode(true);
  const cardPhoto = cardElement.querySelector('.gallery__photo');
  const cardTitle = cardElement.querySelector('.gallery__title');
  const cardDeleteButton = cardElement.querySelector('.gallery__del');
  const heart = cardElement.querySelector('.gallery__like');

  cardPhoto.src = link;
  cardPhoto.alt = name;
  cardTitle.textContent = name;

  cardPhoto.addEventListener('click', () => {
    openImg(name, link);
  });

  cardDeleteButton.addEventListener('click', () => {
    cardElement.remove();
  });

  heart.addEventListener('click', () => {
    heart.classList.toggle('gallery__like_active');
  });

  return cardElement;
}

// Получение данных из формы создания карточки места
cardAddButton.addEventListener('click', () => {
  popupFormCard.reset();
  openPopup(popupCard);
});

function savePopupCard(evt) {
  evt.preventDefault();
  gallery.prepend(createCard(inputPlace.value, inputLink.value));
  closePopup(popupCard);
};

popupFormCard.addEventListener('submit', savePopupCard);

// Формирование карточек мест из массива
initialCards.forEach((item) => {
  gallery.append(createCard(item.name, item.link));
});
