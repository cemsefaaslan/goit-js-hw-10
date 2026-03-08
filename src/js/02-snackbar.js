import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const pendingList = document.getElementById('pending-list');

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const delay = Number(form.delay.value);
  const state = form.state.value;

  if (!state) {
    iziToast.warning({
      title: 'Select a state',
      message: 'Please choose Fulfilled or Rejected.',
      position: 'topRight',
    });
    return;
  }

  const item = document.createElement('div');
  item.className = 'pending-item';
  item.innerHTML = `<div class="spinner"></div><span>${state} · ${delay}ms pending...</span>`;
  pendingList.prepend(item);

  createPromise(delay, state)
    .then(d => {
      item.remove();
      iziToast.success({
        title: '✅ Fulfilled',
        message: `Fulfilled promise in ${d}ms`,
        position: 'topRight',
        backgroundColor: '#e8f5ee',
        titleColor: '#1a7a4a',
        messageColor: '#1a7a4a',
      });
    })
    .catch(d => {
      item.remove();
      iziToast.error({
        title: '❌ Rejected',
        message: `Rejected promise in ${d}ms`,
        position: 'topRight',
      });
    });
});
