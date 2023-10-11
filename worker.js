let intervalId;
let interval;


self.addEventListener('message', (event) => {
    if (event.data.action === 'iniciar') {
        interval = 0;
        console.log("interval = " + interval);
        intervalId = setInterval(() => {
            interval += event.data.intervalo;
            self.postMessage(interval);
        }, 1000);
    } else if (event.data.action === 'pausar') {
        clearInterval(intervalId);          
    } else if (event.data.action === 'continuar') {
        intervalId = setInterval(() => {
            interval += event.data.intervalo;
            self.postMessage(interval);
        }, 1000);
    } else if (event.data.action === 'terminar') {
        clearInterval(intervalId);
        interval = 0;
        self.postMessage(interval);
    }
});


/* (() => {

    let hours = `00`,
        minutes = `00`,
        seconds = `00`,
        chronometerDisplay = document.querySelector(`[data-chronometer]`),
        chronometerCall
  
    function chronometer() {
  
      seconds ++
  
      if (seconds < 10) seconds = `0` + seconds
  
      if (seconds > 59) {
        seconds = `00`
        minutes ++
  
        if (minutes < 10) minutes = `0` + minutes
      }
  
      if (minutes > 59) {
        minutes = `00`
        hours ++
        
        if (hours < 10) hours = `0` + hours
      }
  
      chronometerDisplay.textContent = `${hours}:${minutes}:${seconds}`
  
    } 
}) */