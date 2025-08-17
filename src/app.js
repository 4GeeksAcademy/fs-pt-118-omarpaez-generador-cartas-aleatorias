import "bootstrap";
import "./style.css";


import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";
const sticks = ["heart", "spade", "diamond", "club"]
const numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'K', 'Q', 'J', 'A']
const btnNewCard = document.querySelector("#btnNewCard")
const btnTimer = document.querySelector("#btnTimer")
const btnDimensions = document.querySelector("#btnDimensions")
const btnAdjust = document.querySelector("#btnAdjust")
const divMsg = document.querySelector("#divMsg")
const divDimensions = document.querySelector("#divDimensions")
const numberCard = document.querySelector("#number")
const classStick = document.querySelector(".cards")
const firtsStick = document.querySelector("#firtsStick")
const secondStick = document.querySelector("#secondStick")
const userHeigth = document.querySelector("#userHeigth")
const userWidth = document.querySelector("#userWidth")


let interval;


function generateMsg(type, msg, activate) {   // funcion para generear el mensaje en el div. segun el tipo de mensaje que se quiera mostrar


  
  divMsg.classList.replace('hidden', 'show')
  divMsg.textContent = msg
  divMsg.classList.replace('alert-info', `alert-${type}`)
  
  if(!activate){ //si recibe como parametreo false en activate se oculta el div inmediatamente
    divMsg.classList.replace('show', 'hidden')
  }
  
  if (type==="danger") { //mensajes typo error se ocultan a los 3 segundos para poder leer en pantalla
    
    setTimeout(() => {
      divMsg.classList.replace('show', 'hidden') // se oculta el div del mensaje
      divMsg.classList.replace('alert-danger', 'alert-info')  //se restablece la clase por defecto alert-info
      divMsg.textContent = ""
    }, 3000);
  }


}


let adjustDimensions = () => {
  let newWhidth = parseInt(userWidth.value)
  let newHeight = parseInt(userHeigth.value)

  if(newHeight > 1000 || newHeight < 300  || newWhidth > 700 || newWhidth < 200 ){  //condicion para poner limites a los valores introducidos por teclado
    generateMsg('danger','Valores fuera de rango', true)
    return
  }


  if (newWhidth && !newHeight) {    // con esta condicion veridicamos si alguno de los input esta vacio, ejecuta la formula para la tarjeta siempe tenga una relacion 2:3
    newHeight = Math.round((newWhidth * 3) / 2)
    userHeigth.value = newHeight
  } else if (newHeight && !newWhidth) {
    newWhidth = Math.round((newHeight * 2) / 3)
    userWidth.value = newWhidth
  }

  classStick.style.width = newWhidth + "px"
  classStick.style.height = newHeight + "px"

  //aqui escalamos el tamaño de los palos y el numero relativo al tamaño de la tarjeta
  firtsStick.style.fontSize = Math.round(newHeight/6)+"px"
  secondStick.style.fontSize = Math.round(newHeight/6)+"px"
  numberCard.style.fontSize = Math.round(newHeight/2)+"px"


}


function activeDimensions(){
  if (divDimensions.classList.contains('hidden')) {
    divDimensions.classList.replace('hidden', 'show')
    btnDimensions.innerText = "Restablecer Tamaño"
    return
  }
  if (divDimensions.classList.contains('show')) {
    divDimensions.classList.replace('show', 'hidden')
    btnDimensions.innerText = "Modificar Tamaño"
    userHeigth.value = ""
    userWidth.value = ""
  }

}

function activeTimer() { 
  let seconds = 10

  if (divMsg.classList.contains('hidden')) {
    
    btnTimer.innerText = "Desactivar Temporizador" //cambia el texto del boton para reutilizarlo y desactivar el timer
    interval = setInterval(() => { // se activa el setInterval para que cada 10 segundos genere una nueva carta ejecutando la funcion genereteCard
      generateMsg('info', `La nueva carta se genera en: ${seconds} Segundos`, true)
     
      if (seconds === 0) {  //cuando llega a 0 genera una nueva carta
        generateCard();
        seconds = 10
      } else {
        seconds--;
      }

    }, 1000);
    return
  }

  if (divMsg.classList.contains('show')) { //si vuelve a clickear el boton del timer y se verifica que esta visible el div se ejecuta la misma funcion del mensaje, ahora desactivando
     generateMsg('info', ``, false)
     
    btnTimer.innerText = "Activar Temporizador"
    clearInterval(interval)
    seconds = 10
  }
}

function randomStick() {
  return sticks[Math.floor(Math.random() * sticks.length)]
}

function randomNumber() {
  return numbers[Math.floor(Math.random() * numbers.length)]
}


//♦ ♥ ♠ ♣

function generateCard() {
  const stickRandom = randomStick()
  const numberRandom = randomNumber()


  numberCard.textContent = numberRandom // agregamos el numero random de la tarjeta en el div 
  classStick.classList.replace(classStick.classList[1], stickRandom)  // classList me devuele la lista de clases actual, de alli tomo la clase en index 1 y la reemplazo por la nueva clase
  console.log("Pasaron 10seg")
  // codicionales que agrega al contendido de los stick los simbolos segun el stick random
  if (stickRandom === "heart") {
    firtsStick.textContent = "♥"
    secondStick.textContent = "♥"
  } else if (stickRandom === "spade") {
    firtsStick.textContent = "♠"
    secondStick.textContent = "♠"
  } else if (stickRandom === "diamond") {
    firtsStick.textContent = "♦"
    secondStick.textContent = "♦"
  } else {
    firtsStick.textContent = "♣"
    secondStick.textContent = "♣"
  }

}

// eventos del click 
btnNewCard.addEventListener("click", generateCard)
btnTimer.addEventListener("click", activeTimer)
btnDimensions.addEventListener("click", activeDimensions)
btnAdjust.addEventListener("click", adjustDimensions)





window.onload = function () {
  //write your code here

  generateCard()


};
