export default function changeCar(currentCar, startGame, onShowChangeCar) {
    currentCar.addEventListener('click', () => {
        let skinCar = onShowChangeCar() + 1;
        console.log(skinCar);
        startGame(skinCar);
        changeCarWindow.classList.add('hide');
        console.log(skinCar);
        console.log(onShowChangeCar())
    })
}