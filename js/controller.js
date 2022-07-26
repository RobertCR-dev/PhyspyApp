import * as model from "./model.js";
import popUp from "./views/popUp.js";
import form from "./views/form.js";
import header from "./views/header.js";
import pattients from "./views/pattients.js";
import pages from "./views/pages.js";
import info from "./views/info.js";
import * as helpers from "./helpers.js";

const loadPattients = function () {
  model.state.page = 1;
  model.queryPattients(header.getQuery());
  pattients.renderPattients(model.state);
  pages.renderPages(model.state);
};

const openForm = function () {
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

  location.hash = ev.target.closest(".pattients_result_item").dataset.id;
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

const submitForm = async function (e) {
  e.preventDefault();
  if (window.location.hash.slice(1) === "") {
    const field = form.form.elements;
    let imgSrc;
    //  await helpers.uploadToCloudinary(
    //   form.form.elements["img"].files
    // );
    const data = [
      field["name"].value,
      field["birthday"].value,
      field["gender"].value,
      field["number"].value,
      field["email"].value,
      field["reason"].value,
      field["description"].value,
      imgSrc,
    ];

    const newID = model.generatePattient(...data);
    location.hash = newID;

    form.hideForm();
    form.form.reset();
    form.removeImage();
  } else {
  }
};

const displayInfo = function () {
  if (window.location.hash.slice(1) === "") return;
  model.state.activeID = window.location.hash.slice(1);
  let active = model.pattients.find((p) => p.id === model.state.activeID);
  info.renderInfo(active);
};

const init = function () {
  header.listenQueries(loadPattients);
  form.listenOpenForm(openForm);
  pattients.listenSelectedPattient(selectPattient);
  pages.listenButtons(changePage);
  form.listenSubmit(submitForm);
  info.listenInfo(displayInfo);
};

init();
