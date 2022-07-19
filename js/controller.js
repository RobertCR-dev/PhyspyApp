// import * as model from "./model.js";

import popUp from "./views/popUp.js";
import from from "./views/form.js";
import result from "./views/result.js";
import * as model from "./model.js";
// import form from "./views/form.js";
// import pagination from "./views/pagination.js";
// import pattients from;
// import info from ;

// const SearchPattients = function () {};
// const addPattient = function () {};

// const init = function () {};
// init();

model.seedPattients(15);
console.log(model.pattients);
localStorage.clear();
// const controlResults = function () {
//   for (pattient in model.pattients) {
//     result.render(pattient);
//   }
// };
