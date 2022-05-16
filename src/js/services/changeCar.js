export default function changeCar(currentCar, startGame, onShowChangeCar) {
    currentCar.addEventListener('click', () => {
        let skinCar = onShowChangeCar() + 1;
        startGame(skinCar);
        console.log(skinCar);
        console.log(onShowChangeCar())
    })
}