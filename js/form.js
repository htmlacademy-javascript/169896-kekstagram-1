import { showErrorDialog, showSuccessDialog } from './dialogs.js';
import { resetEffects } from './effects.js';
import { resetScale } from './scale.js';
import { sendData } from './api.js';

const HASHTAG_MAX_COUNT = 5;
const COMMENT_MAX_LENGTH = 140;
const HASHTAG_ERROR_MESSAGE = 'Неверный формат хэштэгов';
const COMMENT_ERROR_MESSAGE = `Длина комментария не может составлять больше ${COMMENT_MAX_LENGTH} символов`;
const TAG_PATTERN = /^#[a-za-яё0-9]{1,19}$/i;

// const uploadImageInput = document.querySelector('#upload-file');
const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('.img-upload__cancel');
const fileField = document.querySelector('.img-upload__input');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const showForm = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

export const hideForm = () => {
  form.reset();
  resetScale();
  resetEffects();
  pristine.reset();
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const isTextFieldFocused = () =>
  document.activeElement === hashtagField ||
  document.activeElement === commentField;

const normalizeTags = (tagString) => tagString
  .trim()
  .split(' ')
  .filter((tag) => Boolean(tag.length));

const isCommentValid = (value) => value.length <= COMMENT_MAX_LENGTH;

const isTagsCountValid = (tags) => tags.length <= HASHTAG_MAX_COUNT;

const isTagsUnique = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());

  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const isTagsValid = (tags) => tags.every((tag) => TAG_PATTERN.test(tag));

const validateHashTags = (value) => {
  const tags = normalizeTags(value);

  return isTagsCountValid(tags) && isTagsUnique(tags) && isTagsValid(tags);
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !isTextFieldFocused()) {
    evt.preventDefault();
    hideForm();
  }
}

const onCancelButtonClick = () => {
  hideForm();
};

const onFileInputChange = () => {
  showForm();
};


const toggleSubmitButton = (disabled) => {
  submitButton.disabled = disabled;
  submitButton.textContent = disabled ? SubmitButtonText.SENDING : SubmitButtonText.IDLE;
};

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    toggleSubmitButton(true);
    sendData(new FormData(evt.target))
      .then(
        () => {
          hideForm();
          showSuccessDialog();
        }
      )
      .catch(
        (err) => {
          showErrorDialog(err.message);
        }
      )
      .finally(() => toggleSubmitButton(false));
  }
});

// const imageSelect = () => {
//   overlay.classList.remove('hidden');
//   document.body.classList.add('modal-open');

//   const reader = new FileReader();
//   reader.onload = function(event) {
//     imageUploadPreview.src = event.target.result;
//   };
//   reader.readAsDataURL(uploadImageInput.files[0]);

//   resetScale();
//   resetEffects();
//   const uploadCancelBotton = document.querySelector('#upload-cancel');
//   uploadCancelBotton.addEventListener('click', onImageLoadCloseClick);
//   document.addEventListener('keydown', onImageLoadEscKeyDown);
// };

pristine.addValidator(hashtagField, validateHashTags, HASHTAG_ERROR_MESSAGE);
pristine.addValidator(commentField, isCommentValid, COMMENT_ERROR_MESSAGE);

fileField.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);
