// script.js

// Logical month names
const sauraprithviMonths = [
  "Avasra", "Bharna", "Chaitra", "Dharma",
  "Elya", "Falna", "Gavya", "Harsha",
  "Ishra", "Janya", "Kshetra", "Loma"
];

// Named Earth Days
const earthDays = [
  { day: 1, name: "Āditya" },                     // New Year Day
  { day: 121, name: "Utsa" },                     // Summer Solstice (after Chaitra)
  { day: 211, name: "Vimṛti" },                   // Mid-Year (after Falna)
  { day: 301, name: "Nidra" },                    // Winter Solstice (after Ishra)
  { day: 391, name: "Saṃbheda" },                 // Unity Day (after Loma)
  { day: 366, name: "Chāyopama (leap year)" }     // Leap Year Day
];

// Get Earth Day name if current day matches
function getEarthDayName(dayOfYear, isLeapYear) {
  return earthDays.find(ed => ed.day === dayOfYear && (ed.day !== 366 || isLeapYear));
}

// Get current Saurapṛthvī date
function getSauraprithviDate() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 2, 20); // March 20
  const isLeapYear = (now.getFullYear() % 4 === 0);

  let diff = Math.floor((now - start) / (1000 * 60 * 60 * 24)) + 1;
  if (diff < 1) diff += isLeapYear ? 366 : 365;

  const earthDay = getEarthDayName(diff, isLeapYear);
  if (earthDay) return `Earth Day – ${earthDay.name}`;

  const adjustedDay = diff - 1;
  const month = Math.floor(adjustedDay / 30);
  const day = (adjustedDay % 30) + 1;

  if (month >= 12) return `Earth Day – Saṃbheda`;

  return `${sauraprithviMonths[month]} ${day}`;
}

// Jīvacakra Time Calculation
function getJivacakraTime() {
  const now = new Date();
  const secondsInDay = 86400;
  const totalSeconds =
    now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

  const jivaFraction = totalSeconds / secondsInDay;

  const prana = Math.floor(jivaFraction * 10);
  const kala = Math.floor((jivaFraction * 1000) % 1000);
  const tattva = Math.floor((jivaFraction * 100000) % 100);

  return `Prāṇa ${prana} : Kāla ${kala} : Tattva ${tattva}`;
}

// Update UI
function updateTime() {
  const dateElement = document.getElementById("earthDate");
  const dateText = getSauraprithviDate();

  dateElement.textContent = dateText;
  if (dateText.includes("Earth Day")) {
    dateElement.classList.add("earth-day");
  } else {
    dateElement.classList.remove("earth-day");
  }

  document.getElementById("pranaTime").textContent = getJivacakraTime();
}

// Run
updateTime();
setInterval(updateTime, 1000);
