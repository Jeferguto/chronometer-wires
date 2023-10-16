// Declara las variables para el intervalo y el ID del intervalo.
let intervalId;
let interval;

// Escucha mensajes del hilo principal.
self.addEventListener('message', (event) => {
  // Verifica el tipo de acción en el mensaje.
  if (event.data.action === 'iniciar') {
    // Inicia un cronómetro. Recibe el intervalo como parte de la acción.
    interval = 0;
    console.log("interval = " + interval);

    // Crea un intervalo que se ejecutará cada 1000 ms (1 segundo).
    intervalId = setInterval(() => {
      // Incrementa el intervalo por el valor especificado en el mensaje.
      interval += event.data.intervalo;
      // Envía el valor del intervalo de vuelta al hilo principal.
      self.postMessage(interval);
    }, 1000);
  } else if (event.data.action === 'pausar') {
    // Pausa el cronómetro al borrar el intervalo.
    clearInterval(intervalId);
  } else if (event.data.action === 'continuar') {
    // Continúa el cronómetro. Comienza un nuevo intervalo similar al inicio.
    intervalId = setInterval(() => {
      interval += event.data.intervalo;
      self.postMessage(interval);
    }, 1000);
  } else if (event.data.action === 'terminar') {
    // Detiene el cronómetro al borrar el intervalo y restablece el intervalo a 0.
    clearInterval(intervalId);
    interval = 0;
    // Envía el valor de intervalo restablecido al hilo principal.
    self.postMessage(interval);
  }
});
