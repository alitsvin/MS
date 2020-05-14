import keyboard from "../obj/keyboard.js"
import searchSubmit from "./funcForEvent/submit.js"

document.addEventListener('click', () => {
  let item = null;
  if (event.target.closest('#keyboard button') != null) {
    item = event.target.closest('#keyboard button');
  }
  if (item != null) {
    switch (item.name) {
      case "Backspace":
        keyboard.backspaceKey();
        break;

      case "Space":
      case "Tab":
        keyboard.inputKey(" ");
        break;

      case "Delete":
        keyboard.delKey();
        break;

      case "CapsLock":
        keyboard.capsActivation();
        break;

      case "ShiftLeft":
        keyboard.shiftActivation();
        keyboard.changeLang();
        break;

      case "AltLeft":
        keyboard.altActivation();
        keyboard.change2nd();
        break;

      case "Enter":
        searchSubmit();
        break;

      case "ArrowRight":
        keyboard.moveText('right');
        break;

      case "ArrowLeft":
        keyboard.moveText('left');
        break;

      default:
        keyboard.inputKey(item.value);
        break;

    }
  }
})