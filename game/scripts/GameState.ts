namespace game {

    export class GameState extends Describable{
        public saveDate: Date;
        public player: Player;
        public house: House;
        public bots: Human[];


        constructor(_name: string, _description: string, _saveDate: Date, _player: game.Player, _house: game.House, _bots: game.Human[]) {
            super();
            this.name = _name;
            this.description = _description;
            this.saveDate = _saveDate;
            this.player = _player;
            this.house = _house;
            this.bots = _bots;
        }

        createGameStateFromJSON(): GameState{
            //TODO
            return null;
        }
    }
}