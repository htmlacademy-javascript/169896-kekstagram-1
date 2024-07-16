import { isEscapeKey } from './utils.js';

const DATA_ERROR_SHOW_TIME = 5000;

const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const errorDialogTemplate = document.querySelector('#error').content.querySelector('.response');
const successDialogTemplate = document.querySelector('#success').content.querySelector('.response');

const onDocumentKeydown = (evt) => {
  document.addEventListener('keydown', onDocumentKeydown, true);
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
    onHideDialog();
  }
};

function onHideDialog () {
  const activeDialog = document.querySelector('.response');

  if (!activeDialog) {
    return;
  }

  activeDialog.querySelector('.dialog__cta—close');
  activeDialog.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onDocumentClick);
}

function onDocumentClick(evt) {
  const responseDialog = document.querySelector('.response');

  if (!responseDialog.contains(evt.target) && !evt.target.classList.contains('dialog__cta--close')) {
    onHideDialog();
  }
}

const showDialog = (template) => {
  document.body.append(template);
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeydown);
  template.querySelector('.dialog__cta—close').addEventListener('click', onHideDialog);
};

export const showErrorDialog = () => {
  showDialog(errorDialogTemplate);
};

export const showSuccessDialog = () => {
  showDialog(successDialogTemplate);
};

export const showAlert = () => {
  const dataError = dataErrorTemplate.cloneNode(true);
  document.body.append(dataError);

  setTimeout(() => {
    dataError.remove();
  }, DATA_ERROR_SHOW_TIME);
};

