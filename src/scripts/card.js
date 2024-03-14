import { deleteCardUser, addLike, deleteLike } from "./api.js";

const template = document.querySelector("#card-template").content;

export function createCard(
  element,
  deleteCard,
  cardLike,
  createPopupImage,
  myId
) {
  const card = template.querySelector(".places__item").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  card.querySelector(".card__title").textContent = element.name;
  cardImage.src = element.link;
  cardImage.alt = element.name;

  cardImage.addEventListener("click", () => {
    createPopupImage(element);
  });

  const buttonRemove = card.querySelector(".card__delete-button");
  if (myId === element.owner._id) {
    buttonRemove.addEventListener("click", () => {
      deleteCard(element._id, card);
    });
  } else {
    buttonRemove.remove();
  }

  const buttonLikeCard = card.querySelector(".card__like-button");
  const numberLike = card.querySelector(".number__likes");

  numberLike.textContent = element.likes.length;

  if (element.likes.some((like) => like._id === myId)) {
    buttonLikeCard.classList.add("card__like-button_is-active");
  }

  buttonLikeCard.addEventListener("click", () => {
    cardLike(element._id, buttonLikeCard, numberLike);
  });

  return card;
}

export function cardLike(cardId, buttonLike, numberLike) {
  if (buttonLike.classList.contains("card__like-button_is-active")) {
    deleteLike(cardId)
      .then((res) => {
        buttonLike.classList.remove("card__like-button_is-active");
        numberLike.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    addLike(cardId)
      .then((res) => {
        buttonLike.classList.add("card__like-button_is-active");
        numberLike.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export function deleteCard(cardId, card) {
  deleteCardUser(cardId)
    .then((res) => {
      card.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}
