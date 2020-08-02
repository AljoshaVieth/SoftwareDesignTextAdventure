"use strict";
var game;
(function (game) {
    var Creature = game.Creature;
    var GameManager = game.GameManager;
    class Human extends Creature {
        constructor(_name, _description, _inventory, _answers, _isGuilty) {
            super();
            this.name = _name;
            this.description = _description;
            this.inventory = _inventory;
            this.answers = _answers;
            this.isGuilty = _isGuilty;
        }
        /* move npc randomly (not needed in this small example)
        moveRandomly(): void{
            let randomNumber = Math.floor(Math.random() * 3);
            if(randomNumber == 0){
                let adjacentRoom: Room = this.position.getRandomAdjacentRoom();
                adjacentRoom.people.push(this);
                let index = this.position.people.indexOf(this, 0);
                this.position.people.splice(index, 1);
                this.position = adjacentRoom;
                this.position.updateLookDescription();
            }
        }
         */
        talk() {
            let randomAnswer = this.answers[Math.floor(Math.random() * this.answers.length)];
            GameManager.printToConsole(this.name + ": " + randomAnswer);
        }
    }
    game.Human = Human;
})(game || (game = {}));
//# sourceMappingURL=Human.js.map