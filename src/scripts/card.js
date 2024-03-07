// Подключение функций из API
import { addLike, deleteLike, onDelete } from './api.js';

// Получение шаблона карточки
const cardTemplate = document.querySelector('#card-template').content;

// Функция для создания карточки
function createCard(item, openImage, myId) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likesCounter = cardElement.querySelector('.card__likes-counter');

    likesCounter.textContent = item.likes.length;
    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardTitle.textContent = item.name;

    // Устанавливаем видимость кнопки удаления
    setDeleteButton(item, myId, deleteButton);

    // Обработчик удаления карточки
    deleteButton.addEventListener('click', () => {
        onDelete(item._id)
            .then(() => {
                const cardElement = deleteButton.closest('.card');
                cardElement.remove();
            })
            .catch(err => console.log(err));
    });

    // Обработчик лайка карточки
    likeButton.addEventListener('click', () => {
        const likeMethod = likeButton.classList.contains('card__like-button_is-active') ? deleteLike : addLike;
        likeMethod(item._id)
            .then(data => {
                likeButton.classList.toggle('card__like-button_is-active');
                likesCounter.textContent = data.likes.length;
            })
            .catch(err => console.log(err));
    });

    // Обработчик открытия изображения
    cardImage.addEventListener('click', () => openImage(item.name, item.link));

    return cardElement;
}

export { createCard };

// Функция установки кнопки удаления
function setDeleteButton(card, myId, deleteButton) {
    if (card.owner._id === myId) {
        deleteButton.style.display = 'block'; // Показать кнопку
    } else {
        deleteButton.style.display = 'none'; // Скрыть кнопку
    }
}