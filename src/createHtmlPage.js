function createHtmlElements() {
  function createElement(element, classname) {
    const elem = document.createElement(element);
    elem.classList.add(classname);
    return elem;
  }

  const background = document.body.appendChild(createElement('section', 'background'));
  const wrapper = createElement('section', 'wrapper');
  background.append(wrapper);
  // const wrapper = document.body.appendChild(createElement('section', 'wrapper'));

  // nav
  const nav = createElement('nav', 'controls');
  wrapper.append(nav);

  const buttonSwitch = createElement('div', 'switch');
  const refresh = createElement('div', 'refresh');
  buttonSwitch.append(refresh);
  const buttonLanguage = createElement('select', 'language');
  buttonLanguage.setAttribute('name', 'select');
  nav.append(buttonSwitch);
  nav.append(buttonLanguage);

  const optionen = createElement('option', 'en');
  optionen.setAttribute('value', 'en');
  optionen.innerHTML = 'EN';
  const optionru = createElement('option', 'ru');
  optionru.setAttribute('value', 'ru');
  optionru.innerHTML = 'RU';
  const optionbe = createElement('option', 'be');
  optionbe.setAttribute('value', 'be');
  optionbe.innerHTML = 'BE';
  buttonLanguage.append(optionen);
  buttonLanguage.append(optionru);
  buttonLanguage.append(optionbe);

  const buttonFC = createElement('div', 'wrappfc');
  nav.append(buttonFC);
  const divF = createElement('div', 'fahrenheit');
  const divC = createElement('div', 'celsius');
  buttonFC.append(divF);
  buttonFC.append(divC);
  const spanF = createElement('span', 'degreeF');
  spanF.innerHTML = '°F';
  const spanC = createElement('span', 'degreeC');
  spanC.innerHTML = '°С';
  divF.append(spanF);
  divC.append(spanC);

  const buttonSearch = createElement('div', 'wrappersearch');
  nav.append(buttonSearch);
  const inputSearch = createElement('input', 'searchcityinput');
  const imgVoice = createElement('img', 'imgVoice');
  imgVoice.setAttribute('src', '\./img/voiceicon.png');
  inputSearch.setAttribute('placeholder', 'Search city');
  inputSearch.setAttribute('type', 'text');
  const inputSubmit = createElement('input', 'searchcityclick');
  inputSubmit.setAttribute('value', 'SEARCH');
  inputSubmit.setAttribute('type', 'submit');
  buttonSearch.append(inputSearch);
  buttonSearch.append(imgVoice);
  buttonSearch.append(inputSubmit);

  // main
  const wrapperForWeather = createElement('main', 'wrapperForWeather');
  const today = createElement('header', 'today');
  wrapperForWeather.append(today);

  const spanCityCountry = createElement('div', 'cityCountry');
  const spanCity = createElement('span', 'city');
  const spanCountry = createElement('span', 'country');
  spanCityCountry.append(spanCity);
  spanCityCountry.append(spanCountry);
  const spanDate = createElement('span', 'date');
  const spanTime = createElement('span', 'time');
  const spanTemp = createElement('span', 'temp');
  const imgWeather = createElement('img', 'imgWeather');
  today.append(spanCityCountry);
  today.append(spanDate);
  today.append(spanTime);
  today.append(spanTemp);
  today.append(imgWeather);

  const divDescription = createElement('div', 'description');
  const spanSummaryWeather = createElement('span', 'summaryWeather');
  const spanApparentTemp = createElement('span', 'apparentTemp');
  const spanWindSpeed = createElement('span', 'windSpeed');
  const spanHumidity = createElement('span', 'humidity');
  divDescription.append(spanSummaryWeather);
  divDescription.append(spanApparentTemp);
  divDescription.append(spanWindSpeed);
  divDescription.append(spanHumidity);
  today.append(divDescription);

  const tothreedays = createElement('section', 'tothreedays');
  wrapperForWeather.append(tothreedays);
  for (let i = 0; i < 3; i += 1) {
    const wrapperTomorrom = createElement('div', 'wrapperTomorrom');
    const spanDayTomorrom = createElement('span', `day${i}`);
    const spanTempTomorrom = createElement('span', `temp${i}`);
    const imgWeatherTomorrom = createElement('img', `iconWeather${i}`);
    tothreedays.append(wrapperTomorrom);
    wrapperTomorrom.append(spanDayTomorrom);
    wrapperTomorrom.append(spanTempTomorrom);
    wrapperTomorrom.append(imgWeatherTomorrom);
  }

  // map
  wrapper.append(wrapperForWeather);
  const geodata = createElement('section', 'geodata');
  wrapper.append(geodata);
  const mapiframe = createElement('iframe', 'maps');
  geodata.append(mapiframe);
  const spanLatitude = createElement('span', 'latitude');
  geodata.append(spanLatitude);
  const spanLongitude = createElement('span', 'longitude');
  geodata.append(spanLongitude);
}

module.exports = {
  createHtmlElements,
};
