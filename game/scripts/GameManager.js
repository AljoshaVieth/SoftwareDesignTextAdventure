"use strict";
var game;
(function (game) {
    class GameManager {
        static printToConsole(_message) {
            console.log("Trying to print: '" + _message + "'");
            let consoleDiv = document.getElementById("console");
            console.log("current value: " + consoleDiv.innerHTML);
            consoleDiv.innerHTML = consoleDiv.innerHTML + "<br/>" + _message;
        }
        static startGame(_state) {
            let intro = _state.description;
            GameManager.printToConsole(intro);
            GameManager.currentGameState = _state;
        }
        static saveGame() {
            // credit: https://github.com/JirkaDellOro/Softwaredesign/blob/master/S20/L07/Main.ts
            let gameStateJSON = JSON.stringify(GameManager.currentGameState);
            console.log(gameStateJSON);
            let blob = new Blob([gameStateJSON], { type: "text/plain" });
            let url = window.URL.createObjectURL(blob);
            //*/ using anchor element for download
            let downloader;
            downloader = document.createElement("a");
            downloader.setAttribute("href", url);
            downloader.setAttribute("download", "text-adventure-save.json");
            document.body.appendChild(downloader);
            downloader.click();
            document.body.removeChild(downloader);
            window.URL.revokeObjectURL(url);
        }
        static loadGame(_name) {
            //TODO problems while parsing Room object from json
            let json = JSON.parse('{"name":"defaultGameState","description":"defaultDescription","saveDate":"2020-08-01T22:45:29.486Z","player":{"name":"defaultPlayer","description":"defaultDescrition","position":{"name":"defaultRoom","inventory":[],"people":[{"name":"defaultHuman","description":"defaultDescription","inventory":[{"name":"defaultNpcItem","description":"defaultDescription"}],"answers":["defaultNpcAnswer"],"isGuilty":false}],"adjacentRooms":{},"description":"defaultRoomDescription","lookDescription":"defaultRoomDescription :  Items[  ] _ Humans[ defaultHuman ]"},"language":0,"inventory":[{"name":"defaultPlayerItem","description":"defaultDescription"},{"name":"defaultRoomItem","description":"defaultDescription"}]},"house":{"name":"defaultHouse","rooms":[{"name":"defaultRoom","inventory":[],"people":[{"name":"defaultHuman","description":"defaultDescription","inventory":[{"name":"defaultNpcItem","description":"defaultDescription"}],"answers":["defaultNpcAnswer"],"isGuilty":false}],"adjacentRooms":{},"description":"defaultRoomDescription","lookDescription":"defaultRoomDescription :  Items[  ] _ Humans[ defaultHuman ]"},{"name":"secondDefaultRoom","inventory":[{"name":"defaultRoomItem","description":"defaultDescription"}],"people":[{"name":"defaultHuman","description":"defaultDescription","inventory":[{"name":"defaultNpcItem","description":"defaultDescription"}],"answers":["defaultNpcAnswer"],"isGuilty":false}],"adjacentRooms":{},"description":"secondDefaultRoomDescription","lookDescription":"secondDefaultRoomDescription :  Items[ defaultRoomItem |  ] _ Humans[ defaultHuman ]"}]},"bots":[{"name":"defaultHuman","description":"defaultDescription","inventory":[{"name":"defaultNpcItem","description":"defaultDescription"}],"answers":["defaultNpcAnswer"],"isGuilty":false}]}');
            this.currentGameState = game.GameState.createGameStateFromJSON(json);
            return this.currentGameState;
        }
        static readInput() {
            let consoleInput = document.getElementById("consoleInput");
            let inputText = consoleInput.value;
            consoleInput.value = "";
            console.log("Reading input: " + inputText);
            switch (inputText.substring(0, 1)) {
                case "h":
                    GameManager.printToConsole("npc: speak to a npc, guess(g) npc: guess the npc who is guilty, examine(e) item: examine an item");
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
                    this.moveAllHumans();
                    break;
                default:
                    GameManager.printToConsole("Unknown command!");
            }
        }
        static moveAllHumans() {
            GameManager.currentGameState.bots.forEach(function (bot) {
                bot.position;
                //bot.moveRandomly();
            });
        }
        static guessNPC(_name) {
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
        static createDefaultGame(_name) {
            let invitation = new game.Item("Invitation", "Herewith we cordially invite you to our congress in the old manor house. Please be punctual and bring fun");
            let playerInventory = [];
            playerInventory.push(invitation);
            let knife = new game.Item("Knife", "A bloody knife");
            let salonInventory = [];
            salonInventory.push(knife);
            let bots = [];
            let salonRoomPeople = [];
            // People
            let walterInventory = [];
            let walterAnswers = ["I'm Walter, I'm sorry I didn't see anything", "Hey"];
            let walter = new game.Human("Walter", "Congress Speaker", walterInventory, walterAnswers, false);
            bots.push(walter);
            salonRoomPeople.push(walter);
            let susanInventory = [];
            let susanAnswers = ["I'm Susan, Follow me on Instagram", "Hey, I know you!", "I don´t like Max, I think he is guilty! But it´s just a feeling."];
            let susan = new game.Human("Susan", "Influencer", susanInventory, susanAnswers, false);
            bots.push(susan);
            salonRoomPeople.push(susan);
            let salonAdjacentRooms = new Map();
            let salon = new game.Room("Salon", "The main Salon", salonInventory, salonRoomPeople, salonAdjacentRooms);
            let bathroomInventory = [];
            let bathroomPeople = [];
            let hammer = new game.Item("Hammer", "A carpenter's hammer, the carpenter can't be far");
            bathroomInventory.push(hammer);
            let bathroomAdjacentRooms = new Map();
            bathroomAdjacentRooms.set(game.Direction.NORTH, salon);
            let bathroom = new game.Room("Bathroom", "The bathroom", bathroomInventory, bathroomPeople, bathroomAdjacentRooms);
            salonAdjacentRooms.set(game.Direction.SOUTH, bathroom);
            let hallInventory = [];
            let hallPeople = [];
            let maxInventory = [];
            let maxAnswers = ["I'm Max, the carpenter", "Im afraid I don´t know much about the murder", "In the last estate there were many cats and that made life difficult for me with my allergy, but fortunately there are no cats here"];
            let max = new game.Human("Max", "Carpenter", maxInventory, maxAnswers, false);
            bots.push(max);
            hallPeople.push(max);
            let hallAdjacentRooms = new Map();
            hallAdjacentRooms.set(game.Direction.EAST, salon);
            let hall = new game.Room("Hall", "The hall", hallInventory, hallPeople, hallAdjacentRooms);
            salon.adjacentRooms.set(game.Direction.WEST, hall);
            salon.adjacentRooms.set(game.Direction.SOUTH, bathroom);
            let kitchenAdjacentRooms = new Map();
            kitchenAdjacentRooms.set(game.Direction.EAST, hall);
            let kitchenInventory = [];
            let kitchenPeople = [];
            let antonInventory = [];
            let antonAnswers = ["Hi, I´m Anton", "I´m the son of the murdered", "Life sucks", "No, I´ve seen nothing!!!"];
            let anton = new game.Human("Anton", "The son of the murdered", antonInventory, antonAnswers, false);
            bots.push(anton);
            kitchenPeople.push(anton);
            let kitchen = new game.Room("Kitchen", "The kitchen", kitchenInventory, kitchenPeople, kitchenAdjacentRooms);
            hall.adjacentRooms.set(game.Direction.WEST, kitchen);
            let herbertInventory = [];
            let herbertAnswers = ["I'm innocent!", "I just let the cat out!"];
            let herbert = new game.Human("Herbert", "Janitor", herbertInventory, herbertAnswers, true);
            bots.push(herbert);
            let officePeople = [];
            let officeAdjacentRooms = new Map();
            officeAdjacentRooms.set(game.Direction.EAST, kitchen);
            officePeople.push(herbert);
            let officeInventory = [];
            let office = new game.Room("Office", "The office", officeInventory, officePeople, officeAdjacentRooms);
            kitchen.adjacentRooms.set(game.Direction.WEST, office);
            let defaultPlayer = new game.Player("Tom", "Detective", salon, game.Language.ENGLISH, playerInventory);
            let roomsOfHouse = [salon, hall, kitchen, bathroom, office];
            let defaultHouse = new game.House("ManorHouse", roomsOfHouse);
            let currentDate = new Date();
            let defaultGameState = new game.GameState("Manor house", "Screams! Something's wrong. You run into the parlor. The host is lying dead on the floor. No one seems to have seen or heard anything.", currentDate, defaultPlayer, defaultHouse, bots);
            GameManager.currentGameState = defaultGameState;
            return defaultGameState;
        }
    }
    game.GameManager = GameManager;
})(game || (game = {}));
//# sourceMappingURL=GameManager.js.map