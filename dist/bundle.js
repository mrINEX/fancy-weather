/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { weatherUser } = __webpack_require__(/*! ./src/weatherUser */ \"./src/weatherUser.js\");\nconst { createHtmlElements } = __webpack_require__(/*! ./src/createHtmlPage */ \"./src/createHtmlPage.js\");\nconst { setBackgroundImage } = __webpack_require__(/*! ./src/imageCityUser */ \"./src/imageCityUser.js\");\nconst { currentData } = __webpack_require__(/*! ./src/currentLocationUser */ \"./src/currentLocationUser.js\");\nconst { geoCodeUser } = __webpack_require__(/*! ./src/geocodeSearch */ \"./src/geocodeSearch.js\");\nconst { timeDateCity } = __webpack_require__(/*! ./src/timeZone */ \"./src/timeZone.js\");\nconst { dateTime } = __webpack_require__(/*! ./src/dateTimeUser */ \"./src/dateTimeUser.js\");\nconst { mapUser } = __webpack_require__(/*! ./src/mapUser */ \"./src/mapUser.js\");\nconst { translater, translate } = __webpack_require__(/*! ./src/translate */ \"./src/translate.js\");\nconst { speechInput } = __webpack_require__(/*! ./src/speech */ \"./src/speech.js\");\n\n// create HTML page\ncreateHtmlElements();\n\n// get elements\nconst searchcityinput = document.querySelector('.searchcityinput');\nconst searchcityclick = document.querySelector('.searchcityclick');\nconst switchlanguage = document.querySelector('.language');\nconst degreeF = document.querySelector('.degreeF');\nconst degreeC = document.querySelector('.degreeC');\nconst search = [];\nconst locations = [];\nconst cities = [];\n\n// local storage\nconst storageLanguage = localStorage.getItem('language');\nconst storageTemp = localStorage.getItem('temp');\nif (storageTemp === 'imperial') {\n  degreeF.setAttribute('style', 'background-color:rgba(252,252,252,0.767);border-radius:7px;');\n} else {\n  degreeC.setAttribute('style', 'background-color:rgba(252,252,252,0.767);border-radius:7px;');\n}\n\nconst option = document.querySelector('.language');\noption.value = storageLanguage;\n\nconst inputs = document.querySelectorAll('.searchcityinput, .searchcityclick');\nconst placeholder = translate(storageLanguage, inputs[0].placeholder);\nplaceholder.then((data) => {\n  inputs[0].placeholder = data[0];\n});\nconst value = translate(storageLanguage, inputs[1].value);\nvalue.then((data) => {\n  inputs[1].value = data[0].toUpperCase();\n});\n\n// current data\ncurrentData()\n  .then((current) => {\n    cities.push(current.city);\n    const location = geoCodeUser(current.city);\n    location.then((data) => {\n      locations.push(data.lat, data.lng);\n      const currentTime = timeDateCity(data.lat, data.lng);\n      currentTime.then((time) => {\n        const monthTime = dateTime(time);\n        if (degreeC.hasAttribute('style')) {\n          const weather = weatherUser(data.lat, data.lng, 'metric');\n          weather.then((description) => {\n            search.push(monthTime, description);\n            setBackgroundImage(monthTime, description, current.city);\n          });\n        } else {\n          const weather = weatherUser(data.lat, data.lng, 'imperial');\n          weather.then((description) => {\n            search.push(monthTime, description);\n            setBackgroundImage(monthTime, description, current.city);\n          });\n        }\n      });\n      mapUser(`${data.lat},${data.lng}`);\n    });\n  });\n\n// language listener\nswitchlanguage.addEventListener('change', ({ target }) => {\n  if (target.value === 'ru') {\n    translater('ru');\n  } else if (target.value === 'en') {\n    translater('en');\n  } else {\n    translater('be');\n  }\n});\n\n// search listner\nsearchcityclick.addEventListener('click', () => {\n  if (!new RegExp('[A-Za-zА-Яа-я]', 'g').test(searchcityinput.value)) {\n    searchcityinput.value = 'invalid value';\n    searchcityinput.setAttribute('style', 'color:red;');\n    setTimeout(() => {\n      searchcityinput.value = '';\n      searchcityinput.removeAttribute('style');\n    }, 2000);\n  } else {\n    cities.push(searchcityinput.value);\n    const location = geoCodeUser(searchcityinput.value);\n    location.then((data) => {\n      locations.push(data.lat, data.lng);\n      const time = timeDateCity(data.lat, data.lng);\n      time.then((date) => {\n        const monthTime = dateTime(date);\n        if (degreeC.hasAttribute('style')) {\n          const weather = weatherUser(data.lat, data.lng, 'metric');\n          weather.then((description) => {\n            search.push(monthTime, description);\n            setBackgroundImage(monthTime, description, searchcityinput.value);\n          });\n        } else {\n          const weather = weatherUser(data.lat, data.lng, 'imperial');\n          weather.then((description) => {\n            search.push(monthTime, description);\n            setBackgroundImage(monthTime, description, searchcityinput.value);\n          });\n        }\n      });\n      mapUser(`${data.lat},${data.lng}`);\n    });\n  }\n});\n\n// click listener\ndocument.addEventListener('click', ({ target }) => {\n  // weather F C\n  if (target.classList[0] === 'degreeF') {\n    weatherUser(locations[locations.length - 2], locations[locations.length - 1], 'imperial');\n    localStorage.setItem('temp', 'imperial');\n  }\n  if (target.classList[0] === 'degreeC') {\n    weatherUser(locations[locations.length - 2], locations[locations.length - 1], 'metric');\n    localStorage.setItem('temp', 'metric');\n  }\n\n  // background\n  if (target.classList[0] === 'refresh') {\n    setBackgroundImage(search[search.length - 2], search[search.length - 1], cities[cities.length - 1]);\n    const refresh = document.querySelector('.refresh');\n    refresh.className = 'refreshRotate';\n  }\n\n  // speech input\n  if (target.className === 'imgVoice') {\n    searchcityinput.focus();\n    speechInput();\n  }\n});\n\n// update time\nsetInterval(() => {\n  const updateTime = timeDateCity(locations[locations.length - 2], locations[locations.length - 1]);\n  updateTime.then((time) => {\n    dateTime(time);\n  });\n}, 30000);\n\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./src/createHtmlPage.js":
/*!*******************************!*\
  !*** ./src/createHtmlPage.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function createHtmlElements() {\n  function createElement(element, classname) {\n    const elem = document.createElement(element);\n    elem.classList.add(classname);\n    return elem;\n  }\n\n  const background = document.body.appendChild(createElement('section', 'background'));\n  const wrapper = createElement('section', 'wrapper');\n  background.append(wrapper);\n  // const wrapper = document.body.appendChild(createElement('section', 'wrapper'));\n\n  // nav\n  const nav = createElement('nav', 'controls');\n  wrapper.append(nav);\n\n  const buttonSwitch = createElement('div', 'switch');\n  const refresh = createElement('div', 'refresh');\n  buttonSwitch.append(refresh);\n  const buttonLanguage = createElement('select', 'language');\n  buttonLanguage.setAttribute('name', 'select');\n  nav.append(buttonSwitch);\n  nav.append(buttonLanguage);\n\n  const optionen = createElement('option', 'en');\n  optionen.setAttribute('value', 'en');\n  optionen.innerHTML = 'EN';\n  const optionru = createElement('option', 'ru');\n  optionru.setAttribute('value', 'ru');\n  optionru.innerHTML = 'RU';\n  const optionbe = createElement('option', 'be');\n  optionbe.setAttribute('value', 'be');\n  optionbe.innerHTML = 'BE';\n  buttonLanguage.append(optionen);\n  buttonLanguage.append(optionru);\n  buttonLanguage.append(optionbe);\n\n  const buttonFC = createElement('div', 'wrappfc');\n  nav.append(buttonFC);\n  const divF = createElement('div', 'fahrenheit');\n  const divC = createElement('div', 'celsius');\n  buttonFC.append(divF);\n  buttonFC.append(divC);\n  const spanF = createElement('span', 'degreeF');\n  spanF.innerHTML = '°F';\n  const spanC = createElement('span', 'degreeC');\n  spanC.innerHTML = '°С';\n  divF.append(spanF);\n  divC.append(spanC);\n\n  const buttonSearch = createElement('div', 'wrappersearch');\n  nav.append(buttonSearch);\n  const inputSearch = createElement('input', 'searchcityinput');\n  const imgVoice = createElement('img', 'imgVoice');\n  imgVoice.setAttribute('src', './img/voiceicon.png');\n  inputSearch.setAttribute('placeholder', 'Search city');\n  inputSearch.setAttribute('type', 'text');\n  const inputSubmit = createElement('input', 'searchcityclick');\n  inputSubmit.setAttribute('value', 'SEARCH');\n  inputSubmit.setAttribute('type', 'submit');\n  buttonSearch.append(inputSearch);\n  buttonSearch.append(imgVoice);\n  buttonSearch.append(inputSubmit);\n\n  // main\n  const wrapperForWeather = createElement('main', 'wrapperForWeather');\n  const today = createElement('header', 'today');\n  wrapperForWeather.append(today);\n\n  const spanCityCountry = createElement('div', 'cityCountry');\n  const spanCity = createElement('span', 'city');\n  const spanCountry = createElement('span', 'country');\n  spanCityCountry.append(spanCity);\n  spanCityCountry.append(spanCountry);\n  const spanDate = createElement('span', 'date');\n  const spanTime = createElement('span', 'time');\n  const spanTemp = createElement('span', 'temp');\n  const imgWeather = createElement('img', 'imgWeather');\n  today.append(spanCityCountry);\n  today.append(spanDate);\n  today.append(spanTime);\n  today.append(spanTemp);\n  today.append(imgWeather);\n\n  const divDescription = createElement('div', 'description');\n  const spanSummaryWeather = createElement('span', 'summaryWeather');\n  const spanApparentTemp = createElement('span', 'apparentTemp');\n  const spanWindSpeed = createElement('span', 'windSpeed');\n  const spanHumidity = createElement('span', 'humidity');\n  divDescription.append(spanSummaryWeather);\n  divDescription.append(spanApparentTemp);\n  divDescription.append(spanWindSpeed);\n  divDescription.append(spanHumidity);\n  today.append(divDescription);\n\n  const tothreedays = createElement('section', 'tothreedays');\n  wrapperForWeather.append(tothreedays);\n  for (let i = 0; i < 3; i += 1) {\n    const wrapperTomorrom = createElement('div', 'wrapperTomorrom');\n    const spanDayTomorrom = createElement('span', `day${i}`);\n    const spanTempTomorrom = createElement('span', `temp${i}`);\n    const imgWeatherTomorrom = createElement('img', `iconWeather${i}`);\n    tothreedays.append(wrapperTomorrom);\n    wrapperTomorrom.append(spanDayTomorrom);\n    wrapperTomorrom.append(spanTempTomorrom);\n    wrapperTomorrom.append(imgWeatherTomorrom);\n  }\n\n  // map\n  wrapper.append(wrapperForWeather);\n  const geodata = createElement('section', 'geodata');\n  wrapper.append(geodata);\n  const mapiframe = createElement('iframe', 'maps');\n  geodata.append(mapiframe);\n  const spanLatitude = createElement('span', 'latitude');\n  geodata.append(spanLatitude);\n  const spanLongitude = createElement('span', 'longitude');\n  geodata.append(spanLongitude);\n}\n\nmodule.exports = {\n  createHtmlElements,\n};\n\n\n//# sourceURL=webpack:///./src/createHtmlPage.js?");

/***/ }),

