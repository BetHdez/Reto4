const cuentaRegresiva = () => {
    const fechaObjetivo = new Date('Jan 1, 2025 00:00:00').getTime();
    const ahora = new Date().getTime();
    const diferencia = fechaObjetivo - ahora;

    const segundo = 1000;
    const minuto = segundo * 60;
    const hora = minuto * 60;
    const día = hora * 24;

    const textoDía = Math.floor(diferencia / día);
    const textoHora = Math.floor((diferencia % día) / hora);
    const textoMinuto = Math.floor((diferencia % hora) / minuto);
    const textoSegundo = Math.floor((diferencia % minuto) / segundo);

    document.getElementById('days').innerText = textoDía;
    document.getElementById('hours').innerText = textoHora;
    document.getElementById('minutes').innerText = textoMinuto;
    document.getElementById('seconds').innerText = textoSegundo;
};

setInterval(cuentaRegresiva, 1000);
