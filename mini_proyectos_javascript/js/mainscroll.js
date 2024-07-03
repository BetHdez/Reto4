const contenedor = document.querySelector('.containerr');

window.addEventListener('scroll', () => {
    const { scrollHeight, clientHeight, scrollTop } = document.documentElement;

    console.log(`scrollTop + clientHeight = ${scrollTop + clientHeight} | Altura personalizada = ${scrollHeight - 3}`);
    if (scrollTop + clientHeight > scrollHeight - 5) {
        setTimeout(nuevoContenedor, 1000);
    }
});

const nuevoContenedor = () => {
    const cajas = ['d', 'e', 'f'];
    cajas.forEach(nombreClase => {
        const caja = document.createElement('div');
        caja.className = `box ${nombreClase}`;
        contenedor.appendChild(caja);
    });
}
