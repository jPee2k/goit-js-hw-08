import { debounce } from 'lodash';
import isLocalStorageAvailable from './storage.js';

const STORAGE_KEY = 'feedback-form-state';

const app = () => {
  const elements = {
    feedbackForm: document.querySelector('.feedback-form'),
    email: document.querySelector('.feedback-form [name="email"]'),
    message: document.querySelector('.feedback-form [name="message"]'),
  };

  const formData = {};
  const isStorageAvailable = isLocalStorageAvailable();

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    const email = evt.target.elements.email.value.trim();
    const message = evt.target.elements.message.value.trim();

    evt.target.reset();
    isStorageAvailable && localStorage.clear();

    console.log('email: ', email);
    console.log('message: ', message);
  };

  const onInputHandler = (evt) => {
    if (!isStorageAvailable) {
      return;
    }

    const inputName = evt.target.getAttribute('name');
    formData[inputName] = evt.target.value.trim();

    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  };


  if (isStorageAvailable) {
    Object.assign(formData, JSON.parse(localStorage.getItem(STORAGE_KEY)));
    Object.keys(formData).forEach((key) => {
      elements[key].value = formData[key];
    });
  }

  elements.feedbackForm.addEventListener('submit', onFormSubmit);
  elements.feedbackForm.addEventListener('input', debounce(onInputHandler, 500));
};

app();
