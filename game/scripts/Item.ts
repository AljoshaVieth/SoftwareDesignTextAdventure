namespace game {
    import Describable = game.Describable;

    export class Item extends Describable{
        constructor(_name: string, _description: string) {
            super();
            this.name = _name;
            this.description = _description;
        }
    }
}