// index.js
const worker1 = new Worker("worker.js");
const worker2 = new Worker("worker.js");
const worker3 = new Worker("worker.js");

var seg1 = 0;
var seg2 = 0;
var seg3 = 0;

// Funciones para comunicarse con los Workers
function iniciarCronometro(worker, intervalo, segmento) {
  worker.postMessage({ action: "iniciar", intervalo });
  segmento = 0;
}

function pausarCronometro(worker, segmento) {
  worker.postMessage({ action: "pausar" });
  segmento = 0;
}

function continuarCronometro(worker, intervalo, segmento) {
  worker.postMessage({ action: "continuar", intervalo });
}

function terminarCronometro(worker, segmento) {
  worker.postMessage({ action: "terminar" });
  segmento = 0;
}

// Manejar mensajes del Worker
worker1.onmessage = function (event) {
  seg1 = event.data;
  document.getElementById("cronometro1").textContent = convertirASegundos(seg1);
};

worker2.onmessage = function (event) {
  seg2 = event.data;
  document.getElementById("cronometro2").textContent = convertirASegundos(seg2);
};

worker3.onmessage = function (event) {
  seg3 = event.data;
  document.getElementById("cronometro3").textContent = convertirASegundos(seg3);
};

// Manejar eventos de los botones
document.getElementById("iniciar1").addEventListener("click", () => {
  iniciarCronometro(worker1, 1, seg1);
});

document.getElementById("terminar1").addEventListener("click", () => {
  terminarCronometro(worker1, seg1);
});

document.getElementById("pausar1").addEventListener("click", () => {
  pausarCronometro(worker1, seg1);
});

document.getElementById("continuar1").addEventListener("click", () => {
  continuarCronometro(worker1, 1, seg1);
});

document.getElementById("iniciar2").addEventListener("click", () => {
  iniciarCronometro(worker2, 3, seg2);
});

document.getElementById("terminar2").addEventListener("click", () => {
  terminarCronometro(worker2, seg2);
});

document.getElementById("pausar2").addEventListener("click", () => {
  pausarCronometro(worker2, seg2);
});

document.getElementById("continuar2").addEventListener("click", () => {
  continuarCronometro(worker2, 3, seg2);
});

document.getElementById("iniciar3").addEventListener("click", () => {
  iniciarCronometro(worker3, 6, seg3);
});

document.getElementById("terminar3").addEventListener("click", () => {
  terminarCronometro(worker3, seg3);
});

document.getElementById("pausar3").addEventListener("click", () => {
  pausarCronometro(worker3, seg3);
});

document.getElementById("continuar3").addEventListener("click", () => {
  continuarCronometro(worker3, 6, seg3);
});

// Botón para pausar todos los cronómetros
document.getElementById("pausarTodos").addEventListener("click", () => {
  pausarCronometro(worker1, seg1);
  pausarCronometro(worker2, seg2);
  pausarCronometro(worker3, seg3);
});

function convertirASegundos(segundosTotales) {
  const minutos = Math.floor(segundosTotales / 60);
  const segundos = segundosTotales % 60;
  return `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
}
