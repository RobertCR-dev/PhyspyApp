import popUp from "./views/popUp.js";
import form from "./views/form.js";
// import result from "./views/result.js";
import * as model from "./model.js";
import header from "./views/header.js";
import pattients from "./views/pattients.js";
import pages from "./views/pages.js";
import info from "./views/info.js";

const loadPattients = function () {
  model.state.page = 1;
  model.queryPattients(header.getQuery());
  pattients.renderPattients(model.state);
  pages.renderPages(model.state);
};

const openForm = function () {
  model.state.activeID = "";
  location.hash = "";
  info.clear();
  form.displayForm();
};

const generateAppointment = function () {};

const editPattient = function () {};

const removePattient = function () {
  model.remove(window.location.hash.slice(1));
  location.hash = "";
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
  info.selectButtons(generateAppointment, editPattient, removePattient);
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

const submitForm = function (e) {
  e.preventDefault();
  console.log(form.form.elements["pattient"].value);
  if (window.location.hash.slice(1) === "") {
  } else {
  }
};

const init = function () {
  header.listenQueries(loadPattients);
  form.listenOpenForm(openForm);
  pattients.listenSelectedPattient(selectPattient);
  pages.listenButtons(changePage);
  form.listenSubmit(submitForm);
};

init();
