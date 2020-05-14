import cardSet from "../../obj/card.js"
import searchAlgorithm from "../../obj/search.js"

export default function arrowClick(mode) {
  const filmBlock = document.querySelector("#filmBlock");

  if (mode == 'Right' && ((cardSet.activeCardNumber + 1) * cardSet.cardOnScreenCount) < cardSet.dataArr.length) {
    cardSet.activeCardNumber++;

    for (let i = 0; i < cardSet.cardOnScreenCount; i++) {
      try {
        cardSet.arrCardDomObj[cardSet.activeCardNumber * cardSet.cardOnScreenCount + i].classList.add('onScreen');
      }
      catch (err) { }
    }

    filmBlock.style.transform = `translateX(${-100 * cardSet.activeCardNumber}vw)`


    if ((cardSet.activeCardNumber + 5) * cardSet.cardOnScreenCount >= cardSet.arrCardDomObj.length) {
      searchAlgorithm.currentLoadingPage++;
      searchAlgorithm.getMovies(searchAlgorithm.currentLoadingPage)
        .then(res => {
          cardSet.cardSetUpdate(res);
        },
          () => {
            searchAlgorithm.currentLoadingPage--;
          })
    }

  } else if (mode == 'Left' && cardSet.activeCardNumber != 0) {
    cardSet.activeCardNumber--;

    for (let i = 0; i < cardSet.cardOnScreenCount; i++) {
      try {
        setTimeout(() => {
          document.querySelectorAll(".card.onScreen").forEach((element, index) => {
            if (index >= (cardSet.cardOnScreenCount * (cardSet.activeCardNumber + 1)))
              element.classList.remove('onScreen');
          });

        }, 2000);
      }
      catch (err) { }
    }

    filmBlock.style.transform = `translateX(${-100 * cardSet.activeCardNumber}vw)`

  }
}