import { isEscapeKey } from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentsToShowCount = bigPicture.querySelector('.social__comment-count');
const showCommentsCount = commentsToShowCount.querySelector('.show-comments-count');
const commentsCount = bigPicture.querySelector('.comments-count');


const MIN_COMMENTS = 5;
const arrayComments = [];
const arrayPictureComments = arrayComments.length;
let viewComments = 0;

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

  if (viewComments >= arrayPictureComments) {
    commentsLoader.classList.add('hidden');
    viewComments = arrayPictureComments;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < viewComments; i++) {
    const commentElement = createComment(arrayPictureComments[i]);

    fragment.append(commentElement);
  }

  commentsContainer.innerHTML = '';
  commentsContainer.append(fragment);

  showCommentsCount.querySelector('.show-comments-count').textContent = viewComments;
  commentsCount.querySelector('.comments-count').textContent = arrayPictureComments;
};

renderComments();

const onTapEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const onCloseButtonClick = () => {
  closeBigPicture();
};

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onTapEscKeydown);
}

export const openBigPicture = (picture) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPicture.querySelector('.big-picture__img img').src = picture.src;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments;
  bigPicture.querySelector('.social__caption').textContent = picture.description;

  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onTapEscKeydown);
};
