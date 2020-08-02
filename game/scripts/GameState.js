"use strict";
var game;
(function (game) {
    class GameState extends game.Describable {
        constructor(_name, _description, _saveDate, _player, _house, _bots) {
            super();
            this.name = _name;
            this.description = _description;
            this.saveDate = _saveDate;
            this.player = _player;
            this.house = _house;
            this.bots = _bots;
        }
        static createGameStateFromJSON(json) {
            let adjacentRoom = new Map();
            Object.assign(adjacentRoom, json.player.position.adjacentRooms);
            let position = new game.Room("", "", [], [], adjacentRoom);
            Object.assign(position, json.player.position);
            let player = new game.Player(json.player.name, json.player.description, position, json.player.language, json.player.inventory);
            return new GameState(json.name, json.description, json.saveDate, player, json.house, json.bots);
        }
    }
    game.GameState = GameState;
})(game || (game = {}));
//# sourceMappingURL=GameState.js.map