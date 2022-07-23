import popUp from "./views/popUp.js";
import form from "./views/form.js";
import result from "./views/result.js";
import * as model from "./model.js";
import header from "./views/header.js";
import pattients from "./views/pattients.js";
import pages from "./views/pages.js";
import info from "./views/info.js";

const loadPattients = function () {
  model.state.page = 1;
  model.queryPattients(header.getQuery());
  console.log(model.state.activePattients);
  pattients.renderPattients(model.state);
  pages.renderPages(model.state);
};

const selectPattient = function (ev) {
  if (ev.target.closest(".pattients_result_item") === null) return;

  model.state.activeID = ev.target.closest(".pattients_result_item").dataset.id;
  location.hash = model.state.activeID ?? "";
  info.renderInfo(
    model.state.activePattients.find(
      (p) => p.id === window.location.hash.slice(1)
    )
  );
};

const changePage = function (ev) {
  if (ev.target.closest("[data-number]") === null) return;

  if (ev.target.closest("[data-number]").dataset.number === "+1") {
    model.state.page = Number(model.state.page) + 1;
  } else if (ev.target.closest("[data-number]").dataset.number === "-1") {
    model.state.page = Number(model.state.page) - 1;
  } else {
    model.state.page = Number(
      ev.target.closest("[data-number]").dataset.number
    );
  }
  pattients.renderPattients(model.state);
  pattients.selectHash();
  pages.renderPages(model.state);
};

const init = function () {
  header.listenQueries(loadPattients);
  pattients.listenSelectedPattient(selectPattient);
  pages.listenButtons(changePage);
};
init();