/***/ "./src/currentLocationUser.js":
/*!************************************!*\
  !*** ./src/currentLocationUser.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const URL_API = 'https://ipinfo.io/';\nconst TOKEN = '70b477a79140cb';\n\nasync function currentData() {\n  const url = `${URL_API}json?token=${TOKEN}`;\n  const promise = fetch(url)\n    .then((response) => response.json());\n  const result = await promise;\n  return result;\n}\n\nmodule.exports = {\n  currentData,\n};\n\n\n//# sourceURL=webpack:///./src/currentLocationUser.js?");

/***/ }),

/***/ "./src/dateTimeUser.js":
/*!*****************************!*\
  !*** ./src/dateTimeUser.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MONTH = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];\nconst OF_YEAR = ['winter', 'spring', 'summer', 'autumn'];\nconst { translate } = __webpack_require__(/*! ./translate */ \"./src/translate.js\");\n\nfunction dateTime(data) {\n  const today = new Date(data);\n  const date = `${String(today).substring(0, 3)} ${String(today).substring(8, 10)} ${MONTH[today.getMonth()]}`;\n  const time = String(today).substring(16, 21);\n  const spanDate = document.querySelector('.date');\n  const spanTime = document.querySelector('.time');\n  spanTime.textContent = time;\n\n  const storageLanguage = localStorage.getItem('language');\n  if (storageLanguage === 'ru') {\n    const answer = translate(storageLanguage, date);\n    answer.then((dataRu) => {\n      spanDate.textContent = dataRu[0];\n    });\n  } else if (storageLanguage === 'be') {\n    const answer = translate(storageLanguage, date);\n    answer.then((dataBe) => {\n      spanDate.textContent = dataBe[0];\n    });\n  } else {\n    const answer = translate(storageLanguage, date);\n    answer.then((dataEn) => {\n      spanDate.textContent = dataEn[0];\n    });\n  }\n\n  function years() {\n    if (today.getMonth() < 2 || today.getMonth() > 10) {\n      return OF_YEAR[0];\n    }\n    if (today.getMonth() < 5 && today.getMonth() > 1) {\n      return OF_YEAR[1];\n    }\n    if (today.getMonth() < 8 && today.getMonth() > 4) {\n      return OF_YEAR[2];\n    }\n    if (today.getMonth() < 11 && today.getMonth() > 7) {\n      return OF_YEAR[2];\n    }\n  }\n\n  if (time.slice(0, -3) <= 6) {\n    return `night,${years()}`;\n  }\n  if (time.slice(0, -3) > 6 && time.slice(0, -3) <= 12) {\n    return `morning,${years()}`;\n  }\n  if (time.slice(0, -3) > 12 && time.slice(0, -3) <= 18) {\n    return `afternoon,${years()}`;\n  }\n  return `evening,${years()}`; // ${MONTH[today.getMonth()]}\n}\n\nmodule.exports = {\n  dateTime,\n};\n\n\n//# sourceURL=webpack:///./src/dateTimeUser.js?");

