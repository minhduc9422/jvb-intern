const date = new Date();

const renderCalendar = () => {
  date.setDate(1);

  const monthDays = document.querySelector(".days");

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  document.querySelector(".date h1").innerHTML = `${months[date.getMonth()]} ${date.getFullYear()}`;

  document.querySelector(".date p").innerHTML = new Date().toDateString();

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth() && 
      date.getFullYear() === new Date().getFullYear()
    ) {
      days += `<div class="today">${i}</div>`;
    } else {
      days += `<div>${i}</div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`;
  }
  monthDays.innerHTML = days;
};

const handleDayClick = (clickedDay) => {
  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  if (clickedDay === currentDay && date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
    date.setFullYear(currentYear);
    date.setMonth(currentMonth);
    renderCalendar();
  }
};

document.querySelector(".date p").addEventListener("click", () => {
  date.setFullYear(new Date().getFullYear());
  date.setMonth(new Date().getMonth());
  renderCalendar();
});

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

document.querySelector(".calendar").addEventListener("wheel", (event) => {
  if (event.deltaY < 0) {
    date.setMonth(date.getMonth() - 1);
  } else {
    date.setMonth(date.getMonth() + 1);
  }
  renderCalendar();
});

// Add this function to handle the year selection and close the pop-up
function selectYear() {
  const selectedYear = document.getElementById("year-input").value;
  date.setFullYear(selectedYear);
  renderCalendar();
  closeYearPopup();
}

// Add this function to handle the month selection and close the pop-up
function selectMonth() {
  const selectedMonth = document.getElementById("month-select").value;
  date.setMonth(selectedMonth);
  renderCalendar();
  closeMonthPopup();
}

// Add this function to open the year picker pop-up
function openYearPopup() {
  document.querySelector(".year-popup").style.display = "block";
}

// Add this function to close the year picker pop-up
function closeYearPopup() {
  document.querySelector(".year-popup").style.display = "none";
}

// Add this function to open the month picker pop-up
function openMonthPopup() {
  document.querySelector(".month-popup").style.display = "block";
}

// Add this function to close the month picker pop-up
function closeMonthPopup() {
  document.querySelector(".month-popup").style.display = "none";
}

// Modify the click event listener on the <p> tag
document.querySelector(".date h1").addEventListener("click", () => {
  openYearPopup();
});

document.querySelector(".date .select-year").addEventListener("click", () => {
  openMonthPopup();
});

// Add this event listener to close the pop-up when clicking outside it
document.addEventListener("click", (event) => {
  if (!event.target.closest('.year-popup') && !event.target.closest('.month-popup') && event.target !== document.querySelector('.date h1')) {
    closeMonthPopup();
    closeYearPopup();
  }
});

renderCalendar();
