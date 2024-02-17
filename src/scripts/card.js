import { openModal } from './modal.js';

// @todo: Темплейт карточки
// Получение шаблона карточки из документа
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
// Определение контейнера для вставки карточек
const cardsContainer = document.querySelector('.places__list');

//Функция лайка карточки
function addLike(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

// @todo: Функция создания карточки
// Функция для создания карточки
function createCard(item, onDelete) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');

    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardTitle.textContent = item.name;
    deleteButton.addEventListener('click', () => onDelete(cardElement));
    likeButton.addEventListener('click', addLike);
    cardImage.addEventListener('click', () => {
        const imagePopup = document.querySelector('.popup_type_image');
        const popupImage = imagePopup.querySelector('.popup__image');
        const imageTitle = imagePopup.querySelector('.popup__caption');

        popupImage.src = item.link;
        popupImage.alt = item.name;
        imageTitle.textContent = item.name;

        openModal(imagePopup);});

    return cardElement;
}

// @todo: Функция удаления карточки
// Функция для удаления карточки
function onDelete(cardElement) {
    cardElement.remove();
}

export {createCard, onDelete, addLike};