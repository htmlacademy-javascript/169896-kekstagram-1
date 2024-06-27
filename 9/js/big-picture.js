
// import { MAX_COMMENTS } from './data.js';
import { isEscapeKey } from './utils.js';

const MIN_COMMENTS = 5;
const DEFAULT_COMMENT_COUNT = 0;

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentsToShowCount = bigPicture.querySelector('.social__comment-count');
const showCommentsCount = commentsToShowCount.querySelector('.show-comments-count');
const commentsCount = commentsToShowCount.querySelector('.comments-count');

let visibleComments = 0;
let activePictureComments = [];

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

  if (visibleComments >= activePictureComments.length) {
    visibleComments = activePictureComments.length;
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const commentsToRender = activePictureComments.slice(visibleComments, visibleComments + MIN_COMMENTS);
  const fragment = document.createDocumentFragment();

  commentsToRender.forEach((comment) => {
    fragment.append(createComment(comment));
  });

  commentsContainer.innerHTML = '';
  commentsContainer.replaceChildren(fragment);
  showCommentsCount.textContent = visibleComments;
  // commentsCount.textContent = MAX_COMMENTS;
};

const resetComments = () => {
  visibleComments = DEFAULT_COMMENT_COUNT ;
  activePictureComments = [];
  commentsContainer.innerHTML = '';
  commentsToShowCount.textContent = DEFAULT_COMMENT_COUNT ;
  showCommentsCount.textContent = DEFAULT_COMMENT_COUNT ;
};

const onCommentsLoaderClick = () => renderComments();

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

export const openBigPicture = (picture) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  activePictureComments = picture.comments;
  commentsCount.textContent = activePictureComments.length;

  renderComments();

  closeButton.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', onDocumentKeydown);
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
};

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);

  resetComments();
}
