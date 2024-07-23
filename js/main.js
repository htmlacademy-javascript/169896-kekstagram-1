import './form.js';
import { initGallery } from './gallery.js';
import { getData } from './api.js';
import { showAlert } from './dialogs.js';


getData()
  .then((data) => {
    initGallery(data);
  })
  .catch((err) => {
    showAlert(err.message);
  });
