let consoleInput: HTMLInputElement = <HTMLInputElement> document.getElementById("consoleInput");
consoleInput.addEventListener('blur', () => consoleInput.focus());