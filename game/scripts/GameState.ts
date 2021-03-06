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

        static createGameStateFromJSON(json: any): GameState{
            let adjacentRoom: Map<Direction, Room>= new Map();
            Object.assign(adjacentRoom, json.player.position.adjacentRooms);
            let position: Room = new Room("", "", [], [], adjacentRoom);
            Object.assign(position, json.player.position);

            let player: Player = new Player(json.player.name, json.player.description, position, json.player.language, json.player.inventory);
            return new GameState(json.name, json.description, json.saveDate, player, json.house, json.bots);
        }
    }
}