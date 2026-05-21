enum GameState {
    Passive,
    Started,
    Running
}

let state = GameState.Passive;

input.onButtonPressed(Button.AB, function () {
    if (state == GameState.Passive) {
        startRound();
    }
});

function drawHourglass() {
    basic.clearScreen();
    led.plot(1, 0);
    led.plot(2, 0);
    led.plot(3, 0);
    led.plot(2, 2);
    led.plot(1, 4);
    led.plot(2, 4);
    led.plot(3, 4);
    led.plot(1, 1);
    led.plot(1, 3);
    led.plot(3, 1);
    led.plot(3, 3);
};

function startRound() {
    drawHourglass();

    control.runInBackground(() => music.playTone(300, 200));

    let waitTime = randint(3, 6);
    basic.pause(waitTime * 1000);

    let pressedA = input.buttonIsPressed(Button.A);
    let pressedB = input.buttonIsPressed(Button.B);

    if (pressedA && pressedB) {
        basic.showIcon(IconNames.Sad);
        control.runInBackground(() => music.playTone(100, 200));
        state = GameState.Passive;
    }
    else if (pressedA) {
        basic.showString("B");
        control.runInBackground(() => music.playTone(200, 200));
        state = GameState.Passive;
    }
    else if (pressedB) {
        basic.showString("A");
        control.runInBackground(() => music.playTone(200, 200));
        state = GameState.Passive;
    }
    else {
        state = GameState.Running;
        runGame();
    }
}   

function runGame() {
    basic.showicon(IconNames.Pitchfork);

    control.runInBackground(() => music.playTone(800, 200));

    while (state == GameState.Running) {

        let pressedA = input.buttonIsPressed(Button.A);
        let pressedB = input.buttonIsPressed(Button.B);

        if (pressedA && pressedB) {
            basic.showIcon(IconNames.Square);
            state = GameState.Passive;
        } else if (pressedA) {
            control.runInBackground(() => music.playTone(600, 200));
            basic.showString("A");
            state = GameState.Passive;
        } else if (pressedB) {
            control.runInBackground(() => music.playTone(600, 200));
            basic.showString("B");
            state = GameState.Passive;
        }

        basic.pause(50);
    }
}