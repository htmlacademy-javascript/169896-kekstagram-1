import { debounce } from './utils.js';
import { openBigPicture } from './big-picture.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const gallery = document.querySelector('.pictures');
const filterButtons = document.querySelectorAll('.img-filters__button');
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

const onHandleGalleryClick = (evt) => {
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

const sortByDiscussed = (a, b) => b.comments.length - a.comments.length;

const sortByRandom = () => Math.random() - 0.5;

//// ЕСЛИ РАСКОММЕНТИРОВАТЬ ВМЕСТО ВЕРХНИХ ТО ВСЁ РАБОТАЕТ

// const sortByDiscussed = () => {
//   removeThumbnails();
//   renderGallery(photos.toSorted((a, b) => b.comments.length - a.comments.length));
// };

// const sortByRandom = () => {
//   removeThumbnails();
//   renderGallery(photos.toSorted(() => Math.random() - 0.5).slice(0, 10));
// };

const activeFilter = (target) => {
  const activeButton = document.querySelector('.img-filters__button--active');
  if (activeButton) {
    activeButton.classList.remove('img-filters__button--active');
  }
  target.classList.add('img-filters__button--active');
};

// РАБОЧИЙ КОД

debounce(filterButtons.forEach(button => {
  button.addEventListener('click', (evt) => {
    activeFilter(evt.target);

    switch (evt.target.id) {
      case FilterTypes.DEFAULT:
        removeThumbnails();
        return renderGallery(photos);
      case FilterTypes.RANDOM:
        return [...photos].toSorted(sortByRandom()).slice(0, 10);
      case FilterTypes.DISCUSSED:
        return [...photos].toSorted(sortByDiscussed());
      default:
        return [...photos];
    }
  });
})
);

export const initGallery = (data) => {
  photos = data;
  gallery.addEventListener('click', onHandleGalleryClick);
  imgFilters.classList.remove('img-filters--inactive');
  renderGallery(photos);
};
