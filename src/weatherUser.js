const APPID = 'c6b65e868774bd345d33ca46c70b7a17';
const URL_API_OPENWEATHER = 'https://api.openweathermap.org/';
const URL_API_ICON = 'http://openweathermap.org/';
const DAYWEEK_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const DAYWEEK_RU = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
const DAYWEEK_BE = ['Нядзеля', 'Панядзелак', 'Аўторак', 'Серада', 'Чацвер', 'Пятніца', 'Субота'];
const { translate } = require('./translate');

// imperial [F] metric [C] mph [F] m/s [C]
async function weatherUser(lat, lon, measure) {
  const degreeC = document.querySelector('.degreeC');
  const degreeF = document.querySelector('.degreeF');

  if (measure === 'metric') {
    if (degreeF.hasAttribute('style')) {
      degreeF.removeAttribute('style');
    }
    degreeC.setAttribute('style', 'background-color:rgba(252,252,252,0.767);border-radius:7px;');
  } else {
    degreeC.removeAttribute('style');
    degreeF.setAttribute('style', 'background-color:rgba(252,252,252,0.767);border-radius:7px;');
  }

  const storageLanguage = localStorage.getItem('language');
  const url = `${URL_API_OPENWEATHER}data/2.5/forecast?lat=${lat}&lon=${lon}&lang=en&units=${measure}&APPID=${APPID}`;
  const promise = fetch(url)
    .then((response) => response.json());
  const result = await promise;

  // insert temp
  const spanTemp = document.querySelector('.temp');
  spanTemp.innerHTML = `${Math.round(result.list[0].main.temp)}°`;

  // insert img weather
  const imgWeather = document.querySelector('.imgWeather');
  imgWeather.src = `${URL_API_ICON}img/wn/${result.list[0].weather[0].icon}@2x.png`;

  // insert summary weather
  const summaryWeather = document.querySelector('.summaryWeather');
  const summaryInner = result.list[0].weather[0].description.toUpperCase();
  if (storageLanguage === 'ru') {
    const answer = translate(storageLanguage, summaryInner);
    answer.then((dataRu) => {
      summaryWeather.textContent = dataRu[0].toUpperCase();
    });
  } else if (storageLanguage === 'be') {
    const answer = translate(storageLanguage, summaryInner);
    answer.then((dataBe) => {
      summaryWeather.textContent = dataBe[0].toUpperCase();
    });
  } else {
    summaryWeather.textContent = summaryInner;
  }

  // insert apparent temp
  const spanApparentTemp = document.querySelector('.apparentTemp');
  if (storageLanguage === 'ru') {
    spanApparentTemp.textContent = `ОЩУЩАЕТСЯ КАК: ${result.list[0].main.feels_like}`;
  } else if (storageLanguage === 'be') {
    spanApparentTemp.textContent = `АДЧУВАЕЦЦА ЯК: ${result.list[0].main.feels_like}`;
  } else {
    spanApparentTemp.textContent = `FEELS LIKE: ${result.list[0].main.feels_like}`;
  }

  // insert wind speed
  const windSpeed = document.querySelector('.windSpeed');
  if (measure === 'imperial') {
    if (storageLanguage === 'ru') {
      windSpeed.innerHTML = `ВЕТЕР: ${result.list[0].wind.speed} миль/ч`;
    } else if (storageLanguage === 'be') {
      windSpeed.innerHTML = `ВЕЦЕР: ${result.list[0].wind.speed} міль/г`;
    } else {
      windSpeed.innerHTML = `WIND: ${result.list[0].wind.speed} mph`;
    }
  } else if (storageLanguage === 'ru') {
    windSpeed.innerHTML = `ВЕТЕР: ${result.list[0].wind.speed} м/c`;
  } else if (storageLanguage === 'be') {
    windSpeed.innerHTML = `ВЕЦЕР: ${result.list[0].wind.speed} м/c`;
  } else {
    windSpeed.innerHTML = `WIND: ${result.list[0].wind.speed} m/s`;
  }

  // insert humidity
  const humidity = document.querySelector('.humidity');
  if (storageLanguage === 'ru') {
    humidity.innerHTML = `ВЛАЖНОСТЬ: ${result.list[0].main.humidity} %`;
  } else if (storageLanguage === 'be') {
    humidity.innerHTML = `ВІЛЬГОТНАСЦЬ: ${result.list[0].main.humidity} %`;
  } else {
    humidity.innerHTML = `HUMIDITY: ${result.list[0].main.humidity} %`;
  }

  // insert weather on three day
  for (let i = 0, iweather = 8; i < 3; i += 1, iweather += 8) {
    const spanDay = document.querySelector(`.day${i}`);
    if (storageLanguage === 'ru') {
      spanDay.innerHTML = DAYWEEK_RU[new Date(result.list[iweather].dt_txt).getDay()];
    } else if (storageLanguage === 'be') {
      spanDay.innerHTML = DAYWEEK_BE[new Date(result.list[iweather].dt_txt).getDay()];
    } else {
      spanDay.innerHTML = DAYWEEK_EN[new Date(result.list[iweather].dt_txt).getDay()];
    }
    const spanTempTomorrow = document.querySelector(`.temp${i}`);
    spanTempTomorrow.innerHTML = `${Math.round(result.list[iweather].main.temp)}°`;
    const imgWeatherTomorrow = document.querySelector(`.iconWeather${i}`);
    imgWeatherTomorrow.src = `${URL_API_ICON}img/wn/${result.list[iweather].weather[0].icon}@2x.png`;
  }
  return result.list[0].weather[0].main;
}

module.exports = {
  weatherUser,
};
