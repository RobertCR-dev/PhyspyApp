import View from "./View.js";

class header extends View {
  search = document.querySelector(".header_search");
  input = document.querySelector(".header_search_input");

  constructor() {
    super();
  }

  listenQueries(func) {
    this.search.addEventListener("submit", function (e) {
      e.preventDefault();
      func();
    });
  }

  getQuery() {
    return this.input.value;
  }
}

export default new header();
