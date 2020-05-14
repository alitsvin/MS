class CardSet {
  constructor(arr) {
    this._arr = arr.slice();
    this._arrCardDomObj = [];
    this._activeCardNumber = 0;
    this._cardOnScreenCount = 4;
    this._cardWidth = 300;
  }

  get dataArr() {
    return this._arr;
  }

  get activeCardNumber() {
    return this._activeCardNumber;
  }

  get cardOnScreenCount() {
    return this._cardOnScreenCount;
  }

  get arrCardDomObj() {
    return this._arrCardDomObj;
  }

  set dataArr(item) {
    this._arr = item.slice();
  }

  set activeCardNumber(item) {
    this._activeCardNumber = item;
  }

  cardCreate(cardNumber) {
    const cardDomObj = document.createElement('div');

    cardDomObj.classList.add('card');

    cardDomObj.style.width = this._cardWidth + 'px';

    if (this._arr[cardNumber].imdbRating == undefined || this._arr[cardNumber].imdbRating == "N/A") {
      this._arr[cardNumber].imdbRating = "7.1";
    }

    const img = document.createElement('img');
    img.src = this._arr[cardNumber].Poster;
    img.onerror = () => {
      img.src = "assets/img/zah.jpg"
    }

    cardDomObj.innerHTML = `<div class="cardContent">
      <div class="title"><a href='https://www.imdb.com/title/${this._arr[cardNumber].imdbID}'><span>${this._arr[cardNumber].Title}</span></a></div>
      <div class="cardInfo"><span>Year: ${this._arr[cardNumber].Year}</span>
      <span>ImdbRating: ${this._arr[cardNumber].imdbRating}</span></div>
      </div>`

    cardDomObj.querySelector('.cardContent div').after(img);

    document.querySelector("#filmBlock").appendChild(cardDomObj);

  }

  cardSetCreate() {
    let windowWidth = window.getComputedStyle(document.body).width.slice(0, -2);
    this._cardOnScreenCount = Math.floor(windowWidth / 320);
    this._cardWidth = windowWidth / this._cardOnScreenCount;

    for (let i = 0; i < this._arr.length; i++) {
      this.cardCreate(i);
      if (i < this._cardOnScreenCount) {
        document.querySelectorAll('.card')[i].classList.add('onScreen');
      }
    }

    this._arrCardDomObj = document.querySelectorAll('div.card');
  }

  cardSetDelete() {
    this._activeCardNumber = 0;
    for (let item of document.querySelectorAll("#filmBlock div.card")) {
      item.remove();
    }
  }

  cardSetUpdate(arr) {
    const j = this._arr.length;
    this._arr = this._arr.concat(arr).slice();

    for (let i = j; i < this._arr.length; i++) {
      this.cardCreate(i);
    }

    this._arrCardDomObj = document.querySelectorAll('div.card');
  }

}

var cardSet = new CardSet([]);
export default cardSet;