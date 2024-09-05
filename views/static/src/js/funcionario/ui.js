const box = document.getElementById('box');
const buttonBox = document.querySelector('.button-container');
const Container = document.querySelector('.container');
const acceptButton = document.getElementById('acceptButton');
const denyButton = document.getElementById('denyButton');
let animationInterval;

acceptButton.addEventListener('click', () => {
	event.preventDefault();
	animation(false);
	setTimeout(() => {
		afterAnimation();
	}, 200);	
	sendDataToServer();
});

denyButton.addEventListener('click', () => {
	event.preventDefault(); 
	animation(false);
	setTimeout(() => {
		afterAnimation();
	}, 200);
});

function animation(accept) {
  beforeAnimation();
  
  clearInterval(animationInterval);

  const targetState = accept ? 1 : 0;
  const displayState = targetState === 1 ? 'visible' : 'hidden';

  animationInterval = setInterval(() => {
    const width = targetState === 1 ? '320px' : '0';
    const height = targetState === 1 ? '140px' : '0';
    const opacity = targetState;

    Container.style.width = width;
    Container.style.height = height;
    buttonBox.style.display = displayState;

    if (parseFloat(Container.style.visible) === targetState) {
      clearInterval(animationInterval);
    }
  }, 200);
}

function beforeAnimation() {
	Container.style.opacity = 1;
	Container.style.opacity = 1;
	setTimeout(() => {
		Container.style.display = 'inline';
		buttonBox.style.display = 'flex';
	}, 200); 
}      

function afterAnimation() {
	Container.style.opacity = 0;
	buttonBox.style.opacity = 0;
	setTimeout(() => {
		Container.style.display = 'none';
		buttonBox.style.display = 'none';
	}, 200);  
}