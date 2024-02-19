import { template, modalWindowImage } from './index.js';
import { openModal } from './modal.js';

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
