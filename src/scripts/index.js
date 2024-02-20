import '../pages/index.css';
import { createCard, deleteCard, cardLike } from './card.js';
import { initialCards } from './cards.js';
import { openModal, closeModal } from './modal.js';

const placesList = document.querySelector('.places__list');
const modalWindowProfile = document.querySelector('.popup_type_edit'); // окно с профилем
const modalWindowNewCard = document.querySelector('.popup_type_new-card'); // окно создания новой карточки
const modalWindowImage = document.querySelector('.popup_type_image'); //окно картинки
const modalOpenProfileButton = document.querySelector('.profile__edit-button'); //кнопка открытия профиля
const buttonClosePopupList = document.querySelectorAll('.popup__close'); // кнопка закртыия
const modalOpenNewCardButton = document.querySelector('.profile__add-button'); //кнопка открытия окна новой карточкиm
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const formProfile = document.querySelector('form[name = "edit-profile"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const formNewCard = document.querySelector('form[name = "new-place"]');
const nameCardInput = document.querySelector('.popup__input_type_card-name');
const linkInput = document.querySelector('.popup__input_type_url');
const popup = document.querySelectorAll('.popup');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');
const popupImage = popupTypeImage.querySelector('.popup__image');


function showCard(card) {
  placesList.prepend(card);
};

initialCards.forEach(function (element) {
  const card = createCard(element, deleteCard, cardLike, createPopupImage);
  showCard(card);
});

export function createPopupImage(element) {
  popupCaption.textContent = element.name;
  popupImage.src = element.link;
  popupImage.alt = element.name;
  openModal(modalWindowImage);
  return popupTypeImage;
};

popup.forEach(elem => {
elem.classList.add('popup_is-animated');
});

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

buttonClosePopupList.forEach(btn => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => closeModal(popup)); 
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup')) { 
      closeModal(popup); 
    } 
  });
}) 

// форма инфо о себе
function addFormProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(modalWindowProfile);
};

formProfile.addEventListener('submit', addFormProfile);

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
};

formNewCard.addEventListener('submit', addFormCard);