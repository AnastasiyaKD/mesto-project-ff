// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const template = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

initialCards.forEach(function (element) {
  const card = createCard(element, deleteCard);
  placesList.prepend(card);
});

function createCard(element, deleteCard) {
  const card = template.querySelector('.places__item').cloneNode(true);
  card.querySelector('.card__title').textContent = element.name;
  card.querySelector('.card__image').src = element.link;
  card.querySelector('.card__image').alt = element.alt;
  const buttonRemove = card.querySelector('.card__delete-button');
  buttonRemove.addEventListener('click', function () {
    deleteCard(card);
  });
  return card;
}

function deleteCard(card) {
  card.remove();
}
