
export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
      alt: "Горы с растительностью",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
      alt: "Горы в снегу с рекой",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
      alt: "много панельных домов",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
      alt: "Гора на заднем плане, на первом плане предгорная раснина с растительностью",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
      alt: "Рельсы пролегающие через лес",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
      alt: "Гора на берегу заледеневшего озера",
    }
];


 export function createCard(element, deleteCard, cardLike, createPopupImage) {
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
};

export function deleteCard(card) {
  card.remove();
};

export function cardLike(card) {
  card.classList.toggle('card__like-button_is-active');
};

