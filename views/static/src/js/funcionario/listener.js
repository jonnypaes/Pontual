// Base
const notificationTimes = [
	{ event: 1, hour: 7, minute: 55, content: "Olá! Não esqueça de fazer o apontamento da entrada" },
	{ event: 2, hour: 11, minute: 55, content: "Olá! Não esqueça de fazer o apontamento da saída ao almoço" },
	{ event: 3, hour: 13, minute: 0, content: "Olá! Não esqueça de fazer o apontamento do retorno do almoço" },
	{ event: 4, hour: 17, minute: 55, content: "Olá! Não esqueça de fazer o apontamento da saída" }
];

const warningTimes = [
	{ event: 1, hour: 8, minute: 5, content: "ATENÇÃO! Não esqueça de fazer o apontamento de entrada" },
	{ event: 2, hour: 12, minute: 2, content: "ATENÇÃO! Não esqueça de fazer o apontamento da saída ao almoço" },
	{ event: 3, hour: 13, minute: 2, content: "ATENÇÃO! Não esqueça de fazer o apontamento do retorno do almoço" },
	{ event: 4, hour: 18, minute: 2, content: "ATENÇÃO! Não esqueça de fazer o apontamento da saída" },
];
	
/*
const notificationTimes = [
	{ event: 1, hour: 7, minute: 55, content: language.msgBeforeStart },
	{ event: 2, hour: 12, minute: 0, content: language.msgBeforePause },
	{ event: 3, hour: 13, minute: 0, content: language.msgBeforeReturn },
	{ event: 4, hour: 17, minute: 55, content: language.msgBeforeEnd },
];

const warningTimes = [
	{ event: 1, hour: 8, minute: 5, content: language.msgAfterStart },
	{ event: 2, hour: 12, minute: 2, content: language.msgAfterPause },
	{ event: 3, hour: 13, minute: 2, content: language.msgAfterReturn },
	{ event: 4, hour: 18, minute: 2, content: language.msgAfterEnd },
];
*/
var now = new Date();
var currentHour = now.getHours();
var currentMinute = now.getMinutes();
var messageDisplayed = {};

function listenerEvent() {
    now = new Date();
    let currentHour = now.getHours();
    let currentMinute = now.getMinutes();

    for (const entry of notificationTimes) {
        let { hour, minute, content } = entry;
        let key = `${hour}:${minute}`;

        if (currentHour === hour && currentMinute === minute && !messageDisplayed[key]) {
            showNotification(content);
            messageDisplayed[key] = true;
        }
        
        let timeRemaining = 60 - now.getSeconds();

        if (timeRemaining <= 5) {
            messageDisplayed[key] = false;
        }
    }
}

function runListener() {
    setInterval(listenerEvent, 60 * 1000);
    listenerEvent();
}