namespace game {
    export class GameManager {

        static printToConsole(_message: string){
            let consoleDiv: HTMLDivElement = <HTMLDivElement> document.getElementById("consoleInput");
            consoleDiv.innerText = consoleDiv.innerHTML + "<br/>" + _message;
        }
        

    }
}