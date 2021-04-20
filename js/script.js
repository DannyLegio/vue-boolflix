
function numberGenerator(min, max) {

  let localMin = min;
  let localMax = max - min + 1;
  return Math.floor(Math.random() * (localMax - localMin)) + localMin;
} // END OF FUNCTION numberGenerator

// -----------------------------------------------------------------------------

function vueInit() {

  new Vue({
    el: "#vueDanny",
    data: {
      "movieListInput": "",
      "filmList": [],
      "series":[],
      flagFilm: {
        "en": "./img/uk.png",
        "it": "./img/ita.png"
      }
    },
    methods: {

      apiFunction: function() {
        // ----------------FILMS--------------------
        axios.get('https://api.themoviedb.org/3/search/movie',{
          params: {
            "api_key": "5417e301ed04120dd8453bb02047022f",
            "query": this.movieListInput
          }
        })
        .then(data => {
          this.filmList = data.data.results;
          console.log(this.filmList);

          this.movieListInput = "";
        })
        .catch(() => console.log("I AM ERRROR"));
        // ----------------TV--------------------
        // --------------SERIES------------------
        axios.get('https://api.themoviedb.org/3/search/tv',{
          params: {
            "api_key": "5417e301ed04120dd8453bb02047022f",
            "query": this.movieListInput
          }
        })
        .then(data => {

          this.series = data.data.results;
          console.log(this.series);

          this.movieListInput = "";
        })
        .catch(() => console.log("I AM ERRROR"));

      }, // END apiFun

      // THIS FUNCTION IS TO CUT THE H2/p TEXT IN EACH BOX WHEN IT'S LONGER THAN (CHECK HTML LINE 41)
      cutText: function (title, length, suffix) { // I pass the name of this funtion inside the {{ }} in HTML and then I pass it the parameters: title, length (decide how long you want the string to be), and then the suffix "..."
        if (title.length > length) {
          return title.substring(0, length) + suffix;
        } else {
          return title; // but if the text is no longer than the length I decided then it gives back the length
        }

      }, // END OF cutText FUNCTION (IN METHODS)-----------------------------

    }, // END METHODS
    computed: {
      films: function() {
        return this.filmList.map((film) => {

          // SPREAD OPERATOR
          let movie = {
            ...film // this is to NOT edit the original vote, we want to translate the vote from 1/10 to 1/5 not modify the vote_average into the array
          }

          // let tvSeries = {
          //   ...series
          // }

          movie.srcFlag = this.flagFilm[film.original_language]; // because we have already accessed the "movie" we can add the flag in teh same way
          movie.vote_average = Math.ceil(movie.vote_average / 2 );
          // tvSeries.vote_average = Math.ceil(tvSeries.vote_average / 2 );
          return movie;
        });
      } // END FILMS FUNCTION

    } // END COMPUTED

  }) // END NEW VUE

} // END FUNCTION vueInit


// -----------------------------------------------------------------------------
function init() {

  vueInit();

} // END FUNCTION INIT

document.addEventListener('DOMContentLoaded', init);
