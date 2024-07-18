import { debounce } from './utils.js';
import { openBigPicture } from './big-picture.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const gallery = document.querySelector('.pictures');
const filterButtons = document.querySelectorAll('.img-filters__button');
let photos = [];

const createPictureElement = ({ url, description, likes, comments, id }) => {
  const thumbnail = pictureTemplate.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.dataset.id = id;

  return thumbnail;
};

export const renderGallery = (pictures) => {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const pictureElement = createPictureElement(picture);

    fragment.append(pictureElement);
  });

  gallery.append(fragment);
};

const handleGalleryClick = (evt) => {
  const thumbnail = evt.target.closest('[data-id]');

  if (!thumbnail) {
    return;
  }

  const pictureData = photos.find(
    (item) => item.id === +thumbnail.dataset.id
  );

  if (!pictureData) {
    return;
  }

  openBigPicture(pictureData);
};

gallery.addEventListener('click', handleGalleryClick);

export const initGallery = (data) => {
  photos = data;

  renderGallery(photos);
};

///////// почему не рабоает эта часть кода? вроде всё верно
const removeThumbnails = () => {
  document.querySelectorAll('.picture').forEach((el) => el.remove());
};

const showDefaultPhotos = () => {
  removeThumbnails();
  createPictureElement(photos);
};

const showDiscussedPhotos = () => {
  removeThumbnails();
  createPictureElement(photos.slice().sort((a, b) => b.comments.length - a.comments.length));
};

const showRandomPhotos = () => {
  removeThumbnails();
  createPictureElement(photos.Math.floor(Math.random() * 10) + 1);
};

const activeFilter = (target) => {
  filterButtons.forEach((btn) => btn.classList.remove('img-filters__button--active'));
  target.classList.add('img-filters__button--active');
};

export const init = (photoList) => {
  photos = photoList;
  gallery.addEventListener('click', handleGalleryClick);

  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', (evt) => activeFilter(evt.target));
  });
  document.querySelector('#filter-default').addEventListener('click', debounce(showDefaultPhotos));
  document.querySelector('#filter-random').addEventListener('click', debounce(showRandomPhotos));
  document.querySelector('#filter-discussed').addEventListener('click', debounce(showDiscussedPhotos));

  showDefaultPhotos();
};
