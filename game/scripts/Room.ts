namespace game {
    export class Room extends Describable {
        public inventory: Item[];
        public people: Human[];
        public adjacentRooms: Map<Direction, Room>;
        public lookDescription: string;


        constructor(_name: string, _description: string, _inventory: Item[], _people: Human[], _adjacentRooms: Map<Direction, Room>) {
            super();
            this.name = _name;
            this.inventory = _inventory;
            this.people = _people;
            this.adjacentRooms = _adjacentRooms;
            this.description = _description;
            this.updateLookDescription();

            console.log("Creating room with following adjacentRooms: " + _adjacentRooms.size);
            let output: string = "Rooms: ";
            _adjacentRooms.forEach(function (room, direction) {
                output = output + direction + room.name;

            })
            console.log(output);
        }

        getRandomAdjacentRoom(): Room {
            let rooms = Array.from(this.adjacentRooms.values());
            return rooms[Math.floor(Math.random() * rooms.length)];
        }

        updateLookDescription(): void {
            let allItems: string = "Items[ ";
            this.inventory.forEach(function (item) {
                allItems = allItems + item.name + " | ";

            })
            allItems = allItems + " ]";

            let allHumans: string = "Humans[ ";
            this.people.forEach(function (human) {
                allHumans = allHumans + human.name;

            })
            allHumans = allHumans + " ]";
            this.lookDescription = this.description + " :  " +  allItems  + " _ " + allHumans;
        }

    }
}