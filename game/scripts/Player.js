"use strict";
var game;
(function (game) {
    class Player extends game.Creature {
        constructor(_name, _description, _position, language, inventory) {
            super();
            this.name = _name;
            this.description = _description;
            this.position = _position;
            this.language = language;
            this.inventory = inventory;
        }
        move(_direction) {
            if (_direction.toUpperCase() in game.Direction) {
                let direction = game.Direction[_direction.toUpperCase()];
                let currentRoom = this.position;
                if (currentRoom.adjacentRooms.has(direction)) {
                    let newRoom = currentRoom.adjacentRooms.get(direction);
                    this.position = newRoom;
                    game.GameManager.printToConsole("You moved into the " + newRoom.name);
                    game.GameManager.printToConsole(newRoom.description);
                }
                else {
                    game.GameManager.printToConsole("There is no room in this direction!");
                }
            }
            else {
                game.GameManager.printToConsole("There is no room in this direction!");
            }
        }
        takeItem(_itemName) {
            console.log("TAKE ITEMMMMMMMMMMMM");
            console.log("Trying to take item: [" + _itemName + "]");
            let itemFound = this.checkIfArrayContainsDescribable(_itemName, this.position.inventory);
            console.log("ITEM FOUND = " + itemFound);
            if (itemFound !== false) {
                let item = this.position.inventory[itemFound];
                this.inventory.push(item);
                this.position.inventory = this.position.inventory.filter(obj => obj !== item);
                this.position.updateLookDescription();
                game.GameManager.printToConsole(item.name + "Has been added to your inventory"); //TODO MEthode zum lesen des Items
            }
            else {
                game.GameManager.printToConsole("Item not found!");
            }
        }
        dropItem(_itemName) {
            let itemFound = this.checkIfArrayContainsDescribable(_itemName, this.inventory);
            if (itemFound !== false) {
                let item = this.inventory[itemFound];
                this.position.inventory.push(item);
                this.inventory = this.inventory.filter(obj => obj !== item);
                this.position.updateLookDescription();
                game.GameManager.printToConsole("Item dropped!");
            }
            else {
                game.GameManager.printToConsole("Item not found!");
            }
        }
        examineItem(_itemName) {
            let itemFound = this.checkIfArrayContainsDescribable(_itemName, this.inventory);
            if (itemFound !== false) {
                let item = this.inventory[itemFound];
                game.GameManager.printToConsole(item.name + ": " + item.description);
            }
            else {
                game.GameManager.printToConsole("Item not found!");
            }
        }
        talkToNPC(_nameOfNPC) {
            let humanFound = this.checkIfArrayContainsDescribable(_nameOfNPC, this.position.people);
            if (humanFound !== false) {
                let npc = this.position.people[humanFound];
                npc.talk();
            }
            else {
                game.GameManager.printToConsole("There is no human with this name in this room!");
            }
        }
        look() {
            game.GameManager.printToConsole(this.position.lookDescription);
        }
        showInventory() {
            let outputMessage = "Inventory: [ ";
            this.inventory.forEach(function (item) {
                outputMessage = outputMessage + item.name + " ";
            });
            game.GameManager.printToConsole(outputMessage + " ]");
        }
        checkIfArrayContainsDescribable(_itemName, _inventory) {
            console.log("Searching for item [" + _itemName + "]");
            console.log("Inventory length = " + _inventory.length);
            for (let i = 0; i < _inventory.length; i++) {
                console.log("CurrentItemName: " + _inventory[i].name);
                if (_inventory[i].name == _itemName) {
                    console.log("ITEM FOUND!!!!!!!!!!");
                    return i;
                }
            }
            return false;
        }
    }
    game.Player = Player;
})(game || (game = {}));
//# sourceMappingURL=Player.js.map