namespace game {
    export class Room extends Describable{
        public inventory: Item[];
        public people: Human[];
        public adjacentRooms: Map<Direction, Room>;


        constructor(_name: string, _description: string, _inventory: Item[], _people: Human[], _adjacentRooms: Map<Direction, Room>) {
            super();
            this.name = _name;
            this.description = _description;
            this.inventory = _inventory;
            this.people = _people;
            this.adjacentRooms = _adjacentRooms;
        }

        getRandomAdjacentRoom(): Room {
            let rooms = Array.from(this.adjacentRooms.values());
            return rooms[Math.floor(Math.random() * rooms.length)];
        }
    }
}