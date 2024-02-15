// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

//модальные окна
const modalWindowProfile = document.querySelector('.popup_type_edit'); // окно с профилем
const modalWindowNewCard = document.querySelector('.popup_type_new-card'); // окно создания новой карточки
const modalWindowImage = document.querySelector('.popup_type_image'); //окно картинки
const modalOpenProfileButton = document.querySelector('.profile__edit-button'); //кнопка открытия профиля
const buttonClosePopupList = document.querySelectorAll('.popup__close'); // кнопка закртыия
const modalOpenNewCardButton = document.querySelector('.profile__add-button'); //кнопка открытия окна новой карточкиm
//const popup = document.querySelectorAll('.popup');

const template = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

function showCard(card) {
  placesList.prepend(card);
}

initialCards.forEach(function (element) {
  const card = createCard(element, deleteCard, cardLike, createPopupImage);
  showCard(card);
});

function createCard(element, deleteCard, cardLike, createPopupImage) {
  const card = template.querySelector('.places__item').cloneNode(true);
  card.querySelector('.card__title').textContent = element.name;
  card.querySelector('.card__image').src = element.link;
  card.querySelector('.card__image').alt = element.alt;

  card.querySelector('.card__image').addEventListener('click', () => {
    createPopupImage(element);
    openModal(modalWindowImage);
  });
  const buttonRemove = card.querySelector('.card__delete-button');
  buttonRemove.addEventListener('click', () => {
    deleteCard(card);
  });
  const buttonLikeCard = card.querySelector('.card__like-button');
  buttonLikeCard.addEventListener('click', () => {
    cardLike(buttonLikeCard);
  });

  return card;
}

function deleteCard(card) {
  card.remove();
}

function cardLike(card) {
  card.classList.toggle('card__like-button_is-active');
}

function createPopupImage(element) {
  const card = document.querySelector('.popup_type_image');
  card.querySelector('.popup__caption').textContent = element.name;
  card.querySelector('.popup__image').src = element.link;
  card.querySelector('.popup__image').alt = element.alt;
  return card;
}

//функция открытия окон
function openModal(modal) {
  modal.classList.add('.popup_is-animated');
  modal.classList.add('popup_is-opened');
}

//функция закрытия на крестик
function closeModal(modal) {
  // modal.classList.add('.popup_is-animated');
  modal.classList.remove('popup_is-opened');
}

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
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
// закрытие вне области
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

document.addEventListener('keydown', (e) => {
  if (e.code === 'Escape') {
    closeModal(modalWindowProfile);
    closeModal(modalWindowNewCard);
    closeModal(modalWindowImage);
  }
});

// форма инфо о себе
const formElement = document.querySelector('form[name = "edit-profile"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(modalWindowProfile);
}

formElement.addEventListener('submit', handleFormSubmit);

//форма добавления карточек
const formNewCard = document.querySelector('form[name = "new-place"]');
const nameCardInput = document.querySelector('.popup__input_type_card-name');
const linkInput = document.querySelector('.popup__input_type_url');

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

//const formProfile = document.forms.edit-profile;
//const formProfileName = formProfile.elements.name;
//console.log(formProfile);
//popup.forEach( (modal) => {
//modal.classList.add('.popup_is-animated');
//console.log(modal)
//});
