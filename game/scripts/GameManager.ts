namespace game {
    export class GameManager {
        public static currentGameState: GameState;


        static printToConsole(_message: string) {
            console.log("Trying to print: '" + _message + "'");
            let consoleDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("console");
            console.log("current value: " + consoleDiv.innerHTML);
            consoleDiv.innerHTML = consoleDiv.innerHTML + "<br/>" + _message;
        }

        static startGame(_state: GameState): void {
            let intro: string = _state.description;
            GameManager.printToConsole(intro);
            GameManager.currentGameState = _state;
        }

        static saveGame(): void {
            let gameStateJSON = JSON.stringify(GameManager.currentGameState);
            console.log(gameStateJSON); //TODO change
        }

        static loadGame(_name: string): void {
            //TODO
        }

        static readInput(): void {
            let consoleInput: HTMLInputElement = <HTMLInputElement>document.getElementById("consoleInput");
            let inputText: string = consoleInput.value;
            consoleInput.value = "";
            console.log("Reading input: " + inputText);
            switch (inputText.substring(0, 1)) {
                case "h":
                    GameManager.printToConsole("help(h) : shows this message, look(l) : look around, take(t) item: pickup an item, drop(d) item, drop an item, speak(s) npc: speak to a npc, guess(g) npc: guess the npc who is guilty, examine(e) item: examine an item")
                    break;
                case "l":
                    GameManager.currentGameState.player.look();
                    break;
                case "i":
                    GameManager.currentGameState.player.showInventory();
                    break;
                case "t":
                    console.log("Trying to take item{" + inputText.substring(1).trim() + "}");
                    GameManager.currentGameState.player.takeItem(inputText.substring(1).trim());
                    break;
                case "d":
                    GameManager.currentGameState.player.dropItem(inputText.substring(1).trim());
                    break;
                case "q":
                    this.saveGame();
                    GameManager.printToConsole("Game saved! Goodbye");
                    break;
                case "s":
                    GameManager.currentGameState.player.talkToNPC(inputText.substring(1).trim());
                    break;
                case "g":
                    GameManager.guessNPC(inputText.substring(1).trim());
                    break;
                case "e":
                    GameManager.currentGameState.player.examineItem(inputText.substring(1).trim());
                    break;
                case "m":
                    GameManager.currentGameState.player.move(inputText.substring(1).trim());
                    break;
                default:
                    GameManager.printToConsole("Unknown command!");
            }
        }

        static moveAllHumans(): void {
            GameManager.currentGameState.bots.forEach(function (bot) {
                bot.moveRandomly();
            });
        }

        static guessNPC(_name: string): void {
            for (let i: number = 0; i < GameManager.currentGameState.bots.length; i++) {
                let bot: Human = GameManager.currentGameState.bots[i];
                if (bot.name == _name) {
                    if (bot.isGuilty) {
                        GameManager.printToConsole("Congratulation! You found the guilty one!")
                        return;
                    }
                }
            }
            GameManager.printToConsole("Not the one we search!");
        }

        static createDefaultGame(_name: string): GameState {
            let defaultPlayerItem: Item = new Item("defaultPlayerItem", "defaultDescription");
            let playerInventory: Item[] = [];
            playerInventory.push(defaultPlayerItem);
            let defaultRoomItem: Item = new Item("defaultRoomItem", "defaultDescription");
            let roomInventory: Item[] = [];
            roomInventory.push(defaultRoomItem);
            let defaultNpcItem: Item = new Item("defaultNpcItem", "defaultDescription");
            let npcInventory: Item[] = [];
            npcInventory.push(defaultNpcItem);
            let defaultNpcAnswer: string = "defaultNpcAnswer";
            let npcAnswers: string[] = [];
            npcAnswers.push(defaultNpcAnswer);
            let bots: Human[] = [];
            let defaultNpc: Human = new Human("defaultHuman", "defaultDescription", npcInventory, npcAnswers, false);
            bots.push(defaultNpc);
            let defaultRoomPeople: Human[] = [];
            defaultRoomPeople.push(defaultNpc);
            let adjacentRooms: Map<Direction, Room> = new Map<Direction, Room>();
            let defaultRoom: Room = new Room("defaultRoom", "defaultRoomDescription", roomInventory, defaultRoomPeople, adjacentRooms);
            let secondAdjacentRooms: Map<Direction, Room> = new Map<Direction, Room>();
            secondAdjacentRooms.set(Direction.WEST, defaultRoom);
            let secondDefaultRoom: Room = new Room("secondDefaultRoom", "secondDefaultRoomDescription", roomInventory, defaultRoomPeople, secondAdjacentRooms);
            defaultRoom.adjacentRooms.set(Direction.EAST, secondDefaultRoom);
            let defaultPlayer: Player = new Player("defaultPlayer", "defaultDescrition", defaultRoom, Language.ENGLISH, playerInventory);
            let roomsOfHouse: Room[] = [defaultRoom, secondDefaultRoom];
            let defaultHouse: House = new House("defaultHouse", roomsOfHouse);
            let currentDate: Date = new Date();
            defaultPlayer.name = "ANTONNNNN";
            let defaultGameState: GameState = new GameState("defaultGameState", "defaultDescription", currentDate, defaultPlayer, defaultHouse, bots);
            GameManager.currentGameState = defaultGameState;
            return defaultGameState;
        }

    }
}