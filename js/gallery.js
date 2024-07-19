import { debounce } from './utils.js';
import { openBigPicture } from './big-picture.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const gallery = document.querySelector('.pictures');
const filterButtons = document.querySelectorAll('.img-filters__button');
const imgFilters = document.querySelector('.img-filters');
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

const sortByDiscussed = () => {
  removeThumbnails();
  renderGallery(photos.toSorted((a, b) => b.comments.length - a.comments.length));
};

const sortByRandom = () => {
  removeThumbnails();
  const randomPhotos = photos.sort(() => Math.random() - 0.5).slice(0, 10);
  renderGallery(randomPhotos);
};


export const initGallery = (data) => {
  photos = data;

  const activeFilter = (target) => {
    const activeButton = document.querySelector('.img-filters__button--active');
    if (activeButton) {
      activeButton.classList.remove('img-filters__button--active');
    }
    target.classList.add('img-filters__button--active');
  };

  imgFilters.classList.remove('img-filters--inactive');

  gallery.addEventListener('click', onHandleGalleryClick);

  filterButtons.forEach(button => {
    button.addEventListener('click', (evt) => {
      activeFilter(evt.target);

      switch (evt.target.id) {
        case 'filter-default':
          removeThumbnails();
          debounce(renderGallery(photos));
          break;
        case 'filter-random':
          debounce(sortByRandom(photos));
          break;
        case 'filter-discussed':
          debounce(sortByDiscussed(photos));
          break;
        default:
      }
    });
  });
  renderGallery(photos);
};
