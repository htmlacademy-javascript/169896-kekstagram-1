import { resetScale } from "./scale.js";

const HASHTAG_MAX_COUNT = 5;
const COMMENT_MAX_LENGTH = 140;
const HASHTAG_ERROR_MESSAGE = 'Неверный формат хэштэгов';
const COMMENT_ERROR_MESSAGE = `Длина комментария не может составлять больше ${COMMENT_MAX_LENGTH} символов`;
const TAG_PATTERN = /^#[a-za-яё0-9]{1,19}$/i;

const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('.img-upload__cancel');
const fileField = document.querySelector('.img-upload__input');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

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

const hideForm = () => {
  form.reset();
  resetScale();
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

const onFormSubmit = (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    form.submit();
  }
};

pristine.addValidator(hashtagField, validateHashTags, HASHTAG_ERROR_MESSAGE);
pristine.addValidator(commentField, isCommentValid, COMMENT_ERROR_MESSAGE);

fileField.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);
form.addEventListener('submit', onFormSubmit);
