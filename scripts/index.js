// Конфиг для валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

// Кнопки закрытия popup
const popupCloseButtons = document.querySelectorAll('.popup__close-button');

// Список всех popup
const popupList = document.querySelectorAll('.popup');

// Поля профиля на странице
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');

// Кнопка редактирования профиля
const profileEditButton = document.querySelector('.profile__edit-button');

// Popup редактирования профиля
const popupProfile = document.querySelector('.popup_type_profile');
const popupFormProfile = popupProfile.querySelector('.popup__form');
const inputName = popupProfile.querySelector('.popup__input_type_name');
const inputAbout = popupProfile.querySelector('.popup__input_type_about');

// Галерея для вставки карточки места
const gallery = document.querySelector('.gallery');

// Шаблон карточки места
const cardTemplate = document.querySelector('#cardTemplate').content;

// Кнопка добавления карточки места
const cardAddButton = document.querySelector('.profile__add-button');

// Popup создания карточки места
const popupCard = document.querySelector('.popup_type_card');
const popupFormCard = popupCard.querySelector('.popup__form');
const inputPlace = popupCard.querySelector('.popup__input_type_place');
const inputLink = popupCard.querySelector('.popup__input_type_link');

// Popup фотографии места
const popupFigure = document.querySelector('.popup_type_img');
const popupImg = popupFigure.querySelector('.popup__img');
const popupCaption = popupFigure.querySelector('.popup__caption');

// Открытие и закрытие popup
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    popupList.forEach((popup) => {
      if (popup.classList.contains('popup_opened')) {
        closePopup(popup);
      };
    });
  };
};

function openPopup(popup) {
  enableValidation(validationConfig);
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
};

popupCloseButtons.forEach((popupCloseButton) => {
  popupCloseButton.addEventListener('click', (evt) => {
    closePopup(evt.currentTarget.closest('.popup'));
  });
});

popupList.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    };
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
};

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

enableValidation(validationConfig);