/***/ }),

/***/ "./src/geocodeSearch.js":
/*!******************************!*\
  !*** ./src/geocodeSearch.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const URL_API = 'https://api.opencagedata.com/';\nconst KEY = '12ff4fe1ac804a4689043079fcfc5b48';\nconst input = document.getElementsByClassName('searchcityinput');\nconst history = [];\n\nasync function geoCodeUser(city) {\n  try {\n    const storageLanguage = localStorage.getItem('language');\n\n    const url = `${URL_API}geocode/v1/json?q=${city}&key=${KEY}&pretty=1&no_annotations=1&language=${storageLanguage}`;\n    const promise = fetch(url)\n      .then((response) => response.json());\n    const result = await promise;\n    history.push(result.results[0].geometry);\n\n    // insert city country\n    const citySearch = result.results[0].components.city;\n    const stateSearch = result.results[0].components.state;\n    const countySearch = result.results[0].components.county;\n    const formatted = result.results[0].formatted.toUpperCase();\n    const country = result.results[0].components.country.toUpperCase();\n\n    const spanCity = document.querySelector('.city');\n    const spanCountry = document.querySelector('.country');\n\n    if (citySearch !== undefined) {\n      spanCity.textContent = `${citySearch.toUpperCase()},`;\n      spanCountry.textContent = ` ${country}`;\n    } else if (countySearch !== undefined) {\n      spanCity.textContent = `${countySearch.toUpperCase()},`;\n      spanCountry.textContent = ` ${country}`;\n    } else if (stateSearch !== undefined) {\n      spanCity.textContent = `${stateSearch.toUpperCase()},`;\n      spanCountry.textContent = ` ${country}`;\n    } else if (country === undefined) {\n      spanCity.textContent = '';\n      spanCountry.textContent = `${formatted}`;\n    } else {\n      spanCity.textContent = '';\n      spanCountry.textContent = `Country: ${country}`;\n    }\n\n    // insert geometry\n    const latitude = document.querySelector('.latitude');\n    const longitude = document.querySelector('.longitude');\n\n    if (storageLanguage === 'ru') {\n      latitude.textContent = `Широта: ${result.results[0].geometry.lat}`;\n      longitude.textContent = `Долгота: ${result.results[0].geometry.lng}`;\n    } else if (storageLanguage === 'be') {\n      latitude.textContent = `Шырата: ${result.results[0].geometry.lat}`;\n      longitude.textContent = `Даўгата: ${result.results[0].geometry.lng}`;\n    } else {\n      latitude.textContent = `Latitude: ${result.results[0].geometry.lat}`;\n      longitude.textContent = `Longitude: ${result.results[0].geometry.lng}`;\n    }\n\n    return result.results[0].geometry;\n  } catch (err) {\n    input[0].value = 'invalid value';\n    input[0].setAttribute('style', 'color:red;');\n    setTimeout(() => {\n      input[0].value = '';\n      input[0].removeAttribute('style');\n    }, 3000);\n  }\n  return history[history.length - 1];\n}\n\nmodule.exports = {\n  geoCodeUser,\n};\n\n\n//# sourceURL=webpack:///./src/geocodeSearch.js?");

/***/ }),

