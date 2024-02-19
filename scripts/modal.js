//функция открытия окон
export function openModal(modal) {
  modal.classList.add('popup_is-animated', 'popup_is-opened');
}

//функция закрытия на крестик
export function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
}
