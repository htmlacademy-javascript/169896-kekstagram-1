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
import { arrayPhotos } from './data.js';

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

export const createGallery = () =>
  Array.from({ length: MAX_PICTURE }, (_, i) =>
    createPicture(i++)
  );


const gallery = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');


const createPictureElement = ({ url, description, likes, comments }) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  const thumbnailsImage = thumbnail.querySelector('.picture__img');

  thumbnailsImage.src = url;
  thumbnailsImage.alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;

  return thumbnail;
};

export const renderThumbnails = () => {
  const thumbnailsFragment = document.createDocumentFragment();
  arrayPhotos.forEach((photoData) => {
    const thumbnail = createPictureElement(photoData);
    thumbnailsFragment.append(thumbnail);
  });

  gallery.append(thumbnailsFragment);
};
