"use strict";
var game;
(function (game) {
    var Describable = game.Describable;
    class Item extends Describable {
        constructor(_name, _description) {
            super();
            this.name = _name;
            this.description = _description;
        }
    }
    game.Item = Item;
})(game || (game = {}));
//# sourceMappingURL=Item.js.map