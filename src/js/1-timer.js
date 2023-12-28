import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const input = document.querySelector("#datetime-picker");
const button = document.querySelector("button");
const daysTimer = document.querySelector("[data-days]");
const hoursTimer = document.querySelector("[data-hours]");
const minsTimer = document.querySelector("[data-minutes]");
const secsTimer = document.querySelector("[data-seconds]");

let userSelectedDate;
let currentDateTime;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (selectedDates[0] < new Date()) {
         iziToast.error({
            title: 'Error',
            message: 'Please choose a date in the future',
      });
          
      } else {
          iziToast.success({
            title: 'Success',
            message: 'Valid date selected',
      });
        userSelectedDate = selectedDates[0];
        button.removeAttribute("disabled");
         if (!timeInterval) {
        startTimer();
      }
    }
  }
};

const datetimePicker = flatpickr(input, options);

button.addEventListener('click', () => {
    const selectedDateTime = userSelectedDate.getTime();

    timeInterval = setInterval(() => {
        const currentDateTime = new Date().getTime();
        let timeDifference = selectedDateTime - currentDateTime;

        if (timeDifference <= 0) {
            clearInterval(timerInterval);
          timeDifference = 0;
        }

        const result = convertMs(timeDifference);

        daysTimer.textContent = addLeadingZero(result.days);
        hoursTimer.textContent = addLeadingZero(result.hours);
        minsTimer.textContent = addLeadingZero(result.minutes);
        secsTimer.textContent = addLeadingZero(result.seconds);
    }, 1000);
});

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
button.setAttribute("disabled", true);