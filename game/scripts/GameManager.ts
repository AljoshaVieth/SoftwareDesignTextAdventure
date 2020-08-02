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
            // credit: https://github.com/JirkaDellOro/Softwaredesign/blob/master/S20/L07/Main.ts
            let gameStateJSON = JSON.stringify(GameManager.currentGameState);
            console.log(gameStateJSON);
            let blob: Blob = new Blob([gameStateJSON], {type: "text/plain"});
            let url: string = window.URL.createObjectURL(blob);
            //*/ using anchor element for download
            let downloader: HTMLAnchorElement;
            downloader = document.createElement("a");
            downloader.setAttribute("href", url);
            downloader.setAttribute("download", "text-adventure-save.json");
            document.body.appendChild(downloader);
            downloader.click();
            document.body.removeChild(downloader);
            window.URL.revokeObjectURL(url);
        }

        static loadGame(_name: string): GameState {
            //TODO problems while parsing Room object from json
            let json: any = JSON.parse('{"name":"defaultGameState","description":"defaultDescription","saveDate":"2020-08-01T22:45:29.486Z","player":{"name":"defaultPlayer","description":"defaultDescrition","position":{"name":"defaultRoom","inventory":[],"people":[{"name":"defaultHuman","description":"defaultDescription","inventory":[{"name":"defaultNpcItem","description":"defaultDescription"}],"answers":["defaultNpcAnswer"],"isGuilty":false}],"adjacentRooms":{},"description":"defaultRoomDescription","lookDescription":"defaultRoomDescription :  Items[  ] _ Humans[ defaultHuman ]"},"language":0,"inventory":[{"name":"defaultPlayerItem","description":"defaultDescription"},{"name":"defaultRoomItem","description":"defaultDescription"}]},"house":{"name":"defaultHouse","rooms":[{"name":"defaultRoom","inventory":[],"people":[{"name":"defaultHuman","description":"defaultDescription","inventory":[{"name":"defaultNpcItem","description":"defaultDescription"}],"answers":["defaultNpcAnswer"],"isGuilty":false}],"adjacentRooms":{},"description":"defaultRoomDescription","lookDescription":"defaultRoomDescription :  Items[  ] _ Humans[ defaultHuman ]"},{"name":"secondDefaultRoom","inventory":[{"name":"defaultRoomItem","description":"defaultDescription"}],"people":[{"name":"defaultHuman","description":"defaultDescription","inventory":[{"name":"defaultNpcItem","description":"defaultDescription"}],"answers":["defaultNpcAnswer"],"isGuilty":false}],"adjacentRooms":{},"description":"secondDefaultRoomDescription","lookDescription":"secondDefaultRoomDescription :  Items[ defaultRoomItem |  ] _ Humans[ defaultHuman ]"}]},"bots":[{"name":"defaultHuman","description":"defaultDescription","inventory":[{"name":"defaultNpcItem","description":"defaultDescription"}],"answers":["defaultNpcAnswer"],"isGuilty":false}]}');
            this.currentGameState = GameState.createGameStateFromJSON(json);
            return this.currentGameState;
        }

        static readInput(): void {
            let consoleInput: HTMLInputElement = <HTMLInputElement>document.getElementById("consoleInput");
            let inputText: string = consoleInput.value;
            consoleInput.value = "";
            console.log("Reading input: " + inputText);
            switch (inputText.substring(0, 1)) {
                case "h":
                    GameManager.printToConsole("npc: speak to a npc, guess(g) npc: guess the npc who is guilty, examine(e) item: examine an item")
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

        static moveAllHumans(): void {

            GameManager.currentGameState.bots.forEach(function (bot) {
                bot.position;
                //bot.moveRandomly();
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
            let invitation: Item = new Item("Invitation", "Herewith we cordially invite you to our congress in the old manor house. Please be punctual and bring fun");
            let playerInventory: Item[] = [];
            playerInventory.push(invitation);

            let knife: Item = new Item("Knife", "A bloody knife");
            let salonInventory: Item[] = [];
            salonInventory.push(knife);

            let bots: Human[] = [];

            let salonRoomPeople: Human[] = [];

            // People
            let walterInventory: Item[] = [];
            let walterAnswers: string[] = ["I'm Walter, I'm sorry I didn't see anything", "Hey"];
            let walter: Human = new Human("Walter", "Congress Speaker", walterInventory, walterAnswers, false);
            bots.push(walter);
            salonRoomPeople.push(walter);

            let susanInventory: Item[] = [];
            let susanAnswers: string[] = ["I'm Susan, Follow me on Instagram", "Hey, I know you!", "I don´t like Max, I think he is guilty! But it´s just a feeling."];
            let susan: Human = new Human("Susan", "Influencer", susanInventory, susanAnswers, false);
            bots.push(susan);
            salonRoomPeople.push(susan);

            let salonAdjacentRooms: Map<Direction, Room> = new Map<Direction, Room>();
            let salon: Room = new Room("Salon", "The main Salon", salonInventory, salonRoomPeople, salonAdjacentRooms);



            let bathroomInventory: Item[] = [];
            let bathroomPeople: Human[] = [];
            let hammer: Item = new Item("Hammer", "A carpenter's hammer, the carpenter can't be far");
            bathroomInventory.push(hammer);

            let bathroomAdjacentRooms: Map<Direction, Room> = new Map<Direction, Room>();
            bathroomAdjacentRooms.set(Direction.NORTH, salon);
            let bathroom: Room = new Room("Bathroom", "The bathroom", bathroomInventory, bathroomPeople, bathroomAdjacentRooms);
            salonAdjacentRooms.set(Direction.SOUTH, bathroom);


            let hallInventory: Item[] = [];
            let hallPeople: Human[] = [];

            let maxInventory: Item[] = [];
            let maxAnswers: string[] = ["I'm Max, the carpenter", "Im afraid I don´t know much about the murder", "In the last estate there were many cats and that made life difficult for me with my allergy, but fortunately there are no cats here"];
            let max: Human = new Human("Max", "Carpenter", maxInventory, maxAnswers, false);
            bots.push(max);
            hallPeople.push(max);

            let hallAdjacentRooms: Map<Direction, Room> = new Map<Direction, Room>();
            hallAdjacentRooms.set(Direction.EAST, salon);

            let hall: Room = new Room("Hall", "The hall", hallInventory, hallPeople, hallAdjacentRooms);
            salon.adjacentRooms.set(Direction.WEST, hall);
            salon.adjacentRooms.set(Direction.SOUTH, bathroom);



            let kitchenAdjacentRooms: Map<Direction, Room> = new Map<Direction, Room>();
            kitchenAdjacentRooms.set(Direction.EAST, hall);
            let kitchenInventory: Item[] = [];

            let kitchenPeople: Human[] = [];
            let antonInventory: Item[] = [];
            let antonAnswers: string[] = ["Hi, I´m Anton", "I´m the son of the murdered", "Life sucks", "No, I´ve seen nothing!!!"];
            let anton: Human = new Human("Anton", "The son of the murdered", antonInventory, antonAnswers, false);
            bots.push(anton);
            kitchenPeople.push(anton);
            let kitchen: Room = new Room("Kitchen", "The kitchen", kitchenInventory, kitchenPeople, kitchenAdjacentRooms);
            hall.adjacentRooms.set(Direction.WEST, kitchen);


            let herbertInventory: Item[] = [];
            let herbertAnswers: string[] = ["I'm innocent!", "I just let the cat out!"];
            let herbert: Human = new Human("Herbert", "Janitor", herbertInventory, herbertAnswers, true);
            bots.push(herbert);

            let officePeople: Human[] = [];
            let officeAdjacentRooms: Map<Direction, Room> = new Map<Direction, Room>();
            officeAdjacentRooms.set(Direction.EAST, kitchen);
            officePeople.push(herbert);
            let officeInventory: Item[] = [];
            let office: Room = new Room("Office", "The office", officeInventory, officePeople, officeAdjacentRooms)
            kitchen.adjacentRooms.set(Direction.WEST, office);


            let defaultPlayer: Player = new Player("Tom", "Detective", salon, Language.ENGLISH, playerInventory);
            let roomsOfHouse: Room[] = [salon, hall, kitchen, bathroom, office];
            let defaultHouse: House = new House("ManorHouse", roomsOfHouse);


            let currentDate: Date = new Date();
            let defaultGameState: GameState = new GameState("Manor house",
                "Screams! Something's wrong. You run into the parlor. The host is lying dead on the floor. No one seems to have seen or heard anything.",
                currentDate, defaultPlayer, defaultHouse, bots);
            GameManager.currentGameState = defaultGameState;
            return defaultGameState;
        }

    }
}