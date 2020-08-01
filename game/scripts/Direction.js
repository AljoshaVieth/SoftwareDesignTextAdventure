"use strict";
var game;
(function (game) {
    let Direction;
    (function (Direction) {
        Direction[Direction["NORTH"] = 0] = "NORTH";
        Direction[Direction["EAST"] = 1] = "EAST";
        Direction[Direction["WEST"] = 2] = "WEST";
        Direction[Direction["SOUTH"] = 3] = "SOUTH";
    })(Direction = game.Direction || (game.Direction = {}));
})(game || (game = {}));
//# sourceMappingURL=Direction.js.map