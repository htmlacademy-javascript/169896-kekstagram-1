import { isEscapeKey } from './utils.js';

const MIN_COMMENTS = 5;

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentsToShowCount = bigPicture.querySelector('.social__comment-count');
const showCommentsCount = commentsToShowCount.querySelector('.show-comments-count');

const arrayPictureComments = [].length;
let visibleComments = 0;

const createComment = ({ avatar, name, message }) => {
  const template = document.getElementById('comment-template');
  const comment = template.content.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = () => {
  visibleComments += MIN_COMMENTS;

  if (visibleComments >= arrayPictureComments) {
    commentsLoader.classList.add('hidden');
    visibleComments = arrayPictureComments;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < visibleComments; i++) {
    const commentElement = createComment(arrayPictureComments[i]);
    fragment.append(commentElement);
  }

  commentsContainer.replaceChildren(fragment);

  showCommentsCount.textContent = visibleComments;
};

const onCommentsLoaderClick = () => renderComments();
const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
}

export const openBigPicture = (picture) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments;
  bigPicture.querySelector('.social__caption').textContent = picture.description;

  renderComments();

  closeButton.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', onPopupEscKeydown);
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
};

