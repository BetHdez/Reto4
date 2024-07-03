const letras = 'abcdefghijklmnopqrstuvwxyz'.split('');
const keyboard = document.getElementById('keyboard');
letras.forEach(letra => {
    const button = document.createElement('button');
    button.textContent = letra;
    button.onclick = () => adivinar(letra);
    keyboard.appendChild(button);
});

function adivinar(letra) {
    fetch('/guess', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ letra: letra })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('mostrarLetra').textContent = data.mostrar_letra;
        document.getElementById('intentosRestantes').textContent = 'Intentos restantes: ' + data.intentos_restantes;
        document.getElementById('imagenes').src = '/static/' + data.intentos_restantes + '.png';
        const button = Array.from(keyboard.children).find(btn => btn.textContent === letra);
        if (button) {
            button.disabled = true;
            button.classList.add(data.palabra_oculta.includes(letra) ? 'correcto' : 'error');
        }
        if (data.juego_terminado) {
            const mensaje = data.ganaste? '¡A D I V I N A S T E!' : '¡GAME OVER!  La palabra era: ' + data.palabra_oculta;
            document.getElementById('mensaje').textContent = mensaje;
            Array.from(keyboard.children).forEach(btn => btn.disabled = true);
        }
    });
}

function reiniciar() {
    fetch('/restart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('mostrarLetra').textContent = data.mostrar_letra;
        document.getElementById('intentosRestantes').textContent = 'Intentos restantes: ' + data.intentos_restantes;
        document.getElementById('imagenes').src = '/static/6.png';
        document.getElementById('letraEntrante').disabled = false;
        document.getElementById('mensaje').textContent = '';
        Array.from(keyboard.children).forEach(btn => {
            btn.disabled = false;
            btn.classList.remove('correcto', 'error');
        });
    });
}