import View from "./View.js";

class Result extends View {
  constructor() {
    super();
  }

  ResultsHandler = function (controllerFunction) {
    addEventListener("load", controllerFunction);
  };
}

export default new Result();
