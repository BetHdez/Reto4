function startRecognition() {
    if (!('webkitSpeechRecognition' in window)) {
        alert('API de reconocimiento de voz no soportada');
        return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = function() {
        console.log('Iniciando reconocimiento...');
    };

    recognition.onresult = function(event) {
        const result = event.results[0][0].transcript;
        const numberElement = document.getElementById('number');
        numberElement.innerText = `Número detectado: ${result}`;
        numberElement.classList.add('appear');
        console.log(`Número detectado: ${result}`);

        setTimeout(() => {
            numberElement.classList.remove('appear');
        }, 500);
    };

    recognition.onerror = function(event) {
        console.error('Error de reconocimiento: ', event.error);
    };

    recognition.onend = function() {
        console.log('Reconocimiento terminado.');
    };

    recognition.start();
}
