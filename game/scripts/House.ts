namespace game {
    export class House {
        public name: string;
        public rooms: Room[];


        constructor(_name: string, _rooms: game.Room[]) {
            this.name = _name;
            this.rooms = _rooms;
        }
    }
}