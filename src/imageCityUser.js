const URL_API = 'https://api.unsplash.com/';
const CLIENT_ID = '87e26779aa6242a2b2fc8e863886185d1d1f07215e4890071e45448baedf8950';

async function setBackgroundImage(monthtime, weather, city) {
  const url = `${URL_API}photos/random?query=${monthtime},${weather},${city}&client_id=${CLIENT_ID}`;
  const promise = fetch(url)
    .then((response) => response.json());
  const result = await promise;
  const backgroundFancyWeather = document.querySelector('.background');
  backgroundFancyWeather.setAttribute('style', `background:url(${result.urls.regular});background-repeat:no-repeat;background-position:center;overflow:hidden;`);
  const allDiv = document.querySelectorAll('div');
  allDiv[1].className = 'refresh';
}

module.exports = {
  setBackgroundImage,
};
