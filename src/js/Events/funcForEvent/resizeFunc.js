import cardSet from "../../obj/card.js"

export default function resizeFunc() {

  let windowWidth = window.getComputedStyle(document.body).width.slice(0, -2);
  const prevCardOnScreenCount = cardSet._cardOnScreenCount;
  const prevActiveCardNumber = cardSet.activeCardNumber;

  cardSet._cardOnScreenCount = Math.floor(windowWidth / 320);
  cardSet._cardWidth = windowWidth / cardSet._cardOnScreenCount;

  cardSet.activeCardNumber = Math.floor(prevCardOnScreenCount * (prevActiveCardNumber + 1) / cardSet._cardOnScreenCount) - 1;
  if (cardSet.activeCardNumber < 0) { cardSet.activeCardNumber = 0 };

  document.querySelector("#filmBlock").style.transform = `translateX(${-100 * cardSet.activeCardNumber}vw)`;

  cardSet._arrCardDomObj.forEach(element => {
    element.classList.remove('onScreen');
    element.style.width = cardSet._cardWidth + 'px';
  })

  for (let i = 0; i < (cardSet.cardOnScreenCount * (cardSet.activeCardNumber + 1)); i++) {
    cardSet._arrCardDomObj[i].classList.add('onScreen');
  }

}