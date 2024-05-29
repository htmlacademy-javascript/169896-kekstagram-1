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

import { getRandomInteger, getRandomArrayElement } from './util.js';


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
