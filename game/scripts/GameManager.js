"use strict";
var game;
(function (game) {
    class GameManager {
        static printToConsole(_message) {
            let consoleDiv = document.getElementById("consoleInput");
            consoleDiv.innerText = consoleDiv.innerHTML + "<br/>" + _message;
        }
    }
    game.GameManager = GameManager;
})(game || (game = {}));
//# sourceMappingURL=GameManager.js.map