function toggleModal(popup) {
	popup.classList.toggle('popup_is-opened');
}

function openModal(popup) {
	toggleModal(popup);
	document.addEventListener('keydown', handleKeyDown);
}

function closeModal(popup) {
	toggleModal(popup);
	document.removeEventListener('keydown', handleKeyDown);
}

function handleModalClick(evt) {
	// для обработки кликов по оверлею
	if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__overlay')) {
		closeModal(evt.target.closest('.popup'));
	}
}

function handleKeyDown(evt) {
	if (evt.key === 'Escape') {
		const openedPopup = document.querySelector('.popup_is-opened');
		if (openedPopup) {
			closeModal(openedPopup);
		}
	}
}

// Вешаем обработчик клика на оверлей для всех модальных окон
document.querySelectorAll('.popup').forEach(popup => {
	popup.addEventListener('click', handleModalClick);
});

// Находим все кнопки закрытия и вешаем на них обработчик
document.querySelectorAll('.popup__close').forEach(closeButton => {
	closeButton.addEventListener('click', () => {
		const popup = closeButton.closest('.popup');
		closeModal(popup);
	});
});

export { openModal, closeModal, handleModalClick, handleKeyDown, toggleModal};