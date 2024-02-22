const date = new Date();
const monthSelector = document.getElementById("monthSelector");
const monthPopup = document.getElementById("monthPopup");
const closePopup = document.getElementsByClassName("close")[0];
const monthList = document.getElementById("monthList");
const yearSelector = document.getElementById("yearSelector");
const yearPopup = document.getElementById("yearPopup");
const yearList = document.getElementById("yearList");

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

  document.querySelector(".date h1").innerHTML = `${
    months[date.getMonth()]
  } ${date.getFullYear()}`;

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

  if (
    clickedDay === currentDay &&
    date.getMonth() === currentMonth &&
    date.getFullYear() === currentYear
  ) {
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

// Function to show popup
monthSelector.onclick = function () {
  monthPopup.style.display = "block";
};

// Close popup when clicking on the close button
monthPopup.querySelector(".close").onclick = function () {
  monthPopup.style.display = "none";
};

// Close popup when clicking outside of it
window.addEventListener("click", function (event) {
  if (!monthPopup.contains(event.target) && event.target !== monthSelector) {
    monthPopup.style.display = "none";
  }
});

// Handle month selection
monthList.addEventListener("click", function (e) {
  if (e.target && e.target.nodeName == "LI") {
    const selectedMonthIndex = parseInt(e.target.getAttribute("data-month"));
    date.setMonth(selectedMonthIndex);
    renderCalendar();
    monthPopup.style.display = "none";
  }
});

// Function to show year popup
yearSelector.onclick = function () {
  renderYearList();
  yearPopup.style.display = "block";
};

// Close year popup when clicking on the close button
yearPopup.querySelector(".close").onclick = function () {
  yearPopup.style.display = "none";
};

// Close year popup when clicking outside of it
window.addEventListener("click", function (event) {
  if (!yearPopup.contains(event.target) && event.target !== yearSelector) {
    yearPopup.style.display = "none";
  }
});

// Handle year selection
yearList.addEventListener("click", function (e) {
  if (e.target && e.target.nodeName == "LI") {
    const selectedYear = parseInt(e.target.textContent);
    date.setFullYear(selectedYear);
    renderCalendar();
    yearPopup.style.display = "none";
  }
});

// Function to render the list of years
function renderYearList() {
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let i = currentYear - 10; i <= currentYear + 10; i++) {
    years.push(`<li>${i}</li>`);
  }

  yearList.innerHTML = years.join("");
}

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

renderCalendar();
