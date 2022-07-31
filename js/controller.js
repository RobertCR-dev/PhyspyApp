import * as model from "./model.js";
import popUp from "./views/popUp.js";
import patientForm from "./views/patientForm.js";
import appointmentForm from "./views/appointmentForm.js";
import header from "./views/header.js";
import patients from "./views/patients.js";
import pages from "./views/pages.js";
import info from "./views/info.js";
import appointments from "./views/appointments.js";
import * as helpers from "./helpers.js";

const loadPatients = function () {
  model.state.pageA = 1;
  model.queryPatients(header.getQuery());
  patients.renderPatients(model.state);
  pages.renderPages(model.state);
  if (window.location.hash.slice(1) === "") info.renderMessage(2);
};

const openPatientForm = function () {
  location.hash = "";
  info.clear(info.parentElement);
  patientForm.displayForm();
};

const selectPatient = function (ev) {
  if (ev.target.closest(".patients_result_item") === null) return;

  location.hash = ev.target.closest(".patients_result_item").dataset.id;
};

const changePageA = function (ev) {
  if (ev.target.closest("[data-number]") === null) return;

  if (ev.target.closest("[data-number]").dataset.number === "+1") {
    model.state.pageA = Number(model.state.pageA) + 1;
  } else if (ev.target.closest("[data-number]").dataset.number === "-1") {
    model.state.pageA = Number(model.state.pageA) - 1;
  } else {
    model.state.pageA = Number(
      ev.target.closest("[data-number]").dataset.number
    );
  }
  patients.renderPatients(model.state);
  patients.selectHash();
  pages.renderPages(model.state);
};

const submitPatientForm = async function (e) {
  e.preventDefault();
  if (window.location.hash.slice(1) === "") submitNewPatient();
  else submitEditPatient();
};

const submitNewPatient = async function () {
  let imgSrc = await helpers.uploadToCloudinary(
    patientForm.form.elements["img"].files
  );
  const data = [...patientForm.retrieveData(), imgSrc[0]];
  const newID = model.generatePatient(...data);
  location.hash = newID;
  patientForm.hideForm();
  patients.renderPatients(model.state);
  pages.renderPages(model.state);
};

const submitEditPatient = async function () {
  let imgSrc;
  if (
    patientForm.form.elements["img"].files[0].name !==
    model.state.activeA.imgSrc
  ) {
    imgSrc = await helpers.uploadToCloudinary(
      patientForm.form.elements["img"].files
    );
    console.log("changed pic");
  } else imgSrc = model.state.activeA.imgSrc;
  const data = [...patientForm.retrieveData(), imgSrc[0]];
  model.editPatient(...data);
  patientForm.hideForm();
  displayInfo();
  patients.renderPatients(model.state);
  pages.renderPages(model.state);
};

const displayInfo = function () {
  if (window.location.hash.slice(1) === "") {
    info.renderMessage();
    appointments.renderMessage(2);
    return;
  }
  model.state.activeA = model.patients.find(
    (p) => p.id === window.location.hash.slice(1)
  );
  if (model.state.activeA === undefined) return;
  model.state.activeB = model.state.activeC = 0;
  info.renderInfo(model.state.activeA);
  info.selectButtons(openAppointmentForm, editPatient, removePatient);
  appointments.renderAppointments(model.state.activeA.appointments, 0);
};

const openAppointmentForm = function () {
  appointmentForm.displayForm();
};

const editPatient = function () {
  patientForm.displayForm(model.state.activeA);
};

const removePatient = function () {
  model.removePatient();
  location.hash = "";
  model.queryPatients(header.getQuery());
  patients.renderPatients(model.state);
  pages.renderPages(model.state);
};

const submitAppointmentForm = async function (e) {
  e.preventDefault();
  const src = await helpers.uploadToCloudinary(
    appointmentForm.inputFiles.files
  );
  model.addAppointment([...appointmentForm.retrieveData(), src]);
  appointmentForm.hideForm();
  model.state.activeB = 0;
  appointments.renderAppointments(model.state.activeA.appointments, 0);
};

const changeAppointment = function (ev) {
  if (
    !ev.target.closest(".appointments_dates_el") ||
    model.state.activeB ===
      ev.target.closest(".appointments_dates_el").dataset.id
  )
    return;
  model.state.activeC = 0;
  model.state.activeB = ev.target.closest(".appointments_dates_el").dataset.id;
  appointments.datesElements.forEach((el) => {
    if (el.dataset.id === model.state.activeB) {
      el.classList.add("appointments_dates_el_selected");
    } else el.classList.remove("appointments_dates_el_selected");
  });
  appointments.renderDescription(
    model.state.activeA.appointments[model.state.activeB]
  );
  appointments.renderFile(
    model.state.activeA.appointments[model.state.activeB],
    model.state.activeC
  );
};

const changeFile = function (ev) {
  if (!ev.target.closest(".appointments_files_arrow")) return;
  if (ev.target.closest(".appointments_files_arrow-right")) {
    model.state.activeC += 1;
  } else if (ev.target.closest(".appointments_files_arrow-left")) {
    model.state.activeC -= 1;
  }
  appointments.renderFile(
    model.state.activeA.appointments[model.state.activeB],
    model.state.activeC
  );
};

const init = function () {
  header.listenQueries(loadPatients);
  patientForm.listenOpenForm(openPatientForm);
  patients.listenSelectedPatient(selectPatient);
  pages.listenButtons(changePageA);
  patientForm.listenSubmit(submitPatientForm);
  appointmentForm.listenSubmit(submitAppointmentForm);
  info.listenInfo(displayInfo);
  appointments.listenAppointmentsAndFiles(changeAppointment, changeFile);
};
init();
