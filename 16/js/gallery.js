import { debounce } from './utils.js';
import { openBigPicture } from './big-picture.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const gallery = document.querySelector('.pictures');
const imgFilters = document.querySelector('.img-filters');

const FilterTypes = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};
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

const renderGallery = (pictures) => {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const pictureElement = createPictureElement(picture);

    fragment.append(pictureElement);
  });

  gallery.append(fragment);
};

const onGalleryClick = (evt) => {
  const thumbnail = evt.target.closest('[data-id]');

  if (!thumbnail) {
    return;
  }

  const photoData = photos.find(
    (item) => item.id === +thumbnail.dataset.id
  );

  if (!photoData) {
    return;
  }

  openBigPicture(photoData);
};

const removeThumbnails = () => {
  document.querySelectorAll('.picture').forEach((el) => el.remove());
};

const sortByDiscussed = () => photos.toSorted((a, b) => b.comments.length - a.comments.length);

const sortByRandom = () => photos.toSorted(() => Math.random() - 0.5).slice(0, 10);

const activeFilter = (el) => {
  const activeButton = document.querySelector('.img-filters__button--active');
  activeButton?.classList.remove('img-filters__button--active');
  el.classList.add('img-filters__button--active');
};

const sortPhotos = (filter) => {
  switch (filter) {
    case FilterTypes.RANDOM:
      return sortByRandom(photos);
    case FilterTypes.DISCUSSED:
      return sortByDiscussed(photos);
    default:
      return photos;
  }
};

const onDebouncedFilter = debounce((evt) => {
  if (!evt.target.classList.contains('img-filters__button')) {
    return;
  }

  activeFilter(evt.target);

  const sortedPhotos = sortPhotos(evt.target.id);

  removeThumbnails();
  renderGallery(sortedPhotos);
});

export const initGallery = (data) => {
  photos = data;
  imgFilters.classList.remove('img-filters--inactive');
  imgFilters.addEventListener('click', onDebouncedFilter);
  gallery.addEventListener('click', onGalleryClick);
  renderGallery(photos);
};