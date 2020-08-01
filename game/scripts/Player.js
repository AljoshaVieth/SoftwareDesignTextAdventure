"use strict";
var game;
(function (game) {
    class Player extends game.Creature {
        constructor(_name, _description, language, inventory) {
            super();
            this.name = _name;
            this.description = _description;
            this.language = language;
            this.inventory = inventory;
        }
        move(_direction) {
            let currentRoom = this.position;
            if (currentRoom.adjacentRooms.has(_direction)) {
                let newRoom = currentRoom.adjacentRooms.get(_direction);
                this.position = newRoom;
                game.GameManager.printToConsole("You moved into the " + newRoom.name);
                game.GameManager.printToConsole(newRoom.description);
            }
            else {
                game.GameManager.printToConsole("There is no room in this direction!");
            }
        }
        takeItem(_itemName) {
            let itemFound = this.checkIfArrayContainsDescribable(_itemName, this.position.inventory);
            if (itemFound != false) {
                let item = this.position.inventory[itemFound];
                this.inventory.push(item);
                this.position.inventory.splice(itemFound, 1);
                game.GameManager.printToConsole(item.name + "Has been added to your inventory"); //TODO MEthode zum lesen des Items
            }
            else {
                game.GameManager.printToConsole("Item not found!");
            }
        }
        dropItem(_itemName) {
            let itemFound = this.checkIfArrayContainsDescribable(_itemName, this.position.inventory);
            if (itemFound != false) {
                let item = this.position.inventory[itemFound];
                this.position.inventory.push(item);
                this.inventory.splice(itemFound, 1);
                game.GameManager.printToConsole("Item dropped!");
            }
            else {
                game.GameManager.printToConsole("Item not found!");
            }
        }
        talkToNPC(_nameOfNPC) {
            let humanFound = this.checkIfArrayContainsDescribable(_nameOfNPC, this.position.people);
            if (humanFound != false) {
                let npc = this.position.people[humanFound];
                npc.talk();
            }
            else {
                game.GameManager.printToConsole("There is no human with this name in this room!");
            }
        }
        look() {
            game.GameManager.printToConsole(this.position.description);
        }
        showInventory() {
            let outputMessage = "Inventory: ";
            this.inventory.forEach(function (item) {
                outputMessage = outputMessage + item.name;
            });
            game.GameManager.printToConsole(outputMessage);
        }
        checkIfArrayContainsDescribable(_itemName, _inventory) {
            for (let i = 0; i < _inventory.length; i++) {
                if (_inventory[i].name == _itemName) {
                    return i;
                }
            }
            return false;
        }
    }
    game.Player = Player;
})(game || (game = {}));
//# sourceMappingURL=Player.js.map