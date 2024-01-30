const date = new Date();

// calendar rendering functions
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

// return to current date
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

// previous and next month
document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

// scoll event
document.querySelector(".calendar").addEventListener("wheel", (event) => {
  if (event.deltaY < 0) {
    date.setMonth(date.getMonth() - 1);
  } else {
    date.setMonth(date.getMonth() + 1);
  }
  renderCalendar();
});

// year and month choosing popup menu
function selectYear() {
  const selectedYear = document.getElementById("year-input").value;
  date.setFullYear(selectedYear);
  renderCalendar();
  closeYearPopup();
}

function selectMonth() {
  const selectedMonth = document.getElementById("month-select").value;
  date.setMonth(selectedMonth);
  renderCalendar();
  closeMonthPopup();
}

function openYearPopup() {
  document.querySelector(".year-popup").style.display = "block";
}

function closeYearPopup() {
  document.querySelector(".year-popup").style.display = "none";
}

function openMonthPopup() {
  document.querySelector(".month-popup").style.display = "block";
}

function closeMonthPopup() {
  document.querySelector(".month-popup").style.display = "none";
}

document.querySelector(".date h1").addEventListener("click", () => {
  openYearPopup();
});

document.querySelector(".date .select-year").addEventListener("click", () => {
  openMonthPopup();
});

document.addEventListener("click", (event) => {
  if (!event.target.closest('.year-popup') && !event.target.closest('.month-popup') && event.target !== document.querySelector('.date h1')) {
    closeMonthPopup();
    closeYearPopup();
  }
});

renderCalendar();
