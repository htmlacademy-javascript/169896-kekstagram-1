import './form.js';
import { renderGallery } from './gallery.js';
import { getData } from './api.js';
import { showAlert } from './dialogs.js';

getData()
  .then((pictureList) => {
    renderGallery(pictureList);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );
