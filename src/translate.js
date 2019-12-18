const API_KEY = 'trnsl.1.1.20191212T163559Z.5976e236f00df928.df3aab73e789795377c7f6b4f57195e585fb0e53';
const URL_API = 'https://translate.yandex.net/';

async function translate(language, text) {
  const url = `${URL_API}api/v1.5/tr.json/translate?lang=${language}&key=${API_KEY}&text=${text}`;
  const promise = fetch(url)
    .then((response) => response.json());
  const result = await promise;
  return result.text;
}

function translater(lang) {
  localStorage.setItem('language', lang);

  const allFirst = document.querySelectorAll('.day0, .day1, .day2, .date, .latitude, .longitude');
  const forTranslate = [];
  for (let i = 0; i < allFirst.length; i += 1) {
    forTranslate.push(allFirst[i].textContent);
  }
  const answer = translate(lang, forTranslate.join('|'));
  answer.then((data) => {
    const split = data[0].split('|');
    for (let i = 0; i < allFirst.length; i += 1) {
      allFirst[i].textContent = split[i];
    }
  });
  const allSecond = document.querySelectorAll('.city, .country, .summaryWeather, .apparentTemp, .humidity');
  for (let i = 0; i < allSecond.length; i += 1) {
    if (allSecond[i].textContent !== '') {
      const element = translate(lang, allSecond[i].textContent);
      element.then((data) => {
        if (data !== undefined) {
          allSecond[i].textContent = data[0].toUpperCase();
        }
      });
    }
  }
  const windSpeed = document.querySelector('.windSpeed');
  const storageTemp = localStorage.getItem('temp');
  const wind = windSpeed.textContent.match(/\d+\.\d+/g);
  if (storageTemp === 'imperial') { // str.match(/\d+\.\d+/g);
    if (lang === 'ru') {
      windSpeed.innerHTML = `ВЕТЕР: ${wind[wind.length - 1]} миль/ч`;
    } else if (lang === 'be') {
      windSpeed.innerHTML = `ВЕЦЕР: ${wind[wind.length - 1]} міль/г`;
    } else {
      windSpeed.innerHTML = `WIND: ${wind[wind.length - 1]} mph`;
    }
  } else if (lang === 'ru') {
    windSpeed.innerHTML = `ВЕТЕР: ${wind[wind.length - 1]} м/c`;
  } else if (lang === 'be') {
    windSpeed.innerHTML = `ВЕЦЕР: ${wind[wind.length - 1]} м/c`;
  } else {
    windSpeed.innerHTML = `WIND: ${wind[wind.length - 1]} m/s`;
  }

  const inputs = document.querySelectorAll('.searchcityinput, .searchcityclick');
  const placeholder = translate(lang, inputs[0].placeholder);
  placeholder.then((data) => {
    inputs[0].placeholder = data[0];
  });
  const value = translate(lang, inputs[1].value);
  value.then((data) => {
    inputs[1].value = data[0].toUpperCase();
  });
}

module.exports = {
  translate,
  translater,
};
