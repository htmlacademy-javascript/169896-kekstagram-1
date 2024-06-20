import { MIN_COMMENTS } from './data.js';
import { isEscapeKey } from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentsToShowCount = bigPicture.querySelector('.social__comment-count');

let viewComments = 0;
const arrayComments = [];

const createComment = ({ avatar, name, message }) => {
  const comment = document.createElement('li');
  comment.innerHTML =
  '<img class="social__picture" src="" alt="" width="35" height="35">';
  comment.classList.add('social__comment');

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = () => {
  viewComments += MIN_COMMENTS;

  if (viewComments >= arrayComments.length) {
    commentsLoader.classList.add('hidden');
    viewComments = arrayComments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < viewComments; i++) {
    const commentElement = createComment(arrayComments[i]);
    fragment.append(commentElement);
  }

  commentsContainer.innerHTML = '';
  commentsContainer.append(fragment);
  commentsToShowCount.innerHTML = `${viewComments} из <span class="comments-count">${arrayComments.length}</span> комментариев`;
};

const commentsLoaderClick = () => renderComments();

const tapEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const tapCloseButtonClick = () => {
  closeBigPicture();
};

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', tapEscKeydown);
  commentsLoader.removeEventListener('click', commentsLoaderClick);
}

export const openBigPicture = (picture) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPicture.querySelector('.big-picture__img img').src = picture.src;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments;
  bigPicture.querySelector('.social__caption').textContent = picture.description;

  closeButton.addEventListener('click', tapCloseButtonClick);
  document.addEventListener('keydown', tapEscKeydown);
  commentsLoader.addEventListener('click', commentsLoaderClick);
};
