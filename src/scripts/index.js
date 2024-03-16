import "../pages/index.css";
import { createCard, deleteCard, cardLike } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import {
  clearValidation,
  enableValidation,
  blockButton,
} from "./validation.js";
import {
  getUserProfile,
  getCards,
  patchProfile,
  addNewCard,
  changeAvatar,
} from "./api.js";

const placesList = document.querySelector(".places__list");
const modalWindowProfile = document.querySelector(".popup_type_edit"); // окно с профилем
const modalWindowNewCard = document.querySelector(".popup_type_new-card"); // окно создания новой карточки
const modalWindowImage = document.querySelector(".popup_type_image"); //окно картинки
const modalOpenProfileButton = document.querySelector(".profile__edit-button"); //кнопка открытия профиля
const buttonClosePopupList = document.querySelectorAll(".popup__close"); // кнопка закртыия
const modalOpenNewCardButton = document.querySelector(".profile__add-button"); //кнопка открытия окна новой карточкиm
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const formProfile = document.querySelector('form[name = "edit-profile"]');
const nameInputProfileForm = document.querySelector(".popup__input_type_name");
const jobInputProfileForm = document.querySelector(
  ".popup__input_type_description"
);
const formNewCard = document.querySelector('form[name = "new-place"]');
const nameCardInput = document.querySelector(".popup__input_type_card-name");
const linkInput = document.querySelector(".popup__input_type_url");
const popupList = document.querySelectorAll(".popup");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");
const popupImage = popupTypeImage.querySelector(".popup__image");
const modalWindowChangeAvatar = document.querySelector(".popup_type_avatar"); //окно смены аватара
const modalOpenAvatarButton = document.querySelector(".profile__avatar-button"); // кнопка открытия смены аватара
const formAvatar = document.querySelector('form[name ="change_avatar"]'); //форма аватара
const profileAvatarInput = document.querySelector(
  ".popup__input_type_url_avatar"
); // поле url аватара
const popupSaveButton = document.querySelectorAll(".popup__button");
const profileImage = document.querySelector(".profile__image");
let myId = "";

function showCard(card) {
  placesList.append(card);
}

function createPopupImage(element) {
  popupCaption.textContent = element.name;
  popupImage.src = element.link;
  popupImage.alt = element.name;
  openModal(modalWindowImage);
  return popupTypeImage;
}

popupList.forEach((elem) => {
  elem.classList.add("popup_is-animated");
});

// открытие с профилем
modalOpenProfileButton.addEventListener("click", () => {
  nameInputProfileForm.value = profileName.textContent;
  jobInputProfileForm.value = profileJob.textContent;
  openModal(modalWindowProfile);
  clearValidation(formProfile, validationConfig);
  blockButton(formProfile, validationConfig);
});

// открытие окна добавления
modalOpenNewCardButton.addEventListener("click", () => {
  openModal(modalWindowNewCard);
  blockButton(formNewCard, validationConfig);
});

buttonClosePopupList.forEach((btn) => {
  const popup = btn.closest(".popup");
  btn.addEventListener("click", () => closeModal(popup));
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closeModal(popup);
    }
  });
});

// открытие окна смены аватара
modalOpenAvatarButton.addEventListener("click", () => {
  openModal(modalWindowChangeAvatar);
  blockButton(formAvatar, validationConfig);
});

// форма инфо о себе
function addFormProfile(evt) {
  evt.preventDefault();
  savePopup("Сохранение...");
  patchProfile(nameInputProfileForm.value, jobInputProfileForm.value)
    .then((res) => {
      profileName.textContent = nameInputProfileForm.value;
      profileJob.textContent = jobInputProfileForm.value;
      closeModal(modalWindowProfile);
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      savePopup("Сохранить");
    });
}

formProfile.addEventListener("submit", addFormProfile);

//форма добавления аватара
function addNewAvatar(evt) {
  evt.preventDefault();
  savePopup("Сохранение...");
  changeAvatar(profileAvatarInput.value)
    .then(() => {
      profileImage.style.backgroundImage = `url(${profileAvatarInput.value})`;
      clearValidation(formAvatar, validationConfig);
      closeModal(modalWindowChangeAvatar);
      formAvatar.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      savePopup("Сохранить");
    });
}

formAvatar.addEventListener("submit", addNewAvatar);

//форма добавления карточек
function addFormCard(evt) {
  evt.preventDefault();
  savePopup("Сохранение...");
  const newObj = {
    name: nameCardInput.value,
    link: linkInput.value,
  };
  addNewCard(newObj.name, newObj.link)
    .then((res) => {
      const newCard = createCard(
        res,
        deleteCard,
        cardLike,
        createPopupImage,
        myId
      );
      placesList.prepend(newCard);
      clearValidation(formNewCard, validationConfig);
      formNewCard.reset();
      closeModal(modalWindowNewCard);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      savePopup("Сохранить");
    });
}

formNewCard.addEventListener("submit", addFormCard);

//функция улучшения UX
function savePopup(text) {
  popupSaveButton.forEach((button) => {
    button.innerText = text;
  });
}

const setUserProfile = (resolt) => {
  profileName.textContent = resolt.name;
  profileJob.textContent = resolt.about;
  const avatar = document.querySelector(".profile__image");
  avatar.style.backgroundImage = `url(${resolt.avatar})`;
};

const getPromises = [getUserProfile(), getCards()];
Promise.all(getPromises)
  .then((result) => {
    const [userProfileResult, cardsResult] = result;
    myId = userProfileResult._id;
    cardsResult.forEach((elem) => {
      const newCard = createCard(
        elem,
        deleteCard,
        cardLike,
        createPopupImage,
        myId
      );
      showCard(newCard);
      setUserProfile(userProfileResult);
    });
  })
  .catch((err) => {
    console.log(err);
  });

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button-inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "form__input-error_active",
};

enableValidation(validationConfig);
