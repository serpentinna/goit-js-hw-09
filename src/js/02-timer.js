import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const startButton = document.querySelector('button[data-start]');
startButton.addEventListener('click', onTimerStart);
startButton.disabled = true;

let validDate = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
    checkIfDateValid(selectedDates[0]);
    },
};
flatpickr('#datetime-picker', options);


function checkIfDateValid(chosenDate) {
  if (validDate) return;

 const currentDate = Date.now();
  if (currentDate >= chosenDate.getTime()) {
    Notiflix.Notify.warning("Please choose a date in the future");
    return;
  }

  startButton.disabled = false;
   validDate = chosenDate;
}


function onTimerStart(event) {
   event.target.disabled = true;

    const intervalId = setInterval(() => {
    const timeCalculator = validDate.getTime() - Date.now();
    const timeCountDown = convertMs(timeCalculator)

    Object.keys(timeCountDown).forEach(key => (refs[key].textContent = addLeadingZero(timeCountDown[key])));

    if (timeCalculator <= 0) {
      clearInterval(intervalId);
      Object.keys(timeCountDown).forEach(key => (refs[key].textContent = '00'));
      return;
    }
  }, 1000)
}


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}