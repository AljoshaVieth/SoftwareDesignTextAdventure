namespace game {
    export class GameManager {
        public static currentGameState: GameState;

        static printToConsole(_message: string) {
            let consoleDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("consoleInput");
            consoleDiv.innerText = consoleDiv.innerHTML + "<br/>" + _message;
        }

        startGame(_state: GameState): void {
            let intro: string = _state.description;
            GameManager.printToConsole(intro);
            GameManager.currentGameState = _state;
        }

        saveGame(): void {
            let gameStateJSON = JSON.stringify(GameManager.currentGameState);
            console.log(gameStateJSON); //TODO change
        }

        loadGame(_name: string): void {
            //TODO
        }

        readInput(): void {
            let consoleInput: HTMLInputElement = <HTMLInputElement>document.getElementById("consoleInput");
            let inputText: string = consoleInput.innerHTML;
            switch (inputText.substring(0, 1)) {
                case "h":
                    GameManager.printToConsole("help(h) : shows this message, look(l) : look around, take(t) item: pickup an item, drop(d) item, drop an item, speak(s) npc: speak to a npc, guess(g) npc: guess the npc who is guilty")
                    break;
                case "l":
                    GameManager.currentGameState.player.look();
                    break;
                case "i":
                    GameManager.currentGameState.player.showInventory();
                    break;
                case "t":
                    GameManager.currentGameState.player.takeItem(inputText.substring(1));
                    break;
                case "d":
                    GameManager.currentGameState.player.dropItem(inputText.substring(1));
                    break;
                case "q":
                    this.saveGame();
                    GameManager.printToConsole("Game saved! Goodbye");
                    break;
                case "s":
                    GameManager.currentGameState.player.talkToNPC(inputText.substring(1));
                    break;
                case "g":
                    this.guessNPC(inputText.substring(1));
                    break;
                default:
                    GameManager.printToConsole("Unknown command!");
            }
        }

        moveAllHumans(): void {
            GameManager.currentGameState.bots.forEach(function (bot){
               bot.moveRandomly();
            });
        }

        guessNPC(_name: string): void {

            for(let i: number = 0; i< GameManager.currentGameState.bots.length; i++){
                let bot: Human = GameManager.currentGameState.bots[i];
                if(bot.name == _name){
                    if(bot.isGuilty){
                        GameManager.printToConsole("Congratulation! You found the guilty one!")
                        return;
                    }
                }
            }
            GameManager.printToConsole("Not the one we search!");
        }

    }
}