/***/ "./src/imageCityUser.js":
/*!******************************!*\
  !*** ./src/imageCityUser.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const URL_API = 'https://api.unsplash.com/';\nconst CLIENT_ID = '87e26779aa6242a2b2fc8e863886185d1d1f07215e4890071e45448baedf8950';\n\nasync function setBackgroundImage(monthtime, weather, city) {\n  const url = `${URL_API}photos/random?query=${monthtime},${weather},${city}&client_id=${CLIENT_ID}`;\n  const promise = fetch(url)\n    .then((response) => response.json());\n  const result = await promise;\n  const backgroundFancyWeather = document.querySelector('.background');\n  backgroundFancyWeather.setAttribute('style', `background:url(${result.urls.regular});background-repeat:no-repeat;background-position:center;overflow:hidden;`);\n  const allDiv = document.querySelectorAll('div');\n  allDiv[1].className = 'refresh';\n}\n\nmodule.exports = {\n  setBackgroundImage,\n};\n\n\n//# sourceURL=webpack:///./src/imageCityUser.js?");

/***/ }),

/***/ "./src/mapUser.js":
/*!************************!*\
  !*** ./src/mapUser.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const URL_API = 'https://api.opencagedata.com/';\nconst KEY = '12ff4fe1ac804a4689043079fcfc5b48';\n\nasync function mapUser(cord) {\n  const url = `${URL_API}geocode/v1/map?q=${cord}&key=${KEY}&pretty=1&no_annotations=1&abbrv=1`;\n  const promise = fetch(url)\n    .then((response) => response);\n  const result = await promise;\n  const maps = document.querySelector('.maps');\n  maps.src = result.url;\n}\n\nmodule.exports = {\n  mapUser,\n};\n\n\n//# sourceURL=webpack:///./src/mapUser.js?");

/***/ }),

