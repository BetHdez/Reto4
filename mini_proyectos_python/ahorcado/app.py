from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

palabras = ["digital", "juego", "sentidos", "errores", "programacion"]
palabra_oculta = random.choice(palabras)
letras_adivinadas = []
max_intentos = 6
intentos_restantes = max_intentos

def obtener_letras():
    return ''.join([letra if letra in letras_adivinadas else '_' for letra in palabra_oculta])

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/guess', methods=['POST'])
def guess():
    global intentos_restantes
    letra = request.json['letra']
    if letra not in letras_adivinadas:
        letras_adivinadas.append(letra)
        if letra not in palabra_oculta:
            intentos_restantes -= 1
    mostrar_letra = obtener_letras()
    juego_terminado = intentos_restantes == 0 or mostrar_letra == palabra_oculta
    return jsonify({
        'mostrar_letra': mostrar_letra,
        'intentos_restantes': intentos_restantes,
        'juego_terminado': juego_terminado,
        'ganaste': mostrar_letra == palabra_oculta,
        'palabra_oculta': palabra_oculta
    })

@app.route('/restart', methods=['POST'])
def restart():
    global palabra_oculta, letras_adivinadas, intentos_restantes
    palabra_oculta = random.choice(palabras)
    letras_adivinadas = []
    intentos_restantes = max_intentos
    return jsonify({
        'mostrar_letra': obtener_letras(),
        'intentos_restantes': intentos_restantes
    })

if __name__ == '__main__':
    app.run(debug=True)

