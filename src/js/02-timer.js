import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const startButton = document.querySelector('[data-start]');
const timerFields = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

flatpickr("#datetime-picker", options);

startButton.disabled = false;

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
        return;
      }
  
      startTimer(selectedDate);
    },
  };

function addLeadingZero(value) {
    return value < 10 ? `0${value}` : value;
}

function startTimer(targetDate) {
    const timerInterval = setInterval(() => {
      const currentDate = new Date();
      const timeDifference = targetDate - currentDate;
  
      if (timeDifference <= 0) {
        clearInterval(timerInterval);
        updateTimerUI(0, 0, 0, 0);
        return;
      }
  
      const { days, hours, minutes, seconds } = convertMs(timeDifference);
  
      updateTimerUI(days, hours, minutes, seconds);
    }, 1000);
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
    const daysSpan = document.querySelector('[data-days]');
    const hoursSpan = document.querySelector('[data-hours]');
    const minutesSpan = document.querySelector('[data-minutes]');
    const secondsSpan = document.querySelector('[data-seconds]');
  
    daysSpan.textContent = addLeadingZero(days);
    hoursSpan.textContent = addLeadingZero(hours);
    minutesSpan.textContent = addLeadingZero(minutes);
    secondsSpan.textContent = addLeadingZero(seconds);
}

