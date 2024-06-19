import { isEscapeKey } from './utils.js';

const isEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const CloseButtonClick = () => {
  closeBigPicture();
};

function closeBigPicture() {
  const bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', isEscKeydown);
}

export const openBigPicture = (picture) => {
  const bigPicture = document.querySelector('.big-picture');
  const closeButton = bigPicture.querySelector('.big-picture__cancel');
  const commentsLoader = bigPicture.querySelector('.comments-loader');
  const commentsContainer = bigPicture.querySelector('.social__comments');
  const commentsToShowCount = bigPicture.querySelector('.social__comment-count');
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  commentsLoader.classList.add('hidden');
  commentsToShowCount.classList.add('hidden');
  commentsContainer.classList.add('hidden');

  bigPicture.querySelector('.big-picture__img img').src = picture.src;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments;
  bigPicture.querySelector('.social__caption').textContent = picture.description;

  closeButton.addEventListener('click', CloseButtonClick);
  document.addEventListener('keydown', isEscKeydown);

};
