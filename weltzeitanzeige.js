const timeZones = [
  { id: 'LondonTime', zone: 'Europe/London' },
  { id: 'NewYorkTime', zone: 'America/New_York' },
  { id: 'TeheranTime', zone: 'Asia/Tehran' }
];
const updateTimeEl = document.getElementById('updateTime');
const updateDateEl = document.getElementById('updateDate');
const MILITARY_ID = 'MilitaerTime';

function formatTime(date, timeZone) {
  return new Intl.DateTimeFormat('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone
  }).format(date);
}

function formatUtcTime(date) {
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

function formatDate(date) {
  return new Intl.DateTimeFormat('de-DE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

function updateClocks() {
  const now = new Date();

  timeZones.forEach(({ id, zone }) => {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = formatTime(now, zone);
    }
  });

  const milElement = document.getElementById(MILITARY_ID);
  if (milElement) {
    milElement.textContent = formatUtcTime(now);
  }

  if (updateTimeEl) {
    updateTimeEl.textContent = new Intl.DateTimeFormat('de-DE', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(now);
  }

  if (updateDateEl) {
    updateDateEl.textContent = formatDate(now);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateClocks();
  setInterval(updateClocks, 1000);
});
