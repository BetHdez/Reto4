from flask import Flask, render_template, request
from num2words import num2words

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    num_palabra = ""
    if request.method == 'POST':
        num = request.form.get('num')
        try:
            num = int(num)
            num_palabra = num2words(num, lang='es')
        except ValueError:
            num_palabra = "Por favor, introduce un número válido."
    return render_template('index.html', num_palabra=num_palabra)

if __name__ == '__main__':
    app.run(debug=True)

