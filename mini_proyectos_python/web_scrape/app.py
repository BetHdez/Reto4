from flask import Flask, render_template, request
from scraper import extraer_sitio_web

app = Flask(__name__)

@app.route('/')
def inicio():
    return render_template('index.html')

@app.route('/extraer', methods=['POST'])
def extraer():
    url = request.form['url']
    datos = extraer_sitio_web(url)
    return render_template('index.html', datos=datos)

if __name__ == '__main__':
    app.run(debug=True)
