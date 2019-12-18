const URL_API = 'https://api.opencagedata.com/';
const KEY = '12ff4fe1ac804a4689043079fcfc5b48';
const input = document.getElementsByClassName('searchcityinput');
const history = [];

async function geoCodeUser(city) {
  try {
    const storageLanguage = localStorage.getItem('language');

    const url = `${URL_API}geocode/v1/json?q=${city}&key=${KEY}&pretty=1&no_annotations=1&language=${storageLanguage}`;
    const promise = fetch(url)
      .then((response) => response.json());
    const result = await promise;
    history.push(result.results[0].geometry);

    // insert city country
    const citySearch = result.results[0].components.city;
    const stateSearch = result.results[0].components.state;
    const countySearch = result.results[0].components.county;
    const formatted = result.results[0].formatted.toUpperCase();
    const country = result.results[0].components.country.toUpperCase();

    const spanCity = document.querySelector('.city');
    const spanCountry = document.querySelector('.country');

    if (citySearch !== undefined) {
      spanCity.textContent = `${citySearch.toUpperCase()},`;
      spanCountry.textContent = ` ${country}`;
    } else if (countySearch !== undefined) {
      spanCity.textContent = `${countySearch.toUpperCase()},`;
      spanCountry.textContent = ` ${country}`;
    } else if (stateSearch !== undefined) {
      spanCity.textContent = `${stateSearch.toUpperCase()},`;
      spanCountry.textContent = ` ${country}`;
    } else if (country === undefined) {
      spanCity.textContent = '';
      spanCountry.textContent = `${formatted}`;
    } else {
      spanCity.textContent = '';
      spanCountry.textContent = `Country: ${country}`;
    }

    // insert geometry
    const latitude = document.querySelector('.latitude');
    const longitude = document.querySelector('.longitude');

    if (storageLanguage === 'ru') {
      latitude.textContent = `Широта: ${result.results[0].geometry.lat}`;
      longitude.textContent = `Долгота: ${result.results[0].geometry.lng}`;
    } else if (storageLanguage === 'be') {
      latitude.textContent = `Шырата: ${result.results[0].geometry.lat}`;
      longitude.textContent = `Даўгата: ${result.results[0].geometry.lng}`;
    } else {
      latitude.textContent = `Latitude: ${result.results[0].geometry.lat}`;
      longitude.textContent = `Longitude: ${result.results[0].geometry.lng}`;
    }

    return result.results[0].geometry;
  } catch (err) {
    input[0].value = 'invalid value';
    input[0].setAttribute('style', 'color:red;');
    setTimeout(() => {
      input[0].value = '';
      input[0].removeAttribute('style');
    }, 3000);
  }
  return history[history.length - 1];
}

module.exports = {
  geoCodeUser,
};
