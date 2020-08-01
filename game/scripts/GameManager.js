"use strict";
var game;
(function (game) {
    class GameManager {
        static printToConsole(_message) {
            let consoleDiv = document.getElementById("consoleInput");
            consoleDiv.innerText = consoleDiv.innerHTML + "<br/>" + _message;
        }
        startGame(_state) {
            let intro = _state.description;
            GameManager.printToConsole(intro);
            GameManager.currentGameState = _state;
        }
        saveGame() {
            let gameStateJSON = JSON.stringify(GameManager.currentGameState);
            console.log(gameStateJSON); //TODO change
        }
        loadGame(_name) {
            //TODO
        }
        readInput() {
            let consoleInput = document.getElementById("consoleInput");
            let inputText = consoleInput.innerHTML;
            switch (inputText.substring(0, 1)) {
                case "h":
                    GameManager.printToConsole("help(h) : shows this message, look(l) : look around, take(t) item: pickup an item, drop(d) item, drop an item, speak(s) npc: speak to a npc, guess(g) npc: guess the npc who is guilty");
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
        moveAllHumans() {
            GameManager.currentGameState.bots.forEach(function (bot) {
                bot.moveRandomly();
            });
        }
        guessNPC(_name) {
            for (let i = 0; i < GameManager.currentGameState.bots.length; i++) {
                let bot = GameManager.currentGameState.bots[i];
                if (bot.name == _name) {
                    if (bot.isGuilty) {
                        GameManager.printToConsole("Congratulation! You found the guilty one!");
                        return;
                    }
                }
            }
            GameManager.printToConsole("Not the one we search!");
        }
        createDefaultGame(_name) {
            let defaultPlayerItem = new game.Item("defaultPlayerItem", "defaultDescription");
            let playerInventory = [];
            playerInventory.push(defaultPlayerItem);
            let defaultRoomItem = new game.Item("defaultIRoomItem", "defaultDescription");
            let roomInventory = [];
            roomInventory.push(defaultRoomItem);
            let defaultNpcItem = new game.Item("defaultINpctem", "defaultDescription");
            let npcInventory = [];
            npcInventory.push(defaultNpcItem);
            let defaultNpcAnswer = "defaultNpcAnswer";
            let npcAnswers = [];
            npcAnswers.push(defaultNpcAnswer);
            let bots = [];
            let defaultNpc = new game.Human("defaultHuman", "defaultDescription", npcInventory, npcAnswers, false);
            bots.push(defaultNpc);
            let defaultRoomPeople = [];
            defaultRoomPeople.push(defaultNpc);
            let adjacentRooms = new Map();
            let defaultRoom = new game.Room("defaultRoom", "defaultRoomDescription", roomInventory, defaultRoomPeople, adjacentRooms);
            let secondAdjacentRooms = new Map();
            secondAdjacentRooms.set(game.Direction.WEST, defaultRoom);
            let secondDefaultRoom = new game.Room("secondDefaultRoom", "defaultRoomDescription", roomInventory, defaultRoomPeople, secondAdjacentRooms);
            adjacentRooms.set(game.Direction.EAST, secondDefaultRoom);
            defaultRoom.adjacentRooms = adjacentRooms;
            let defaultPlayer = new game.Player("defaultPlayer", "defaultDescrition", defaultRoom, game.Language.ENGLISH, playerInventory);
            let roomsOfHouse = [defaultRoom, secondDefaultRoom];
            let defaultHouse = new game.House("defaultHouse", roomsOfHouse);
            let currentDate = new Date();
            let defaultGameState = new game.GameState("defaultGameState", "defaultDescription", currentDate, defaultPlayer, defaultHouse, bots);
            return defaultGameState;
        }
    }
    game.GameManager = GameManager;
})(game || (game = {}));
//# sourceMappingURL=GameManager.js.map