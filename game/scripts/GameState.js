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
        createGameStateFromJSON() {
            //TODO
            return null;
        }
    }
    game.GameState = GameState;
})(game || (game = {}));
//# sourceMappingURL=GameState.js.map