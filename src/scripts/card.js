const template = document.querySelector('#card-template').content;

export function createCard(element, deleteCard, cardLike, createPopupImage) {
  const card = template.querySelector('.places__item').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  card.querySelector('.card__title').textContent = element.name;
  cardImage.src = element.link;
  cardImage.alt = element.name;

  cardImage.addEventListener('click', () => {
    createPopupImage(element);
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
