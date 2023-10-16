// Crear nuevos Web Workers para los cronómetros
const worker1 = new Worker("worker.js");
const worker2 = new Worker("worker.js");
const worker3 = new Worker("worker.js");

// Variables para almacenar los segundos de cada cronómetro
var seg1 = 0;
var seg2 = 0;
var seg3 = 0;

// Funciones para comunicarse con los Workers
function iniciarCronometro(worker, intervalo, segmento) {
  // Enviar un mensaje al Web Worker para iniciar el cronómetro
  worker.postMessage({ action: "iniciar", intervalo });
  segmento = 0; // Restablecer el segmento del cronómetro
}

function pausarCronometro(worker, segmento) {
  // Enviar un mensaje al Web Worker para pausar el cronómetro
  worker.postMessage({ action: "pausar" });
  segmento = 0; // Restablecer el segmento del cronómetro
}

function continuarCronometro(worker, intervalo, segmento) {
  // Enviar un mensaje al Web Worker para continuar el cronómetro
  worker.postMessage({ action: "continuar", intervalo });
}

function terminarCronometro(worker, segmento) {
  // Enviar un mensaje al Web Worker para terminar el cronómetro
  worker.postMessage({ action: "terminar" });
  segmento = 0; // Restablecer el segmento del cronómetro
}

// Manejar mensajes del Worker
worker1.onmessage = function (event) {
  // Actualizar la variable seg1 con los segundos del Web Worker
  seg1 = event.data;
  // Actualizar el elemento de la interfaz con el tiempo convertido a minutos:segundos
  document.getElementById("cronometro1").textContent = convertirASegundos(seg1);
};

worker2.onmessage = function (event) {
  // Actualizar la variable seg2 con los segundos del Web Worker
  seg2 = event.data;
  // Actualizar el elemento de la interfaz con el tiempo convertido a minutos:segundos
  document.getElementById("cronometro2").textContent = convertirASegundos(seg2);
};

worker3.onmessage = function (event) {
  // Actualizar la variable seg3 con los segundos del Web Worker
  seg3 = event.data;
  // Actualizar el elemento de la interfaz con el tiempo convertido a minutos:segundos
  document.getElementById("cronometro3").textContent = convertirASegundos(seg3);
};

// Manejar eventos de los botones

// Cronómetro 1
document.getElementById("iniciar1").addEventListener("click", () => {
  // Llamar a la función para iniciar el cronómetro 1 con un intervalo de 1 segundo
  iniciarCronometro(worker1, 1, seg1);
});

document.getElementById("terminar1").addEventListener("click", () => {
  // Llamar a la función para terminar el cronómetro 1
  terminarCronometro(worker1, seg1);
});

document.getElementById("pausar1").addEventListener("click", () => {
  // Llamar a la función para pausar el cronómetro 1
  pausarCronometro(worker1, seg1);
});

document.getElementById("continuar1").addEventListener("click", () => {
  // Llamar a la función para continuar el cronómetro 1 con un intervalo de 1 segundo
  continuarCronometro(worker1, 1, seg1);
});

// Cronómetro 2 (Los comentarios para los botones del cronómetro 2 son similares a los del cronómetro 1)
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

// Cronómetro 3 (Los comentarios para los botones del cronómetro 3 son similares a los del cronómetro 1)
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
  // Llamar a la función para pausar todos los cronómetros
  pausarCronometro(worker1, seg1);
  pausarCronometro(worker2, seg2);
  pausarCronometro(worker3, seg3);
});

// Función para convertir segundos totales en minutos:segundos
function convertirASegundos(segundosTotales) {
  const minutos = Math.floor(segundosTotales / 60);
  const segundos = segundosTotales % 60;
  return `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
}
