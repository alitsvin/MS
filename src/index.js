import "./css/main.css"
import "./scss/main.scss"

import searchAlgorithm from "./js/obj/search.js"
import cardSet from "./js/obj/card.js"
import keyboard from "./js/obj/keyboard.js"

if (searchAlgorithm.strFromInput('Игра') != "noSearch") {
  searchAlgorithm.searchAlgorithm()
    .then(() => {
      searchAlgorithm.getMovies(searchAlgorithm.currentLoadingPage)
        .then(res => {
          cardSet.dataArr = res.slice();
          cardSet.cardSetCreate();
        })
    })
} else {
  document.querySelector('#statusBar span').innerHTML = "Please, enter a movie name"
}

import "./js/Events/Events.js"
import "./js/Events/keyboardEvent.js"


