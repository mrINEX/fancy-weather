const MONTH = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const OF_YEAR = ['winter', 'spring', 'summer', 'autumn'];
const { translate } = require('./translate');

function dateTime(data) {
  const today = new Date(data);
  const date = `${String(today).substring(0, 3)} ${String(today).substring(8, 10)} ${MONTH[today.getMonth()]}`;
  const time = String(today).substring(16, 21);
  const spanDate = document.querySelector('.date');
  const spanTime = document.querySelector('.time');
  spanTime.textContent = time;

  const storageLanguage = localStorage.getItem('language');
  if (storageLanguage === 'ru') {
    const answer = translate(storageLanguage, date);
    answer.then((dataRu) => {
      spanDate.textContent = dataRu[0];
    });
  } else if (storageLanguage === 'be') {
    const answer = translate(storageLanguage, date);
    answer.then((dataBe) => {
      spanDate.textContent = dataBe[0];
    });
  } else {
    const answer = translate(storageLanguage, date);
    answer.then((dataEn) => {
      spanDate.textContent = dataEn[0];
    });
  }

  function years() {
    if (today.getMonth() < 2 || today.getMonth() > 10) {
      return OF_YEAR[0];
    }
    if (today.getMonth() < 5 && today.getMonth() > 1) {
      return OF_YEAR[1];
    }
    if (today.getMonth() < 8 && today.getMonth() > 4) {
      return OF_YEAR[2];
    }
    if (today.getMonth() < 11 && today.getMonth() > 7) {
      return OF_YEAR[2];
    }
  }

  if (time.slice(0, -3) <= 6) {
    return `night,${years()}`;
  }
  if (time.slice(0, -3) > 6 && time.slice(0, -3) <= 12) {
    return `morning,${years()}`;
  }
  if (time.slice(0, -3) > 12 && time.slice(0, -3) <= 18) {
    return `afternoon,${years()}`;
  }
  return `evening,${years()}`; // ${MONTH[today.getMonth()]}
}

module.exports = {
  dateTime,
};
