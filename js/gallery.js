import { createUniqueRandomIdGenerator, debounce } from './utils.js';
import { openBigPicture } from './big-picture.js';

const gallery = document.querySelector('.pictures');
const filterButtons = document.querySelectorAll('.img-filters__button');
let photos = [];


// const createComment = (id) => ({
//   id,
//   avatar: `img/avatar-${getRandomInteger(1, MAX_AVATAR)}.svg`,
//   message: getRandomArrayElement(MESSAGES),
//   name: getRandomArrayElement(NAMES),
// });

// const createPicture = (id) => ({
//   id,
//   url: `photos/${id}.jpg`,
//   description: getRandomArrayElement(DESCRIPTIONS),
//   likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
//   comments: Array.from(
//     { length: getRandomInteger(MIN_COMMENTS, MAX_COMMENTS) },
//     (_, i) =>
//       createComment(i++)),
// });


const getThumbnailClick = () => (evt) => {
  if (evt.target.matches('img')) {
    evt.preventDefault();
    const photoId = evt.target.parentNode.dataset.photoId;
    openBigPicture(photos.find((photo) => photo.id === parseInt(photoId, 10)));
  }
};

// const createGallery = () =>
//   Array.from({ length: MAX_PICTURE }, (_, i) =>
//     createPicture(i));

// const pictureList = createGallery(25);

const createPictureElement = (template, photo) => {
  const thumbnail = template.querySelector('.picture').cloneNode(true);

  thumbnail.querySelector('.picture__img').src = photo.url;
  thumbnail.querySelector('.picture__likes').textContent = photo.likes;
  thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;
  thumbnail.dataset.photoId = photo.id;

  return thumbnail;
};
////////////////////
const createThumbnails = (photoList) => {
  const fragment = document.createDocumentFragment();
  const templateContent = document.querySelector('#picture').content;
  for (const photo of photoList) {
    const thumbnail = createPictureElement(templateContent, photo);
    fragment.append(thumbnail);
  }

  gallery.append(fragment);
};

const removeThumbnails = () => {
  document.querySelectorAll('.picture').forEach((el) => el.remove());
};

const showDefaultPhotos = () => {
  removeThumbnails();
  createThumbnails(photos);
};

const showDiscussedPhotos = () => {
  removeThumbnails();
  createThumbnails(photos.slice().sort((a, b) => b.comments.length - a.comments.length));
};

const showRandomPhotos = () => {
  const getRandomPhotoId = createUniqueRandomIdGenerator(0, photos.length - 1);
  const currentPhotos = [];
  for (let i = 0; i < 10; i++) {
    currentPhotos.push(photos[getRandomPhotoId()]);
  }
  removeThumbnails();
  createThumbnails(currentPhotos);
};

const activeFilter = (target) => {
  filterButtons.forEach((btn) => btn.classList.remove('img-filters__button--active'));
  target.classList.add('img-filters__button--active');
};

export const initThumbnails = (photoList) => {
  photos = photoList;
  const onThumbnailClick = getThumbnailClick();
  gallery.addEventListener('click', onThumbnailClick);

  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  filterButtons.forEach((button) => {
    button.addEventListener('click', (evt) => activeFilter(evt.target));
  });
  document.querySelector('#filter-default').addEventListener('click', debounce(showDefaultPhotos));
  document.querySelector('#filter-random').addEventListener('click', debounce(showRandomPhotos));
  document.querySelector('#filter-discussed').addEventListener('click', debounce(showDiscussedPhotos));

  showDefaultPhotos();
};
