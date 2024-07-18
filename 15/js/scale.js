const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imageUploadPreview = document.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  imageUploadPreview.style.transform = `scale(${value / 100})`;
  scaleControlValue.value = `${value}%`;
};

const getCurrentScaleLevel = () => parseInt(scaleControlValue.value, 10);

function onSmallerButtonClick() {
  const currentValue = getCurrentScaleLevel();
  const newValue = Math.max(MIN_SCALE, currentValue - SCALE_STEP);
  scaleImage(newValue);
}

const onBiggerButtonClick = () => {
  const currentValue = getCurrentScaleLevel();
  const newValue = Math.min(MAX_SCALE, currentValue + SCALE_STEP);
  scaleImage(newValue);
};

export const resetScale = () => scaleImage(DEFAULT_SCALE);

scaleControlSmaller.addEventListener('click', onSmallerButtonClick);
scaleControlBigger.addEventListener('click', onBiggerButtonClick);

