var latitude;
var longitude;
var checkbox = document.getElementById('toggle');
var isChecked;
var descricao;
const DEFAULT_STATE = true;
var checkState = DEFAULT_STATE;

var currentHour = now.getHours();
var currentMinute = now.getMinutes();

var boolEntrada = false;
var boolIntervalo = false;
var boolIntervaloRetorno = false;
var boolSaida = false;