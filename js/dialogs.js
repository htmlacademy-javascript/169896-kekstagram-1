import { isEscapeKey } from './utils.js';

const DATA_ERROR_SHOW_TIME = 5000;

const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const errorDialogTemplate = document.querySelector('#error').content.querySelector('.response');
const successDialogTemplate = document.querySelector('#success').content.querySelector('.response');

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

  activeDialog.remove();
  document.removeEventListener('click', onDocumentClick);
  document.removeEventListener('keydown', onDocumentKeydown, true);
}

function onDocumentClick(evt) {
  const innerContent = document.querySelector('.response__inner');

  if (!innerContent.contains(evt.target)) {
    hideDialog();
  }
}

const showDialog = (template) => {
  document.body.append(template);
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeydown, true);
  template.querySelector('.dialog__close').addEventListener('click', () => hideDialog());
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

