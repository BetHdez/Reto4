from flask import Flask, request, render_template
import requests

app = Flask(__name__)

# mi clave de API de TMDb
API_KEY = 'c58d169ddaea6ea0f6f4df0052cf89ca'

@app.route('/', methods=['GET', 'POST'])
def index():
    peliculas = []
    if request.method == 'POST':
        titulop = request.form['titulop']
        response = requests.get(f'https://api.themoviedb.org/3/search/movie?query={titulop}&api_key={API_KEY}&language=es-MX')
        datosp = response.json()

        if 'results' in datosp and datosp['results']:
            peliculas = datosp['results'][:10]
        else:
            error = '¡Película no encontrada!'
            return render_template('index.html', error=error)
    
    return render_template('index.html', peliculas=peliculas)

@app.route('/popular')
def popular():
    response = requests.get(f'https://api.themoviedb.org/3/movie/popular?api_key={API_KEY}&language=es-MX')
    datosp = response.json()

    if 'results' in datosp:
        popular_movies = datosp['results'][:10]
    else:
        popular_movies = []

    return render_template('popular.html', peliculas=popular_movies)

if __name__ == '__main__':
    app.run(debug=True)

