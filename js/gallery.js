import {
  MAX_PICTURE,
  MAX_AVATAR,
  MIN_LIKES,
  MAX_LIKES,
  MIN_COMMENTS,
  MAX_COMMENTS,
  DESCRIPTIONS,
  NAMES,
  MESSAGES
} from './data.js';
import { getRandomInteger, getRandomArrayElement } from './utils.js';
import { openBigPicture } from './big-picture.js';

const template = document.querySelector('#picture').content.querySelector('.picture');
const gallery = document.querySelector('.pictures');


const createComment = (id) => ({
  id,
  avatar: `avatars/${getRandomInteger(1, MAX_AVATAR)}.jpg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createPicture = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: Array.from(
    { length: getRandomInteger(MIN_COMMENTS, MAX_COMMENTS) },
    (_, i) =>
      createComment(i++)
  ),
});

const createGallery = () =>
  Array.from({ length: MAX_PICTURE }, (_, i) =>
    createPicture(i++)
  );

const createPictureElement = ({ url, description, likes, comments, id }) => {
  const thumbnail = template.cloneNode(true);

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

const pictureList = createGallery();

gallery.addEventListener('click', (evt) => {
  const thumbnailListener = evt.target.closest('[data-id]');

  if (!thumbnailListener) {
    return;
  }

  const pictureData = pictureList.find(
    (item) => item.id === +thumbnailListener.dataset.id
  );

  if (!pictureData) {

    return;
  }

  openBigPicture(pictureData);
});


renderGallery(pictureList);

