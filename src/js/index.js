import muteAudio from './services/mute.js';
import changeCar from './services/changeCar.js';
import onShowChangeCar  from './services/slider.js';

window.addEventListener('load', () => {
    document.querySelector('.preloader').classList.add('hide');
});


window.addEventListener('DOMContentLoaded', (e) => {
    const MAX_ENEMY = 3;

    const score = document.querySelector('.score'),
        start = document.querySelector('.start'),
        gameArea = document.querySelector('.gameArea'),
        gameWindow = document.querySelector('.game'),
        bestScore = document.querySelector('.bestScore'),
        mainMenu = document.querySelector('.main-menu'),
        game_header = document.querySelector('.game_header'),
        level = document.querySelector('.level'),
        audio = document.querySelector('.audio'),
        brake = document.querySelector('.brake'),
        mute = document.querySelector('.mute'),
        muteIcon = document.querySelector('.mute_icon'),
        changeCarWindow = document.querySelector('.change_car'),
        currentCar = document.querySelector('.current_car');

    const hard = document.querySelector('.hard'),
        middle = document.querySelector('.middle'),
        easy = document.querySelector('.easy');

    let car;
    // let sliderIndex = 0;

    hard.addEventListener('click', hardGame);
    middle.addEventListener('click', middleGame);
    easy.addEventListener('click', easyGame);

    mute.addEventListener('click', (e) => muteAudio(e, muteIcon, audio));

    start.addEventListener('click', onLevel);
    document.addEventListener('keydown', startRun);
    document.addEventListener('keyup', stopRun);
    document.addEventListener('keydown', rotateLeftDown);
    document.addEventListener('keyup', rotateLeftUp);

    function rotateLeftDown() {
        car.style.transform = 'rotate(0deg)';
    }
    function rotateLeftUp() {
        car.style.transform = 'rotate(0deg)';
    }

    const keys = {
        ArrowUp: false,
        ArrowDown: false,
        ArrowRight: false,
        ArrowLeft: false,
        w: false,
        s: false,
        d: false,
        a: false,
        '??': false,
        '??': false,
        '??': false,
        '??': false
    };
    
    
    const settings = {
        start: false,
        score: 0,
        speed: 4,
        traffic: 4
    };


    function startGame(skinCar = 1) {
        bestScore.classList.add('hide');
        gameArea.innerHTML = '';
        audio.play();
        changeCarWindow.classList.add('hide');
        
        for (let i = 0; i < 4; i++) {
            const line1 = document.createElement('div');

            line1.classList.add('road');
            line1.classList.add(`index${i}`);

            line1.style.top = 0 + 'px';

            line1.y = 100;
            gameArea.appendChild(line1);
        }
        for (let i = 0; i < getQuantityElements(100); i++) {
            const line = document.createElement('div');
            line.classList.add('line_in_road');
            line.style.top = (i * 550) + 'px';
            line.y = i * 100;
            gameArea.appendChild(line);
        }
        
    
        for (let i = 0; i < getQuantityElements(100 * settings.traffic); i++) {
            const enemy = document.createElement('div');
            enemy.classList.add('enemy');
            enemy.y = -100 * settings.traffic * (i + 1);
            enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
            enemy.style.top = enemy.y + 'px';
            enemy.style.background = `
                url(src/image/enemy${getRandomEnemy(MAX_ENEMY)}.png)
                center / contain 
                no-repeat`;
            gameArea.appendChild(enemy);
        }
        settings.score = 0;
        settings.start = true;

        car = document.createElement('div');
        const skin = document.createElement('img');

        switch (skinCar) {
            case 1:
                skin.src = './src/image/player1.png';
                break;
            case 2:
                skin.src = './src/image/player2.png';
                break;
            case 3:
                skin.src = './src/image/player3.png';
                break;
            default:
                break;
        }

        skin.classList.add('skin');
        car.appendChild(skin);
        car.classList.add('car');
        gameArea.appendChild(car);

        const widthCar = getComputedStyle(car).width.slice(0, -2);
        const widthGameArea = getComputedStyle(gameArea).width.slice(0, -2);

        car.style.left =  (widthGameArea / 2 - widthCar / 2 ) + 'px';
        car.style.top = 'auto';
        car.style.bottom = '10px';
        settings.x = car.offsetLeft;
        settings.y = car.offsetTop;

        requestAnimationFrame(playGame);
    };
    function playGame() {
        
        
        if (settings.start) {
            settings.score += settings.speed;
            score.textContent = `????????: ${settings.score}`;
            moveRoad();
            moveLineInRoad();

            // moveEnemy();

            if ( (keys.ArrowLeft || keys.a || keys['??']) && settings.x > 0) {
                settings.x -= settings.speed;
                car.style.transform = 'rotate(-5deg)';
                brake.play();
            } else if ( (keys.ArrowRight || keys.d || keys['??']) && settings.x < (gameArea.offsetWidth - car.offsetWidth)) {
                settings.x += settings.speed;
                car.style.transform = 'rotate(5deg)';
                brake.play();
            } else if ( (keys.ArrowUp || keys.w || keys['??']) && settings.y > 0) {
                settings.y -= settings.speed;
            } else if ( (keys.ArrowDown || keys.s || keys['??']) && settings.y < (gameArea.offsetHeight - car.offsetHeight)) {
                settings.y += settings.speed;
            }
    
            car.style.top = settings.y + 'px';
            car.style.left = settings.x + 'px';
    
            requestAnimationFrame(playGame);
        }
    };
    // ???????????????? ????????????
    function moveRoad() {
        let lines = document.querySelectorAll('.road');
        // lines.forEach(function (line){
        moveRoadOnIndex(lines[0], -390);
        moveRoadOnIndex(lines[1], 0);
        moveRoadOnIndex(lines[2], 390);
        moveRoadOnIndex(lines[3], -(390 * 2));
            
            // if (line.y > 0 ) {
            //     const line = document.createElement('div');
            //     line.classList.add('road');
            //     line.style.top = 0 + 'px';
            //     line.y = 100;
            //     gameArea.appendChild(line);
            // }
        // })
    };
    function moveRoadOnIndex(line, heightRoad) {
        line.y += settings.speed;
        line.style.top = line.y + heightRoad + 'px';

        let lines = document.querySelectorAll('.road');
        lines.forEach((line, index) => {

            if (lines[index].y > document.documentElement.clientHeight) {
                if(index == 3) {
                    let theFirstChild = gameArea.firstChild;

                    gameArea.insertBefore(lines[index], theFirstChild);
                }
                lines[index].y = 0;
            }
        })   
    }

    // ???????????????? ????????????????
    function moveLineInRoad() {
        let lines = document.querySelectorAll('.line_in_road');
        lines.forEach(function (line){
            line.y += settings.speed;
            line.style.top = line.y + 'px';
    
            if ( line.y > document.documentElement.clientHeight) {
                line.y = -100;
            }
        })
    };
    function moveEnemy() {
        let enemy = document.querySelectorAll('.enemy');
        enemy.forEach(function(item){
            let carRect = car.getBoundingClientRect();
            let enemyRect = item.getBoundingClientRect();
    
            if ((carRect.top + 5) <= enemyRect.bottom && 
                (carRect.right - 5) >= enemyRect.left && 
                (carRect.left + 5) <= enemyRect.right && 
                (carRect.bottom - 5) >= enemyRect.top) {
    
                settings.start = false;
                bestScore.classList.remove('hide');
    
                let scoreFinal = score.textContent;
                bestScore.textContent = `???????????? ${scoreFinal}`;
                
                localStorage.best = settings.score;
            }
    
            item.y += settings.speed / 2;
            item.style.top = item.y + 'px';
    
            if ( item.y > document.documentElement.clientHeight) {
                item.y = -100 * settings.traffic;
                item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
            }
        });
    };
    // ?????????????? ??????????????
    function hardGame() {
        HideMineMenu();
        onShowChangeCar(changeCarWindow);

        settings.speed = 6;
        settings.traffic = 2;

        changeCar(currentCar, startGame, () =>onShowChangeCar(changeCarWindow), changeCarWindow);
    }
    // ?????????????? ??????????????
    function middleGame() {
        HideMineMenu();
        onShowChangeCar(changeCarWindow);

        settings.speed = 5;
        settings.traffic = 3;

        changeCar(currentCar, startGame, () =>onShowChangeCar(changeCarWindow), changeCarWindow);
    }
    // ?????????????? ??????????????
    function easyGame() {
        HideMineMenu();
        onShowChangeCar(changeCarWindow);

        settings.speed = 4;
        settings.traffic = 4;

        changeCar(currentCar, startGame, () =>onShowChangeCar(changeCarWindow), changeCarWindow);
    }
    // ?????????????? ????????
    function HideMineMenu() {
        mainMenu.classList.add('hide');
        gameWindow.classList.remove('hide');
        game_header.classList.remove('hide');
    }

    function getQuantityElements(heightElement) {
        return document.documentElement.clientHeight / heightElement +1;
    }

    function getRandomEnemy(max) {
        return Math.floor((Math.random() * max) + 1);
    }

    function startRun(event){
        if (keys.hasOwnProperty(event.key)) {
            event.preventDefault();
            keys[event.key] = true;
        }
    };
    function stopRun(event){
        if (keys.hasOwnProperty(event.key)) {
            event.preventDefault();
            keys[event.key] = false;
        } 
    };
    // ?????????? ???????????? ?? ?????????????? ?????????????????????????????? ?????????? ?????????????? ???????????? ??????????
    function onLevel() {
        start.classList.add('hide');
        level.classList.remove('hide');
    }
    
});