/***/ "./src/speech.js":
/*!***********************!*\
  !*** ./src/speech.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function speechInput() {\n  window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;\n  const recognition = new window.SpeechRecognition();\n  recognition.interimResults = true;\n  recognition.maxAlternatives = 10;\n  recognition.onresult = (event) => {\n    const speechToText = event.results[0][0].transcript;\n    document.querySelector('.searchcityinput').value = speechToText;\n  };\n  recognition.start();\n}\n\nmodule.exports = {\n  speechInput,\n};\n\n\n//# sourceURL=webpack:///./src/speech.js?");

/***/ }),

/***/ "./src/timeZone.js":
/*!*************************!*\
  !*** ./src/timeZone.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const API_GATEWAY = 'https://api.timezonedb.com/';\nconst API_KEY = 'XM23RFKXPW3D';\n\nasync function timeDateCity(lat, lng) {\n  const url = `${API_GATEWAY}v2.1/get-time-zone?key=${API_KEY}&format=json&by=position&lat=${lat}&lng=${lng}`;\n  const promise = fetch(url)\n    .then((response) => response.json());\n  const result = await promise;\n  return result.formatted;\n}\n\nmodule.exports = {\n  timeDateCity,\n};\n\n\n//# sourceURL=webpack:///./src/timeZone.js?");

/***/ }),

