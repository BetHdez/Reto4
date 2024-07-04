import requests
from bs4 import BeautifulSoup

def extraer_sitio_web(url):
    try:
        respuesta = requests.get(url)
        respuesta.raise_for_status()  
    except requests.exceptions.RequestException as e:
        print(f"Error al realizar la solicitud HTTP: {e}")
        return []
    sopa = BeautifulSoup(respuesta.content, 'html.parser')
    articulos = sopa.find_all('h2', class_='news__title')
    if not articulos:
        print("No se encontraron artículos con la clase 'news__title'")
    datos = []
    for articulo in articulos:
        titulo = articulo.get_text().strip()
        enlace = articulo.find('a')['href']
        datos.append({'titulo': titulo, 'enlace': enlace})
    
    return datos
