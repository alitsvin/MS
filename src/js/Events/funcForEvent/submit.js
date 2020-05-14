import cardSet from "../../obj/card.js"
import searchAlgorithm from "../../obj/search.js"

export default function searchSubmit() {
  if (searchAlgorithm.strFromInput() != "noSearch") {
    searchAlgorithm.currentLoadingPage = 1;
    searchAlgorithm.loading = true;
    cardSet.cardSetDelete();
    searchAlgorithm.searchAlgorithm()
      .then(res => {
        searchAlgorithm.getMovies(searchAlgorithm.currentLoadingPage)
          .then(res => {
            cardSet.dataArr = res.slice();
            cardSet.cardSetCreate();
          },
            () => {

            })
      })
  } else {
    document.querySelector('#statusBar span').innerHTML = "Please, enter a movie name"
  }

  return false;

}