/***/ "./src/translate.js":
/*!**************************!*\
  !*** ./src/translate.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const API_KEY = 'trnsl.1.1.20191212T163559Z.5976e236f00df928.df3aab73e789795377c7f6b4f57195e585fb0e53';\nconst URL_API = 'https://translate.yandex.net/';\n\nasync function translate(language, text) {\n  const url = `${URL_API}api/v1.5/tr.json/translate?lang=${language}&key=${API_KEY}&text=${text}`;\n  const promise = fetch(url)\n    .then((response) => response.json());\n  const result = await promise;\n  return result.text;\n}\n\nfunction translater(lang) {\n  localStorage.setItem('language', lang);\n\n  const allFirst = document.querySelectorAll('.day0, .day1, .day2, .date, .latitude, .longitude');\n  const forTranslate = [];\n  for (let i = 0; i < allFirst.length; i += 1) {\n    forTranslate.push(allFirst[i].textContent);\n  }\n  const answer = translate(lang, forTranslate.join('|'));\n  answer.then((data) => {\n    const split = data[0].split('|');\n    for (let i = 0; i < allFirst.length; i += 1) {\n      allFirst[i].textContent = split[i];\n    }\n  });\n  const allSecond = document.querySelectorAll('.city, .country, .summaryWeather, .apparentTemp, .humidity');\n  for (let i = 0; i < allSecond.length; i += 1) {\n    if (allSecond[i].textContent !== '') {\n      const element = translate(lang, allSecond[i].textContent);\n      element.then((data) => {\n        if (data !== undefined) {\n          allSecond[i].textContent = data[0].toUpperCase();\n        }\n      });\n    }\n  }\n  const windSpeed = document.querySelector('.windSpeed');\n  const storageTemp = localStorage.getItem('temp');\n  const wind = windSpeed.textContent.match(/\\d+\\.\\d+/g);\n  if (storageTemp === 'imperial') { // str.match(/\\d+\\.\\d+/g);\n    if (lang === 'ru') {\n      windSpeed.innerHTML = `ВЕТЕР: ${wind[wind.length - 1]} миль/ч`;\n    } else if (lang === 'be') {\n      windSpeed.innerHTML = `ВЕЦЕР: ${wind[wind.length - 1]} міль/г`;\n    } else {\n      windSpeed.innerHTML = `WIND: ${wind[wind.length - 1]} mph`;\n    }\n  } else if (lang === 'ru') {\n    windSpeed.innerHTML = `ВЕТЕР: ${wind[wind.length - 1]} м/c`;\n  } else if (lang === 'be') {\n    windSpeed.innerHTML = `ВЕЦЕР: ${wind[wind.length - 1]} м/c`;\n  } else {\n    windSpeed.innerHTML = `WIND: ${wind[wind.length - 1]} m/s`;\n  }\n\n  const inputs = document.querySelectorAll('.searchcityinput, .searchcityclick');\n  const placeholder = translate(lang, inputs[0].placeholder);\n  placeholder.then((data) => {\n    inputs[0].placeholder = data[0];\n  });\n  const value = translate(lang, inputs[1].value);\n  value.then((data) => {\n    inputs[1].value = data[0].toUpperCase();\n  });\n}\n\nmodule.exports = {\n  translate,\n  translater,\n};\n\n\n//# sourceURL=webpack:///./src/translate.js?");

/***/ }),

