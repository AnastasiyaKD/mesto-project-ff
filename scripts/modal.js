import {modalWindowImage, modalWindowNewCard, modalWindowProfile, buttonClosePopupList } from "./index.js";

//функция открытия окон
export function openModal(modal) {
  modal.classList.add('popup_is-animated', 'popup_is-opened');
}

//функция закрытия на крестик
export function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
}


window.onload =  () => {
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

}
//закрытие на esc
document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') {
      closeModal(modalWindowProfile);
      closeModal(modalWindowNewCard);
      closeModal(modalWindowImage);
    }
  });

  