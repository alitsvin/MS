class SearchAlgorithm {
  constructor() {
    this._searchStr = "";
    this._wordArr = [];
    this._result = [];
    this._loading = true;
    this._currentLoadingPage = 1;
    this._filmYear = null;
    this._filmTitle = null;
  }

  get searchStr() {
    return this._searchStr;
  }

  get wordArr() {
    return this._wordArr;
  }

  get result() {
    return this._result;
  }

  get currentLoadingPage() {
    return this._currentLoadingPage;
  }

  get loading() {
    return this._loading;
  }

  set searchStr(item) {
    this._searchStr = item;
  }

  set wordArr(item) {
    this._wordArr = item;
  }

  set result(item) {
    this._result = item;
  }

  set currentLoadingPage(item) {
    this._currentLoadingPage = item;
  }

  set loading(item) {
    this._loading = item;
  }

  strFromInput(item = "") {
    this._searchStr = item;
    this._filmTitle = null;
    this._filmYear = null;
    if (document.forms[0].elements.searchInput.value != "") {
      this._searchStr = document.forms[0].elements.searchInput.value;
      return;
    }
    if (item == "") {
      document.querySelector('#statusBar span').innerHTML = "Please, enter a movie name";
      return "noSearch";
    }
  }

  searchAlgorithm() {
    if (this._searchStr != "") {
      this._wordArr = this._searchStr.match(/[^\s]+/g);
    }

    const translKey = `trnsl.1.1.20200509T230835Z.b6eb436ae60e08e7.568e8f9d9335574c9f4ae03e74c63953b4dbf99c`;
    const translWord = this._wordArr.slice(1).reduce((sum, item) => { return sum + "+" + item }, this._wordArr[0]).trim();
    const langDetectUrl = `https://translate.yandex.net/api/v1.5/tr.json/detect?key=${translKey}&text=${translWord}&hint=ru,en`;


    const translPromise = new Promise(function (resolve, reject) {
      fetch(langDetectUrl)
        .then(res => {
          return res.json();
        })
        .then(data => {
          if (data.lang != "en") {
            const translUrl = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${translKey}&text=${translWord}&lang=${data.lang}-en`;

            fetch(translUrl)
              .then(res => res.json())
              .then(data => {
                resolve(data.text[0].match(/[^\s]+/g));
              })
          } else { resolve() }
        })
    })

    translPromise
      .then(res => {
        if (res != undefined) {
          this._wordArr = res;
        }
        for (let i = this._wordArr.length - 1; i >= 0; i--) {
          if (this._wordArr[i].search(/\d\d\d\d/) != (-1)) {
            if (i != 0) {
              this._filmYear = this._wordArr[i];
              this._filmTitle = this._wordArr.slice(1, i).reduce((sum, item) => { return sum + "+" + item }, this._wordArr[0]).trim()
            }
            break;
          }
        }
        if (this._filmYear == null) {
          this._filmTitle = this._wordArr.slice(1).reduce((sum, item) => { return sum + "+" + item }, this._wordArr[0]).trim()
        }

      })

    return translPromise;

  }

  getMovies(page) {
    let url = `https://www.omdbapi.com/?`;
    if (this._filmTitle != null) { url += `s=${this._filmTitle}` };
    if (this._filmTitle != null && this._filmYear != null) { url += `&` };
    if (this._filmYear != null) { url += `y=${this._filmYear}` };
    url += `&page=${page}&apikey=bc828bd1`;

    document.querySelector("#cssload-thecube").classList.add("active");
    const bool = this._loading;
    const filmTitle = this._filmTitle;

    const getMoviePromise = new Promise(function (resolve, reject) {
      if (filmTitle != null) {
        if (bool) {
          fetch(url)
            .then(res => res.json())
            .then(data => {
              if (data.Response != 'False') {
                const dataResult = data.Search.slice();
                for (let i = 0; i < dataResult.length; i++) {

                  const url = `https://www.omdbapi.com/?i=${dataResult[i].imdbID}&apikey=bc828bd1`;

                  fetch(url)
                    .then(res => res.json())
                    .then(data => {
                      dataResult[i].imdbRating = data.imdbRating;
                      if (i + 1 == dataResult.length) {
                        resolve(dataResult);
                      }
                    })
                }
              } else if (data.Error == "Request limit reached!") {
                reject("Page not found")
              } else { reject("No more results") }
            })
        } else { reject("No more results") }
      } else { reject('No Title') }
    })

    getMoviePromise
      .then(res => {
        if (res.length < 10) {
          this._loading = false;
        } else {
          this._loading = true;
        }

        this._result = res.slice();
        document.querySelector('#statusBar span').innerHTML = `Results for: ${this._wordArr.join(" ")}`;
        document.querySelector("#cssload-thecube").classList.remove("active");
      },
        (mode) => {
          this._loading = false;
          document.querySelector("#cssload-thecube").classList.remove("active");
          switch (mode) {
            case "Page not found":
              document.querySelector('#statusBar span').innerHTML = "Sorry, Page not found :(";
              break;

            case "No more results":
              if (document.querySelectorAll(".card"), length != 0) {
                document.querySelector('#statusBar span').innerHTML = `We found everything we could for: ${this._wordArr.join(" ")}`
              } else {
                document.querySelector('#statusBar span').innerHTML = `No results for: ${this._wordArr.join(" ")}`
              }
              break;

            case "No Title":
              document.querySelector('#statusBar span').innerHTML = "Please, enter a movie name"
              break;
          }

        }
      )

    return getMoviePromise;
  }
}

const searchAlgorithm = new SearchAlgorithm();
export default searchAlgorithm;