/***/ "./src/weatherUser.js":
/*!****************************!*\
  !*** ./src/weatherUser.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const APPID = 'c6b65e868774bd345d33ca46c70b7a17';\nconst URL_API_OPENWEATHER = 'https://api.openweathermap.org/';\nconst URL_API_ICON = 'http://openweathermap.org/';\nconst DAYWEEK_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];\nconst DAYWEEK_RU = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];\nconst DAYWEEK_BE = ['Нядзеля', 'Панядзелак', 'Аўторак', 'Серада', 'Чацвер', 'Пятніца', 'Субота'];\nconst { translate } = __webpack_require__(/*! ./translate */ \"./src/translate.js\");\n\n// imperial [F] metric [C] mph [F] m/s [C]\nasync function weatherUser(lat, lon, measure) {\n  const degreeC = document.querySelector('.degreeC');\n  const degreeF = document.querySelector('.degreeF');\n\n  if (measure === 'metric') {\n    if (degreeF.hasAttribute('style')) {\n      degreeF.removeAttribute('style');\n    }\n    degreeC.setAttribute('style', 'background-color:rgba(252,252,252,0.767);border-radius:7px;');\n  } else {\n    degreeC.removeAttribute('style');\n    degreeF.setAttribute('style', 'background-color:rgba(252,252,252,0.767);border-radius:7px;');\n  }\n\n  const storageLanguage = localStorage.getItem('language');\n  const url = `${URL_API_OPENWEATHER}data/2.5/forecast?lat=${lat}&lon=${lon}&lang=en&units=${measure}&APPID=${APPID}`;\n  const promise = fetch(url)\n    .then((response) => response.json());\n  const result = await promise;\n\n  // insert temp\n  const spanTemp = document.querySelector('.temp');\n  spanTemp.innerHTML = `${Math.round(result.list[0].main.temp)}°`;\n\n  // insert img weather\n  const imgWeather = document.querySelector('.imgWeather');\n  imgWeather.src = `${URL_API_ICON}img/wn/${result.list[0].weather[0].icon}@2x.png`;\n\n  // insert summary weather\n  const summaryWeather = document.querySelector('.summaryWeather');\n  const summaryInner = result.list[0].weather[0].description.toUpperCase();\n  if (storageLanguage === 'ru') {\n    const answer = translate(storageLanguage, summaryInner);\n    answer.then((dataRu) => {\n      summaryWeather.textContent = dataRu[0].toUpperCase();\n    });\n  } else if (storageLanguage === 'be') {\n    const answer = translate(storageLanguage, summaryInner);\n    answer.then((dataBe) => {\n      summaryWeather.textContent = dataBe[0].toUpperCase();\n    });\n  } else {\n    summaryWeather.textContent = summaryInner;\n  }\n\n  // insert apparent temp\n  const spanApparentTemp = document.querySelector('.apparentTemp');\n  if (storageLanguage === 'ru') {\n    spanApparentTemp.textContent = `ОЩУЩАЕТСЯ КАК: ${result.list[0].main.feels_like}`;\n  } else if (storageLanguage === 'be') {\n    spanApparentTemp.textContent = `АДЧУВАЕЦЦА ЯК: ${result.list[0].main.feels_like}`;\n  } else {\n    spanApparentTemp.textContent = `FEELS LIKE: ${result.list[0].main.feels_like}`;\n  }\n\n  // insert wind speed\n  const windSpeed = document.querySelector('.windSpeed');\n  if (measure === 'imperial') {\n    if (storageLanguage === 'ru') {\n      windSpeed.innerHTML = `ВЕТЕР: ${result.list[0].wind.speed} миль/ч`;\n    } else if (storageLanguage === 'be') {\n      windSpeed.innerHTML = `ВЕЦЕР: ${result.list[0].wind.speed} міль/г`;\n    } else {\n      windSpeed.innerHTML = `WIND: ${result.list[0].wind.speed} mph`;\n    }\n  } else if (storageLanguage === 'ru') {\n    windSpeed.innerHTML = `ВЕТЕР: ${result.list[0].wind.speed} м/c`;\n  } else if (storageLanguage === 'be') {\n    windSpeed.innerHTML = `ВЕЦЕР: ${result.list[0].wind.speed} м/c`;\n  } else {\n    windSpeed.innerHTML = `WIND: ${result.list[0].wind.speed} m/s`;\n  }\n\n  // insert humidity\n  const humidity = document.querySelector('.humidity');\n  if (storageLanguage === 'ru') {\n    humidity.innerHTML = `ВЛАЖНОСТЬ: ${result.list[0].main.humidity} %`;\n  } else if (storageLanguage === 'be') {\n    humidity.innerHTML = `ВІЛЬГОТНАСЦЬ: ${result.list[0].main.humidity} %`;\n  } else {\n    humidity.innerHTML = `HUMIDITY: ${result.list[0].main.humidity} %`;\n  }\n\n  // insert weather on three day\n  for (let i = 0, iweather = 8; i < 3; i += 1, iweather += 8) {\n    const spanDay = document.querySelector(`.day${i}`);\n    if (storageLanguage === 'ru') {\n      spanDay.innerHTML = DAYWEEK_RU[new Date(result.list[iweather].dt_txt).getDay()];\n    } else if (storageLanguage === 'be') {\n      spanDay.innerHTML = DAYWEEK_BE[new Date(result.list[iweather].dt_txt).getDay()];\n    } else {\n      spanDay.innerHTML = DAYWEEK_EN[new Date(result.list[iweather].dt_txt).getDay()];\n    }\n    const spanTempTomorrow = document.querySelector(`.temp${i}`);\n    spanTempTomorrow.innerHTML = `${Math.round(result.list[iweather].main.temp)}°`;\n    const imgWeatherTomorrow = document.querySelector(`.iconWeather${i}`);\n    imgWeatherTomorrow.src = `${URL_API_ICON}img/wn/${result.list[iweather].weather[0].icon}@2x.png`;\n  }\n  return result.list[0].weather[0].main;\n}\n\nmodule.exports = {\n  weatherUser,\n};\n\n\n//# sourceURL=webpack:///./src/weatherUser.js?");

/***/ })

/******/ });