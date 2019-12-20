function speechInput() {
  window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
  const recognition = new window.SpeechRecognition();
  recognition.interimResults = true;
  recognition.maxAlternatives = 10;
  const storageLanguage = localStorage.getItem('language');
  recognition.lang = storageLanguage;
  recognition.onresult = (event) => {
    const speechToText = event.results[0][0].transcript;
    document.querySelector('.searchcityinput').value = speechToText;
  };
  recognition.start();
}

module.exports = {
  speechInput,
};
