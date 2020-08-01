
namespace game {
    let consoleInput: HTMLInputElement = <HTMLInputElement> document.getElementById("consoleInput");
    consoleInput.addEventListener('blur', () => consoleInput.focus());
    consoleInput.addEventListener('keydown', function (event) {
        if (event.which == 13 || event.keyCode == 13) {
            GameManager.readInput();
        }
    });
    console.log("Creating default gameState")
    let state: GameState = GameManager.createDefaultGame("test");
    console.log("finished");
    console.log("printing gamestate...");

    GameManager.saveGame();

    console.log("Starting game...")
    GameManager.startGame(state);
}



