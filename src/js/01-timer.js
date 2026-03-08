import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const fields = document.querySelectorAll('.field');

let userSelectedDate = null;
let timerInterval = null;
let isRunning = false;

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimerUI({ days, hours, minutes, seconds }) {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

function setActiveFields(active) {
  fields.forEach(f => f.classList.toggle('active', active));
}

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selected = selectedDates[0];
    if (!selected) return;

    if (selected <= new Date()) {
      iziToast.error({
        title: 'Invalid date',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      startBtn.disabled = true;
      userSelectedDate = null;
    } else {
      userSelectedDate = selected;
      startBtn.disabled = false;
    }
  },
});

startBtn.addEventListener('click', () => {
  if (!userSelectedDate || isRunning) return;

  isRunning = true;
  startBtn.disabled = true;
  setActiveFields(true);

  timerInterval = setInterval(() => {
    const diff = userSelectedDate - new Date();

    if (diff <= 0) {
      clearInterval(timerInterval);
      updateTimerUI({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setActiveFields(false);
      iziToast.success({
        title: "Time's up!",
        message: 'The countdown has ended.',
        position: 'topRight',
      });
      return;
    }

    updateTimerUI(convertMs(diff));
  }, 1000);
});
