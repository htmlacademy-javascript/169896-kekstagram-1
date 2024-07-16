import { isEscapeKey } from './utils.js';

const DATA_ERROR_SHOW_TIME = 5000;

const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const errorDialogTemplate = document.querySelector('#error-response').content.querySelector('.response');
const successDialogTemplate = document.querySelector('#success-response').content.querySelector('.response');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
    hideDialog();
  }
};

function hideDialog () {
  const activeDialog = document.querySelector('.response');

  if (!activeDialog) {
    return;
  }

  activeDialog.querySelector('.dialog__cta—close').removeEventListener('click', hideDialog);
  activeDialog.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onDocumentClick);
}

function onDocumentClick(evt) {
  if (evt.target.closest('.response')) {
    return;
  }

  hideDialog();
}

const showDialog = (template) => {
  document.body.append(template);
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeydown);
  template.querySelector('.dialog__cta—close').addEventListener('click', hideDialog);
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

