import './form.js';
import { initThumbnails } from './gallery.js';
import { getData, sendData } from './api.js';
import { showAlert } from './dialogs.js';

getData()
  .then((pictureList) => {
    initThumbnails(pictureList);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

