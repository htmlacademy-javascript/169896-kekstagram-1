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

const onOpenBigPicture = (evt) => {
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

// const sortByDiscussed = () => ((a, b) => b.comments.length - a.comments.length);

// const sortByRandom = () => (Math.random() - 0.5).slice(0, 10);

//// ЕСЛИ РАСКОММЕНТИРОВАТЬ ВМЕСТО ВЕРХНИХ ТО ВСЁ РАБОТАЕТ, Я ВСЁ ПЕРЕБРАЛ В ЭТИХ ФИЛЬТРАХ Я ХЗ

const sortByDiscussed = (a, b) => b.comments.length - a.comments.length;


const sortByRandom = () => Math.floor(Math.random() * 10) + 1;


const activeFilter = (target) => {
  const activeButton = document.querySelector('.img-filters__button--active');
  if (activeButton) {
    activeButton.classList.remove('img-filters__button--active');
  }
  target.classList.add('img-filters__button--active');
};

debounce(imgFilters.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('img-filters__button')) {
    activeFilter(evt.target);


    switch (evt.target.id) {
      case FilterTypes.RANDOM:
        photos.toSorted(sortByRandom());
        break;
      case FilterTypes.DISCUSSED:
        photos.toSorted(sortByDiscussed());
        break;
      default:
        removeThumbnails();
        return renderGallery(photos);
    }
    renderGallery(photos);
  }
}));


export const initGallery = (data) => {
  photos = data;
  imgFilters.classList.remove('img-filters--inactive');
  gallery.addEventListener('click', onOpenBigPicture);
  renderGallery(photos);
};

