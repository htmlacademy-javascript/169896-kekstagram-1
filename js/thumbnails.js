import { arrayPhotos } from './data.js';

const thumbnailsList = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const thumbnailsFragment = document.createDocumentFragment();

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
  arrayPhotos.forEach((photoData) => {
    const thumbnail = createPictureElement(photoData);
    thumbnailsFragment.append(thumbnail);
  });

  thumbnailsList.append(thumbnailsFragment);
};


