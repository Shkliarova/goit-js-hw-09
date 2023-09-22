import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const timerFields = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    
    if (selectedDate <= new Date()) {
        window.alert("Please choose a date in the future");
        startButton.disabled = true;
    } else {
        startButton.disabled = false;
    }
  },
};

const fp = flatpickr("#datetime-picker", options);

let startButton = document.querySelector('[data-start]');

startButton.addEventListener('click', () => {
  const selectedDate = fp.selectedDates[0];
  if (selectedDate) {
    startTimer(selectedDate);
  } else {
    window.alert("Please choose a date first");
  }
});

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

function startTimer(targetDate) {
    function cb(){
        const currentDate = new Date();
        const timeDifference = targetDate - currentDate;
    
        if (timeDifference <= 0) {
          clearInterval(timerInterval);
          updateTimerUI(0, 0, 0, 0);
          return;
        }
    
        const { days, hours, minutes, seconds } = convertMs(timeDifference);
    
        updateTimerUI(days, hours, minutes, seconds);
    }

    cb();
    const timerInterval = setInterval(cb, 1000);
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

function updateTimerUI(days, hours, minutes, seconds) {
  timerFields.days.textContent = addLeadingZero(days);
  timerFields.hours.textContent = addLeadingZero(hours);
  timerFields.minutes.textContent = addLeadingZero(minutes);
  timerFields.seconds.textContent = addLeadingZero(seconds);
}