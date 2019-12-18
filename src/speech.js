function speechInput() {
  window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
  const recognition = new window.SpeechRecognition();
  recognition.interimResults = true;
  recognition.maxAlternatives = 10;
  recognition.onresult = (event) => {
    const speechToText = event.results[0][0].transcript;
    document.querySelector('.searchcityinput').value = speechToText;
  };
  recognition.start();
}

module.exports = {
  speechInput,
};
