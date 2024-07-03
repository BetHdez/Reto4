function iniciarReconocimiento() {
    if (!('webkitSpeechRecognition' in window)) {
        alert('API de reconocimiento de voz no soportada');
        return;
    }

    const reconocimiento = new webkitSpeechRecognition();
    reconocimiento.lang = 'es-ES';
    reconocimiento.continuo = false;
    reconocimiento.resultadosIntermedios = false;

    reconocimiento.onstart = function() {
        console.log('Iniciando reconocimiento...');
    };

    reconocimiento.onresult = function(evento) {
        const resultado = evento.results[0][0].transcript;
        const elementoNumero = document.getElementById('number');
        elementoNumero.innerText = `Número detectado: ${resultado}`;
        elementoNumero.classList.add('appear');
        console.log(`Número detectado: ${resultado}`);

        setTimeout(() => {
            elementoNumero.classList.remove('appear');
        }, 500);
    };

    reconocimiento.onerror = function(evento) {
        console.error('Error de reconocimiento: ', evento.error);
    };

    reconocimiento.onend = function() {
        console.log('Reconocimiento terminado.');
    };

    reconocimiento.start();
}

