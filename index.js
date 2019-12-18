const { weatherUser } = require('./src/weatherUser');
const { createHtmlElements } = require('./src/createHtmlPage');
const { setBackgroundImage } = require('./src/imageCityUser');
const { currentData } = require('./src/currentLocationUser');
const { geoCodeUser } = require('./src/geocodeSearch');
const { timeDateCity } = require('./src/timeZone');
const { dateTime } = require('./src/dateTimeUser');
const { mapUser } = require('./src/mapUser');
const { translater, translate } = require('./src/translate');
const { speechInput } = require('./src/speech');

// create HTML page
createHtmlElements();

// get elements
const searchcityinput = document.querySelector('.searchcityinput');
const searchcityclick = document.querySelector('.searchcityclick');
const switchlanguage = document.querySelector('.language');
const degreeF = document.querySelector('.degreeF');
const degreeC = document.querySelector('.degreeC');
const search = [];
const locations = [];
const cities = [];

// local storage
const storageLanguage = localStorage.getItem('language');
const storageTemp = localStorage.getItem('temp');
if (storageTemp === 'imperial') {
  degreeF.setAttribute('style', 'background-color:rgba(252,252,252,0.767);border-radius:7px;');
} else {
  degreeC.setAttribute('style', 'background-color:rgba(252,252,252,0.767);border-radius:7px;');
}

const option = document.querySelector('.language');
option.value = storageLanguage;

const inputs = document.querySelectorAll('.searchcityinput, .searchcityclick');
const placeholder = translate(storageLanguage, inputs[0].placeholder);
placeholder.then((data) => {
  inputs[0].placeholder = data[0];
});
const value = translate(storageLanguage, inputs[1].value);
value.then((data) => {
  inputs[1].value = data[0].toUpperCase();
});

// current data
currentData()
  .then((current) => {
    cities.push(current.city);
    const location = geoCodeUser(current.city);
    location.then((data) => {
      locations.push(data.lat, data.lng);
      const currentTime = timeDateCity(data.lat, data.lng);
      currentTime.then((time) => {
        const monthTime = dateTime(time);
        if (degreeC.hasAttribute('style')) {
          const weather = weatherUser(data.lat, data.lng, 'metric');
          weather.then((description) => {
            search.push(monthTime, description);
            setBackgroundImage(monthTime, description, current.city);
          });
        } else {
          const weather = weatherUser(data.lat, data.lng, 'imperial');
          weather.then((description) => {
            search.push(monthTime, description);
            setBackgroundImage(monthTime, description, current.city);
          });
        }
      });
      mapUser(`${data.lat},${data.lng}`);
    });
  });

// language listener
switchlanguage.addEventListener('change', ({ target }) => {
  if (target.value === 'ru') {
    translater('ru');
  } else if (target.value === 'en') {
    translater('en');
  } else {
    translater('be');
  }
});

// search listner
searchcityclick.addEventListener('click', () => {
  if (!new RegExp('[A-Za-zА-Яа-я]', 'g').test(searchcityinput.value)) {
    searchcityinput.value = 'invalid value';
    searchcityinput.setAttribute('style', 'color:red;');
    setTimeout(() => {
      searchcityinput.value = '';
      searchcityinput.removeAttribute('style');
    }, 2000);
  } else {
    cities.push(searchcityinput.value);
    const location = geoCodeUser(searchcityinput.value);
    location.then((data) => {
      locations.push(data.lat, data.lng);
      const time = timeDateCity(data.lat, data.lng);
      time.then((date) => {
        const monthTime = dateTime(date);
        if (degreeC.hasAttribute('style')) {
          const weather = weatherUser(data.lat, data.lng, 'metric');
          weather.then((description) => {
            search.push(monthTime, description);
            setBackgroundImage(monthTime, description, searchcityinput.value);
          });
        } else {
          const weather = weatherUser(data.lat, data.lng, 'imperial');
          weather.then((description) => {
            search.push(monthTime, description);
            setBackgroundImage(monthTime, description, searchcityinput.value);
          });
        }
      });
      mapUser(`${data.lat},${data.lng}`);
    });
  }
});

// click listener
document.addEventListener('click', ({ target }) => {
  // weather F C
  if (target.classList[0] === 'degreeF') {
    weatherUser(locations[locations.length - 2], locations[locations.length - 1], 'imperial');
    localStorage.setItem('temp', 'imperial');
  }
  if (target.classList[0] === 'degreeC') {
    weatherUser(locations[locations.length - 2], locations[locations.length - 1], 'metric');
    localStorage.setItem('temp', 'metric');
  }

  // background
  if (target.classList[0] === 'refresh') {
    setBackgroundImage(search[search.length - 2], search[search.length - 1], cities[cities.length - 1]);
    const refresh = document.querySelector('.refresh');
    refresh.className = 'refreshRotate';
  }

  // speech input
  if (target.className === 'imgVoice') {
    searchcityinput.focus();
    speechInput();
  }
});

// update time
setInterval(() => {
  const updateTime = timeDateCity(locations[locations.length - 2], locations[locations.length - 1]);
  updateTime.then((time) => {
    dateTime(time);
  });
}, 30000);
