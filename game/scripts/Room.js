"use strict";
var game;
(function (game) {
    class Room extends game.Describable {
        constructor(_name, _description, _inventory, _people, _adjacentRooms) {
            super();
            this.name = _name;
            this.description = _description;
            this.inventory = _inventory;
            this.people = _people;
            this.adjacentRooms = _adjacentRooms;
        }
        getRandomAdjacentRoom() {
            let rooms = Array.from(this.adjacentRooms.values());
            return rooms[Math.floor(Math.random() * rooms.length)];
        }
    }
    game.Room = Room;
})(game || (game = {}));
//# sourceMappingURL=Room.js.map