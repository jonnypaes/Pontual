// Base
// const currentHour = now.getHours();
const currentHour = 8; // 8:00 (24h)
const currentMinute = 9;

// DB
const homeOffice = true;
const entradaFlexivel = false;
const almocoFlexivel = false;
const horaExtra = false;
const escalaEspecial = false;
const localExato = true;

// OnChange + OnListen
const tolerancia = 10;
const entrada = 8 * 60;
const intervaloSaida = 13 * 60;
const intervaloRetorno = 14 * 60;
const saida = 18 * 60;

let boolEntrada = false;
let boolIntervalo = false;
let boolIntervaloRetorno = false;
let boolSaida = false;

const now = new Date();

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
      console.log('OK - ENTRADA');
      boolEntrada = true;
      sendDataToServer();
    } else {
      console.log('NO - ENTRADA');
      animation(true);
    }

    if (boolEntrada && intervaloSaida <= timeMin && timeMin <= intervaloSaida + tolerancia / 2) {
      console.log('OK - INTERVALO');
      boolIntervalo = true;
    }

    if (boolEntrada && boolIntervalo && intervaloRetorno <= timeMin && timeMin <= intervaloRetorno + tolerancia / 2) {
      console.log('OK - RETORNO INTERVALO');
      boolIntervaloRetorno = true;
    }

    if (boolEntrada && boolIntervalo && saida <= timeMin && timeMin <= saida) {
      console.log('OK - SAIDA');
      boolSaida = true;
    }
  }
}
