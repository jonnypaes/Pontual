var latitude;
var longitude;
var checkbox = document.getElementById('toggle');
var isChecked;
var descricao;

checkbox.checked = isChecked;

var now = new Date();
var currentHour = now.getHours();
var currentMinute = now.getMinutes();

var boolEntrada = false;
var boolIntervalo = false;
var boolIntervaloRetorno = false;
var boolSaida = false;

function getCheckState() {
    return checkbox.checked;
}
