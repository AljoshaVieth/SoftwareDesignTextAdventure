"use strict";
var game;
(function (game) {
    class Room extends game.Describable {
        constructor(_name, _description, _inventory, _people, _adjacentRooms) {
            super();
            this.name = _name;
            this.inventory = _inventory;
            this.people = _people;
            this.adjacentRooms = _adjacentRooms;
            this.description = _description;
            this.updateLookDescription();
            console.log("Creating room with following adjacentRooms: " + _adjacentRooms.size);
            let output = "Rooms: ";
            _adjacentRooms.forEach(function (room, direction) {
                output = output + direction + room.name;
            });
            console.log(output);
        }
        getRandomAdjacentRoom() {
            let rooms = Array.from(this.adjacentRooms.values());
            return rooms[Math.floor(Math.random() * rooms.length)];
        }
        updateLookDescription() {
            let allItems = "Items[ ";
            this.inventory.forEach(function (item) {
                allItems = allItems + item.name + " | ";
            });
            allItems = allItems + " ]";
            let allHumans = "Humans[ ";
            this.people.forEach(function (human) {
                allHumans = allHumans + human.name;
            });
            allHumans = allHumans + " ]";
            this.lookDescription = this.description + " :  " + allItems + " _ " + allHumans;
        }
    }
    game.Room = Room;
})(game || (game = {}));
//# sourceMappingURL=Room.js.map