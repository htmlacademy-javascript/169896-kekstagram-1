export const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
};

export const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

export const isEscapeKey = (evt) => evt.key === 'Escape';

export function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export const createUniqueRandomIdGenerator = (min, max) => {
  const generatedValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (generatedValues.length >= (max - min + 1)) {
      throw new Error(`${min} до ${max}`);
    }
    while (generatedValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    generatedValues.push(currentValue);
    return currentValue;
  };
};
