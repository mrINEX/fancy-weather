const API_GATEWAY = 'https://api.timezonedb.com/';
const API_KEY = 'XM23RFKXPW3D';

async function timeDateCity(lat, lng) {
  const url = `${API_GATEWAY}v2.1/get-time-zone?key=${API_KEY}&format=json&by=position&lat=${lat}&lng=${lng}`;
  const promise = fetch(url)
    .then((response) => response.json());
  const result = await promise;
  return result.formatted;
}

module.exports = {
  timeDateCity,
};
