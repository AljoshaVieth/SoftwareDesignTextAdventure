namespace game {

    export class Player extends Creature {
        public language: Language;
        public inventory: Item[];


        constructor(_name: string, _description: string, _position: Room, language: game.Language, inventory: game.Item[]) {
            super();
            this.name = _name;
            this.description = _description;
            this.position = _position;
            this.language = language;
            this.inventory = inventory;
        }

        move(_direction: string): void {
            if(_direction.toUpperCase() in Direction){
                let direction = (<any> Direction)[_direction.toUpperCase()]
                let currentRoom: Room = this.position;
                if (currentRoom.adjacentRooms.has(direction)) {
                    let newRoom: Room = currentRoom.adjacentRooms.get(direction);
                    this.position = newRoom;
                    GameManager.printToConsole("You moved into the " + newRoom.name);
                    GameManager.printToConsole(newRoom.description);
                } else {
                    GameManager.printToConsole("There is no room in this direction!");
                }
            } else {
                GameManager.printToConsole("There is no room in this direction!");
            }

        }

        takeItem(_itemName: string): void {
            let itemFound = this.checkIfArrayContainsDescribable(_itemName, this.position.inventory);
            if (itemFound !== false) {
                let item: Item = this.position.inventory[<number>itemFound];
                this.inventory.push(item);
                this.position.inventory = this.position.inventory.filter(obj => obj !== item);
                this.position.updateLookDescription();
                GameManager.printToConsole(item.name + " has been added to your inventory");
            } else {
                GameManager.printToConsole("Item not found!");
            }
        }

        dropItem(_itemName: string): void {
            let itemFound = this.checkIfArrayContainsDescribable(_itemName, this.inventory);
            if (itemFound !== false) {
                let item: Item = this.inventory[<number>itemFound];
                this.position.inventory.push(item);
                this.inventory = this.inventory.filter(obj => obj !== item);
                this.position.updateLookDescription();
                GameManager.printToConsole("Item dropped!");
            } else {
                GameManager.printToConsole("Item not found!");
            }
        }

        examineItem(_itemName: string): void {
            let itemFound = this.checkIfArrayContainsDescribable(_itemName, this.inventory);
            if (itemFound !== false) {
                let item: Item = this.inventory[<number>itemFound];
                GameManager.printToConsole(item.name + ": " + item.description);
            } else {
                GameManager.printToConsole("Item not found!");
            }
        }

        talkToNPC(_nameOfNPC: string): void {
            let humanFound = this.checkIfArrayContainsDescribable(_nameOfNPC, this.position.people);
            if (humanFound !== false) {
                let npc: Human = this.position.people[<number>humanFound];
                npc.talk();
            } else {
                GameManager.printToConsole("There is no human with this name in this room!")
            }
        }

        look(): void {
            GameManager.printToConsole(this.position.lookDescription);
        }

        showInventory(): void {
            let outputMessage: string = "Inventory: [ ";
            this.inventory.forEach(function (item) {
                outputMessage = outputMessage + item.name + " ";
            });

            GameManager.printToConsole(outputMessage + " ]");
        }


        checkIfArrayContainsDescribable(_itemName: string, _inventory: Item[]): number | boolean {
            for (let i = 0; i < _inventory.length; i++) {
                if (_inventory[i].name == _itemName) {
                    return i;
                }
            }
            return false;
        }
    }
}