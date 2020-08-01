"use strict";
var game;
(function (game) {
    let consoleInput = document.getElementById("consoleInput");
    consoleInput.addEventListener('blur', () => consoleInput.focus());
    consoleInput.addEventListener('keydown', function (event) {
        if (event.which == 13 || event.keyCode == 13) {
            game.GameManager.readInput();
        }
    });
    console.log("Creating default gameState");
    let state = game.GameManager.createDefaultGame("test");
    console.log("finished");
    console.log("printing gamestate...");
    game.GameManager.saveGame();
    console.log("Starting game...");
    game.GameManager.startGame(state);
})(game || (game = {}));
//# sourceMappingURL=game.js.map