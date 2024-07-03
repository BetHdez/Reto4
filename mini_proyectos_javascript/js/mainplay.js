const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let radioPelota = 40;
let alturaPaleta = 10;
let anchoPaleta = 75;
let posXPaleta;
let derechaPresionada = false;
let izquierdaPresionada = false;
let filasLadrillos = 3;
let columnasLadrillos = 5;
let anchoLadrillo;
let alturaLadrillo = 20;
let rellenoLadrillo = 10;
let margenSuperiorLadrillos = 30;
let margenIzquierdoLadrillos = 30;
let puntuacion = 0;
let vidas = 3;

let x, y, dx, dy;
let ladrillos = [];

// Variables de color
const colorPelota = "#D7BDE2";
const colorPaleta = "#purple";
const colorLadrillo = "#C0C0C0";
const colorPuntuacion = "red";
const colorVidas = "red";
const colorFinJuego = "red";

// Velocidad de la pelota
const dxInicial = 10;
const dyInicial = 10;

function initJuego() {
    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight * 0.9;
    radioPelota = canvas.width * 0.02;
    anchoPaleta = canvas.width * 0.15;
    alturaPaleta = canvas.height * 0.03;
    anchoLadrillo = (canvas.width - margenIzquierdoLadrillos * 2 - (columnasLadrillos - 1) * rellenoLadrillo) / columnasLadrillos;

    posXPaleta = (canvas.width - anchoPaleta) / 2;
    x = canvas.width / 2;
    y = canvas.height - 30;
    dx = 2;
    dy = -2;

    ladrillos = [];
    for (let c = 0; c < columnasLadrillos; c++) {
        ladrillos[c] = [];
        for (let r = 0; r < filasLadrillos; r++) {
            ladrillos[c][r] = { x: 0, y: 0, estado: 1 };
        }
    }
}

window.addEventListener('resize', initJuego);
document.addEventListener("keydown", manejadorTeclaAbajo, false);
document.addEventListener("keyup", manejadorTeclaArriba, false);

function manejadorTeclaAbajo(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        derechaPresionada = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        izquierdaPresionada = true;
    }
}

function manejadorTeclaArriba(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        derechaPresionada = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        izquierdaPresionada = false;
    }
}

function deteccionColisiones() {
    for (let c = 0; c < columnasLadrillos; c++) {
        for (let r = 0; r < filasLadrillos; r++) {
            const b = ladrillos[c][r];
            if (b.estado == 1) {
                if (
                    x > b.x &&
                    x < b.x + anchoLadrillo &&
                    y > b.y &&
                    y < b.y + alturaLadrillo
                ) {
                    dy = -dy;
                    b.estado = 0;
                    puntuacion++;
                    if (puntuacion == filasLadrillos * columnasLadrillos) {
                        alert("GANASTE");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function dibujarPelota() {
    ctx.beginPath();
    ctx.arc(x, y, radioPelota, 0, Math.PI * 2);
    ctx.fillStyle = colorPelota; // Color de la pelota
    ctx.fill();
    ctx.closePath();
}

function dibujarPaleta() {
    ctx.beginPath();
    ctx.rect(posXPaleta, canvas.height - alturaPaleta, anchoPaleta, alturaPaleta);
    ctx.fillStyle = colorPaleta; // Color de la paleta
    ctx.fill();
    ctx.closePath();
}

function dibujarLadrillos() {
    for (let c = 0; c < columnasLadrillos; c++) {
        for (let r = 0; r < filasLadrillos; r++) {
            if (ladrillos[c][r].estado == 1) {
                const ladrilloX = c * (anchoLadrillo + rellenoLadrillo) + margenIzquierdoLadrillos;
                const ladrilloY = r * (alturaLadrillo + rellenoLadrillo) + margenSuperiorLadrillos;
                ladrillos[c][r].x = ladrilloX;
                ladrillos[c][r].y = ladrilloY;
                ctx.beginPath();
                ctx.rect(ladrilloX, ladrilloY, anchoLadrillo, alturaLadrillo);
                ctx.fillStyle = colorLadrillo; // Color de los ladrillos
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function dibujarPuntuacion() {
    ctx.font = "16px roboto";
    ctx.fillStyle = colorPuntuacion; // Color del puntaje
    ctx.fillText("Puntuación: " + puntuacion, 8, 20);
}

function dibujarVidas() {
    ctx.font = "16px Roboto";
    ctx.fillStyle = colorVidas; // Color de las vidas
    ctx.fillText("Vidas: " + vidas, canvas.width - 65, 20);
}

function dibujarFinJuego() {
    ctx.font = "50px Roboto";
    ctx.fillStyle = colorFinJuego; // Color del mensaje "GAME OVER"
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
}

function dibujar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dibujarLadrillos();
    dibujarPelota();
    dibujarPaleta();
    dibujarPuntuacion();
    dibujarVidas();
    deteccionColisiones();

    if (x + dx > canvas.width - radioPelota || x + dx < radioPelota) {
        dx = -dx;
    }
    if (y + dy < radioPelota) {
        dy = -dy;
    } else if (y + dy > canvas.height - radioPelota) {
        if (x > posXPaleta && x < posXPaleta + anchoPaleta) {
            dy = -dy;
        } else {
            vidas--;
            if (!vidas) {
                dibujarFinJuego();
                return;
            } else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 3;
                dy = -3;
                posXPaleta = (canvas.width - anchoPaleta) / 2;
            }
        }
    }

    if (derechaPresionada && posXPaleta < canvas.width - anchoPaleta) {
        posXPaleta += 7;
    } else if (izquierdaPresionada && posXPaleta > 0) {
        posXPaleta -= 7;
    }

    x += dx;
    y += dy;
    requestAnimationFrame(dibujar);
}

initJuego();
dibujar();


