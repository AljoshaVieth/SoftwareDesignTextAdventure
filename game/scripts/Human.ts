namespace game {
    import Item = game.Item;
    import Creature = game.Creature;
    import Room = game.Room;
    import GameManager = game.GameManager;

    export class Human extends Creature {
        public inventory: Item[];
        public answers: string[];
        public isGuilty: boolean;


        constructor(_name: string, _description: string, _inventory: game.Item[], _answers: string[], _isGuilty: boolean) {
            super();
            this.name = _name;
            this.description = _description;
            this.inventory = _inventory;
            this.answers = _answers;
            this.isGuilty = _isGuilty;
        }

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

        talk(): void {
            let randomAnswer = this.answers[Math.floor(Math.random() * this.answers.length)];
            GameManager.printToConsole(this.name + ": " + randomAnswer);
        }
    }
}