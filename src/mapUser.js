const URL_API = 'https://api.opencagedata.com/';
const KEY = '12ff4fe1ac804a4689043079fcfc5b48';

async function mapUser(cord) {
  const url = `${URL_API}geocode/v1/map?q=${cord}&key=${KEY}&pretty=1&no_annotations=1&abbrv=1`;
  const promise = fetch(url)
    .then((response) => response);
  const result = await promise;
  const maps = document.querySelector('.maps');
  maps.src = result.url;
}

module.exports = {
  mapUser,
};
