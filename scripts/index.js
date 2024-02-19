import { createCard, deleteCard, cardLike } from './card.js';
import { initialCards } from './cards.js';
import { openModal, closeModal } from './modal.js';

export const template = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');
const modalWindowProfile = document.querySelector('.popup_type_edit'); // окно с профилем
const modalWindowNewCard = document.querySelector('.popup_type_new-card'); // окно создания новой карточки
export const modalWindowImage = document.querySelector('.popup_type_image'); //окно картинки
const modalOpenProfileButton = document.querySelector('.profile__edit-button'); //кнопка открытия профиля
const buttonClosePopupList = document.querySelectorAll('.popup__close'); // кнопка закртыия
const modalOpenNewCardButton = document.querySelector('.profile__add-button'); //кнопка открытия окна новой карточкиm
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const formElement = document.querySelector('form[name = "edit-profile"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const formNewCard = document.querySelector('form[name = "new-place"]');
const nameCardInput = document.querySelector('.popup__input_type_card-name');
const linkInput = document.querySelector('.popup__input_type_url');

function showCard(card) {
  placesList.prepend(card);
}

initialCards.forEach(function (element) {
  const card = createCard(element, deleteCard, cardLike, createPopupImage);
  showCard(card);
});

export function createPopupImage(element) {
  const card = document.querySelector('.popup_type_image');
  card.querySelector('.popup__caption').textContent = element.name;
  card.querySelector('.popup__image').src = element.link;
  card.querySelector('.popup__image').alt = element.alt;
  return card;
}

// открытие с профилем
modalOpenProfileButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openModal(modalWindowProfile);
});

// открытие окна добавления
modalOpenNewCardButton.addEventListener('click', () => {
  openModal(modalWindowNewCard);
});

//закрытие вне области
buttonClosePopupList.forEach((button, idx) => {
  button.addEventListener('click', () => {
    if (idx === 0) {
      closeModal(modalWindowProfile);
    }
    if (idx === 1) {
      closeModal(modalWindowNewCard);
    }
    closeModal(modalWindowImage);
  });
});

modalWindowProfile.addEventListener('click', (e) => {
  if (!e.target.closest('.popup__content')) {
    closeModal(modalWindowProfile);
  }
});

modalWindowNewCard.addEventListener('click', (e) => {
  if (!e.target.closest('.popup__content')) {
    closeModal(modalWindowNewCard);
  }
});

modalWindowImage.addEventListener('click', (e) => {
  if (!e.target.closest('.popup__content')) {
    closeModal(modalWindowImage);
  }
});

//закрытие на esc
document.addEventListener('keydown', (e) => {
  if (e.code === 'Escape') {
    closeModal(modalWindowProfile);
    closeModal(modalWindowNewCard);
    closeModal(modalWindowImage);
  }
});

// форма инфо о себе
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(modalWindowProfile);
}

formElement.addEventListener('submit', handleFormSubmit);

//форма добавления карточек
function addFormCard(evt) {
  evt.preventDefault();
  const newObj = {
    name: nameCardInput.value,
    link: linkInput.value,
    alt: nameCardInput.value,
  };
  const newCard = createCard(newObj, deleteCard, cardLike, createPopupImage);
  showCard(newCard);
  formNewCard.reset();
  closeModal(modalWindowNewCard);
}

formNewCard.addEventListener('submit', addFormCard);
