const word = require('./src/translate');
const weather = require('./src/weatherUser');
const geoCode = require('./src/geocodeSearch');
const current = require('./src/currentLocationUser');
const zone = require('./src/timeZone');

describe('tests', () => {
  it('should return translate data:', () => {
    expect(word.translate('ru', 'node')).toBeDefined();
  });
  it('should return weather data:', () => {
    expect(weather.weatherUser('53.55', '27.77', 'metric')).toBeDefined();
  });
  it('should return geolocation code data:', () => {
    expect(geoCode.geoCodeUser('Minsk')).toBeDefined();
  });
  it('should return current data:', () => {
    expect(current.currentData()).toBeDefined();
  });
  it('should return time zone data:', () => {
    expect(zone.timeDateCity('53.55', '27.77')).toBeDefined();
  });
  it('should return true translate:', () => {
    const answer = word.translate('ru', 'node');
    answer.then((data) => {
        expect(data).toEqual('узел');
    })
  });
  it('should return string:', () => {
    const answer = word.translate('ru', 'node');
    answer.then((data) => {
        expect(data).toBeInstanceOf(String);
    })
  });
  it('should return true length:', () => {
    const answer = word.translate('ru', 'node');
    answer.then((data) => {
        expect(data.length).toEqual(4);
    })
  });
  it('should return true string:', () => {
    const answer = word.translate('ru', 'node');
    answer.then((data) => {
        expect(data.includes('узел')).toBeTruthy();
    })
  });
  it('should return false string:', () => {
    const answer = word.translate('ru', 'node');
    answer.then((data) => {
        expect(data.includes('узеtyл')).toBeFalsy();
    })
  });
});
