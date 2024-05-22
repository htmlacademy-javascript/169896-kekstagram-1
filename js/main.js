const MAX_PICTURE = 25;
const avatar = 6;

const MIN_LIKES = 15;
const MAX_LIKES = 200;

const MIN_COMMENTS = 5;
const MAX_COMMENTS = 20;


const descriptions = [
  'Семья',
  'На природе',
  'Отдых',
  'Работа',
  'Скучные будни',
  'Тренировка'
];
const names = [
  'Иван Дорн',
  'Джон Сина',
  'Мария Шукшина',
  'Гай Ричи',
  'Виктория Складчикова',
  'Юлия Малик',
  'Люда Какаянибудь',
  'Златан Ибрагимович',
];
const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];


const createComment = (id) => ({
  id,
  avatar: `avatars/${getRandomInteger(1, avatar)}.jpg`,
  message: getRandomArrayElement(messages),
  name: getRandomArrayElement(names),
});

const createPicture = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(descriptions),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: Array.from(
    { length: getRandomInteger(MIN_COMMENTS, MAX_COMMENTS) },
    (_, comentIndex) =>
      createComment(comentIndex + 1)
  ),
});

const createGallery = () =>
  Array.from({ length: MAX_PICTURE }, (_, pictureIndex) =>
    createPicture(pictureIndex + 1)
  );

const photos = createGallery();
console.log(photos);
