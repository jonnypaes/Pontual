// src/js/funcionario/base.js

// Software backbone. Entirely related to the business rule
// That's why it is temporarily written in Brazilian Portuguese 

// DB
const homeOffice = true;
const entradaFlexivel = false;
const almocoFlexivel = false;
const horaExtra = false;
const escalaEspecial = false;
const localExato = false;

// OnChange + OnListen
const tolerancia = 10;
const entrada = 8 * 60;
const intervaloSaida = 13 * 60;
const intervaloRetorno = 14 * 60;
const saida = 18 * 60;

var boolEntrada = false;
var boolIntervalo = false;
var boolIntervaloRetorno = false;
var boolSaida = false;

function verification() {
  // VerifyLocal();
  // VerifyHours();
  verifyEvent();
}

function verifyLocal() {
  // Verify approximate / precise location, distance radius
}

function verifyHours() {
  // Compare server hour with device hour before everything else
}

function findEvent() {
  // Break in events
}

function verifyEvent() {
  const timeMin = currentHour * 60 + currentMinute;

  if (timeMin < entrada) {
    console.log('Not allowed');
  } else {
    if (entrada <= timeMin && timeMin <= entrada + tolerancia) {
      boolEntrada = true;
	  console.log('OK - ENTRADA');
      sendDataToServer();
    } else {
      console.log('NO - ENTRADA');
      animation(true);
	  boolEntrada = true;
    }

    if (boolEntrada && boolIntervalo <= timeMin && timeMin <= intervaloSaida + tolerancia / 2) {
      boolIntervalo = true;
	  console.log('OK - INTERVALO');
    } else {
      console.log('NO - INTERVALO');
      animation(true);
	  boolIntervalo = true;
    }

    if (boolEntrada && boolIntervalo && intervaloRetorno <= timeMin && timeMin <= intervaloRetorno + tolerancia / 2) {
      boolIntervaloRetorno = true;
	  console.log('OK - RETORNO INTERVALO');
      sendDataToServer();
	} else {
      console.log('NO - RETORNO INTERVALO');
      animation(true);
	  boolIntervaloRetorno = true;
    }

    if (boolEntrada && boolIntervalo && saida <= timeMin && timeMin <= saida) {
      console.log('OK - SAIDA');
      boolSaida = true;
	  sendDataToServer();
    } else {
      console.log('NO - SAIDA');
      animation(true);
	  boolSaida = true;
    }
  }
}
