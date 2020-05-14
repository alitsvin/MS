class Keyboard {
  constructor() {
    this._keysButtonArr = [];
    this._keysSets = {
      keysInit: ["Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace", "Tab", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "Delete",
        "CapsLock", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Backslash", "Enter", "ShiftLeft", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash", "AltLeft", "Space", "ArrowLeft", "ArrowRight"],
      keysEN2nd: ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "backspace", "Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", "Del",
        "Caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", "\"", "|", "Enter", "Shift", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", "Alt", "Space", "left", "right"],
      keysEN: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace", "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "Del",
        "Caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "\\", "Enter", "Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "Alt", "Space", "left", "right"],
      keysRU: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace", "Tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "Del",
        "Caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "\\", "Enter", "Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "Alt", "Space", "left", "right"],
      keysRU2nd: ["!", "\"", "№", ";", "%", ":", "?", "*", "(", ")", "_", "+", "backspace", "Tab", "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ", "Del",
        "Caps", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", "/", "Enter", "Shift", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ",", "Alt", "Space", "left", "right"]
    }

    this._mode = {
      capslock: false,
      shift: false,
      ctrl: false,
      alt: false,
      activeKeySet: "keysEN",
    }

    this._inputArea = document.querySelector("#searchInput");
  }

  inputKey(key) {
    this._inputArea.focus();
    if (this._inputArea.selectionStart || this._inputArea.selectionStart == "0") {
      const start = this._inputArea.selectionStart;
      const end = this._inputArea.selectionEnd;
      this._inputArea.value = this._inputArea.value.substring(0, start) + key + this._inputArea.value.substring(end, this._inputArea.value.length);
      this._inputArea.setSelectionRange(start + 1, start + 1);
    }
  }

  delKey() {
    this._inputArea.focus();
    if (this._inputArea.selectionStart || this._inputArea.selectionStart == "0") {
      const start = this._inputArea.selectionStart;
      const end = this._inputArea.selectionEnd;
      this._inputArea.value = this._inputArea.value.substring(0, start) + this._inputArea.value.substring(end + 1, this._inputArea.value.length);
      this._inputArea.setSelectionRange(start, start);
    }
  }

  backspaceKey() {
    this._inputArea.focus();
    if (this._inputArea.selectionStart || this._inputArea.selectionStart == "0") {
      const start = this._inputArea.selectionStart;
      const end = this._inputArea.selectionEnd;
      this._inputArea.value = this._inputArea.value.substring(0, start - 1) + this._inputArea.value.substring(end, this._inputArea.value.length);
      this._inputArea.setSelectionRange(start - 1, start - 1);
    }
  }

  moveText(key) {
    this._inputArea.focus();
    const start = this._inputArea.selectionStart;
    if (this._inputArea.selectionStart || this._inputArea.selectionStart == "0") {
      switch (key) {
        case "left":
          this._inputArea.setSelectionRange(start - 1, start - 1);
          break;

        case "right":
          this._inputArea.setSelectionRange(start + 1, start + 1);
          break;
      }
    }
  }

  capsActivation() {
    this._mode.capslock = !this._mode.capslock;
    if (this._mode.capslock) {
      document.querySelector("button[name = CapsLock]").classList.add("active");
    } else {
      document.querySelector("button[name = CapsLock]").classList.remove("active")
    }

    for (let keybutton of this._keysButtonArr) {
      if (keybutton.classList.contains("charButton")) {
        keybutton.value = this._mode.capslock ? keybutton.value.toUpperCase() : keybutton.value.toLowerCase();
        keybutton.innerHTML = `<i>${keybutton.value}</i>`
      }
    }
  }

  shiftActivation() {
    this._mode.shift = !this._mode.shift;
    if (this._mode.shift) {
      document.querySelector("button[name=ShiftLeft]").classList.add("active");
    } else {
      document.querySelector("button[name=ShiftLeft]").classList.remove("active");
    }
  }

  altActivation() {
    this._mode.alt = !this._mode.alt;
    if (this._mode.alt) {
      document.querySelector("button[name=AltLeft]").classList.add("active");
    } else {
      document.querySelector("button[name=AltLeft]").classList.remove("active");
    }
  }

  change2nd() {
    switch (this._mode.activeKeySet) {
      case "keysEN": this._mode.activeKeySet = "keysEN2nd";
        break;

      case "keysEN2nd": this._mode.activeKeySet = "keysEN";
        break;

      case "keysRU": this._mode.activeKeySet = "keysRU2nd";
        break;

      case "keysRU2nd": this._mode.activeKeySet = "keysRU";
        break;
    }
    for (let keybutton of this._keysButtonArr) {
      if (keybutton.classList.contains("charButton")) {
        keybutton.value = this._keysSets[this._mode.activeKeySet][this._keysSets.keysInit.indexOf(keybutton.name)];
        keybutton.innerHTML = `<i>${keybutton.value}</i>`;
      }
    }
  }

  changeLang() {
    if (this._mode.alt) {
      this._mode.alt = !this._mode.alt;
      document.querySelector("button[name=AltLeft]").classList.remove("active");
    }
    switch (this._mode.activeKeySet) {
      case "keysEN": this._mode.activeKeySet = "keysRU";
        break;

      case "keysEN2nd": this._mode.activeKeySet = "keysRU";
        break;

      case "keysRU": this._mode.activeKeySet = "keysEN";
        break;

      case "keysRU2nd": this._mode.activeKeySet = "keysEN";
        break;
    }

    for (let keybutton of this._keysButtonArr) {
      if (keybutton.classList.contains("charButton")) {
        keybutton.value = this._keysSets[this._mode.activeKeySet][this._keysSets.keysInit.indexOf(keybutton.name)];
        keybutton.innerHTML = `<i>${keybutton.value}</i>`;
      }
    }
    if (this._mode.capslock) {
      for (let keybutton of this._keysButtonArr) {
        if (keybutton.classList.contains("charButton")) {
          keybutton.value = this._mode.capslock ? keybutton.value.toUpperCase() : keybutton.value.toLowerCase();
          keybutton.innerHTML = `<i>${keybutton.value}</i>`;
        }
      }
    }
    localStorage.setItem("lang", this._mode.activeKeySet);
  }

  makeDomObj() {
    const keyboard = document.createElement('div');
    keyboard.classList.add("keyboard");

    this._keysSets.keysEN.forEach(key => {
      const keyButton = document.createElement('button');

      switch (key) {
        default:
          keyButton.classList.add('charButton');
          keyButton.innerHTML = `<i>${key}</i>`;
          keyButton.value = key;
          keyButton.name = this._keysSets.keysInit[this._keysSets.keysEN.indexOf(key)];
          break;

        case 'left':
          keyButton.innerHTML = `<i>←</i>`;
          keyButton.value = key;
          keyButton.name = this._keysSets.keysInit[this._keysSets.keysEN.indexOf(key)];
          break;

        case 'right':
          keyButton.innerHTML = `<i>→</i>`;
          keyButton.value = key;
          keyButton.name = this._keysSets.keysInit[this._keysSets.keysEN.indexOf(key)];
          break;

        case "Caps":
          keyButton.innerHTML = `<i>${key}</i>`;
          keyButton.value = key;
          keyButton.name = this._keysSets.keysInit[this._keysSets.keysEN.indexOf(key)];
          keyButton.style.maxWidth = "9%";
          break;

        case "backspace":
          keyButton.innerHTML = `<i>←</i>`;
          keyButton.value = key;
          keyButton.name = this._keysSets.keysInit[this._keysSets.keysEN.indexOf(key)];
          keyButton.style.maxWidth = "9%";
          break;

        case "Alt":
          keyButton.innerHTML = `<i>2nd</img>`;
          keyButton.value = key;
          keyButton.name = this._keysSets.keysInit[this._keysSets.keysEN.indexOf(key)];
          keyButton.style.maxWidth = "6%";
          break;

        case "Del":
        case "Tab":
          keyButton.innerHTML = `<i>${key}</i>`;
          keyButton.value = key;
          keyButton.name = this._keysSets.keysInit[this._keysSets.keysEN.indexOf(key)];
          keyButton.style.maxWidth = "6%";
          break;

        case "Enter":
          keyButton.innerHTML = `<i>${key}</i>`;
          keyButton.value = key;
          keyButton.name = this._keysSets.keysInit[this._keysSets.keysEN.indexOf(key)];
          keyButton.style.maxWidth = "7%";
          break;

        case "Shift":
          keyButton.innerHTML = `<i>Rus</i>`;
          keyButton.value = key;
          keyButton.name = this._keysSets.keysInit[this._keysSets.keysEN.indexOf(key)];
          keyButton.style.maxWidth = "9%";
          break;

        case "Space":
          keyButton.innerHTML = `<i>${key}</i>`;
          keyButton.value = key;
          keyButton.name = this._keysSets.keysInit[this._keysSets.keysEN.indexOf(key)];
          keyButton.style.maxWidth = "27%";
          break;

      }
      keyboard.appendChild(keyButton);
      if (["backspace", "Del", "Enter", "/"].includes(key)) {
        keyboard.appendChild(document.createElement('br'));
      }
    })
    document.querySelector('#keyboard').appendChild(keyboard);
    this._keysButtonArr = document.querySelectorAll("#keyboard button");
  }

}

const keyboard = new Keyboard();
keyboard.makeDomObj();
export default keyboard;