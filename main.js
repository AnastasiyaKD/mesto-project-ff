(()=>{"use strict";var e=document.querySelector("#card-template").content;function t(t,n,o,r){var c=e.querySelector(".places__item").cloneNode(!0),u=c.querySelector(".card__image");c.querySelector(".card__title").textContent=t.name,u.src=t.link,u.alt=t.name,u.addEventListener("click",(function(){r(t)})),c.querySelector(".card__delete-button").addEventListener("click",(function(){n(c)}));var p=c.querySelector(".card__like-button");return p.addEventListener("click",(function(){o(p)})),c}function n(e){e.remove()}function o(e){e.classList.toggle("card__like-button_is-active")}function r(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",u)}function c(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",u)}function u(e){"Escape"===e.key&&c(document.querySelector(".popup_is-opened"))}var p=document.querySelector(".places__list"),d=document.querySelector(".popup_type_edit"),a=document.querySelector(".popup_type_new-card"),i=document.querySelector(".popup_type_image"),l=document.querySelector(".profile__edit-button"),s=document.querySelectorAll(".popup__close"),m=document.querySelector(".profile__add-button"),_=document.querySelector(".profile__title"),y=document.querySelector(".profile__description"),f=document.querySelector('form[name = "edit-profile"]'),v=document.querySelector(".popup__input_type_name"),k=document.querySelector(".popup__input_type_description"),q=document.querySelector('form[name = "new-place"]'),S=document.querySelector(".popup__input_type_card-name"),L=document.querySelector(".popup__input_type_url"),E=document.querySelectorAll(".popup"),g=document.querySelector(".popup_type_image"),h=g.querySelector(".popup__caption"),x=g.querySelector(".popup__image");function b(e){p.prepend(e)}function j(e){return h.textContent=e.name,x.src=e.link,x.alt=e.name,r(i),g}[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){b(t(e,n,o,j))})),E.forEach((function(e){e.classList.add("popup_is-animated")})),l.addEventListener("click",(function(){v.value=_.textContent,k.value=y.textContent,r(d)})),m.addEventListener("click",(function(){r(a)})),s.forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){return c(t)})),t.addEventListener("mousedown",(function(e){e.target.classList.contains("popup")&&c(t)}))})),f.addEventListener("submit",(function(e){e.preventDefault(),_.textContent=v.value,y.textContent=k.value,c(d)})),q.addEventListener("submit",(function(e){e.preventDefault(),b(t({name:S.value,link:L.value,alt:S.value},n,o,j)),q.reset(),c(a)}))})();