const URL_API = 'https://ipinfo.io/';
const TOKEN = '70b477a79140cb';

async function currentData() {
  const url = `${URL_API}json?token=${TOKEN}`;
  const promise = fetch(url)
    .then((response) => response.json());
  const result = await promise;
  return result;
}

module.exports = {
  currentData,
};
