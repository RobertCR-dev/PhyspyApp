import View from "./View.js";

class patients extends View {
  parentElement = document.querySelector(".patients_result");
  childElements;

  constructor() {
    super();
    this.listenHash();
  }

  selectHash() {
    const hash = window.location.hash.slice(1);
    this.childElements = document.querySelectorAll(".patients_result_item");
    this.childElements.forEach(function (el) {
      if (el.dataset.id === hash)
        el.classList.add("patients_result_item_selected");
      else el.classList.remove("patients_result_item_selected");
    });
  }

  listenHash() {
    window.addEventListener("hashchange", this.selectHash);
  }

  listenSelectedPatient(f) {
    this.parentElement.addEventListener("click", f);
  }

  renderPatients({ activePatients, pageA }) {
    this.clear(this.parentElement);
    const pagePatients = activePatients.slice(pageA * 6 - 6, pageA * 6);
    pagePatients.forEach((patient) => {
      this.renderPatient(patient);
    });
    this.selectHash();
  }

  renderPatient(patient) {
    const markup = `<li class="patients_result_item" data-id=${patient.id}>
    <img
      class="patients_image"
      src="${patient.imgSrc}"
      alt=""
    />
    <div class="patients_name">${patient.name}</div>`;
    this.parentElement.insertAdjacentHTML("beforeend", markup);
  }
}
export default new patients();
