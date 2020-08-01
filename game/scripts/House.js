"use strict";
var game;
(function (game) {
    class House {
        constructor(_name, _rooms) {
            this.name = _name;
            this.rooms = _rooms;
        }
    }
    game.House = House;
})(game || (game = {}));
//# sourceMappingURL=House.js.map