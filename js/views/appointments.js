import View from "./View.js";

class appointments extends View {
  parentElement = document.querySelector(".appointments");
  dates;
  description;
  files;
  datesElements;
  img;
  message;
  arrows;

  constructor() {
    super();
  }

  listenAppointmentsAndFiles(f, g) {
    this.parentElement.addEventListener("click", (e) => {
      f(e);
      g(e);
    });
  }

  renderMessage(a) {
    const message =
      a === 2
        ? "Select a pattient to show appointments"
        : "This patient has no appointments yet <br> create one";
    const markup = `<div class="appointments_message"">${message}
    
    </div>`;
    this.parentElement.insertAdjacentHTML("afterbegin", markup);
    this.message = document.querySelector(".appointments_message");
  }

  renderAppointments(appointments) {
    this.clear(this.parentElement);
    if (appointments[0] === undefined) {
      this.renderMessage();
      return;
    }
    this.renderContainers();
    this.renderDates(appointments, 0);
    this.renderDescription(appointments[0]);
    this.renderFile(appointments[0], 0);
  }

  renderDates(appointments, active) {
    this.clear(this.dates);
    let markup = "";
    appointments.forEach(function (ap, i) {
      markup += `<li class="appointments_dates_el ${
        i === active ? "appointments_dates_el_selected" : ""
      }" data-id="${i}">${ap.date}</li>`;
    });
    this.dates.insertAdjacentHTML("beforeend", markup);
    this.datesElements = document.querySelectorAll(".appointments_dates_el");
  }

  renderDescription(appointment) {
    this.clear(this.description);
    const markup = `<div>${appointment.condition}</div><div>${appointment.prescription}</div><div>${appointment.comments}</div>`;
    this.description.insertAdjacentHTML("beforeend", markup);
  }

  async renderFile(appointment, activeC) {
    if (this.img && appointment.files.includes(this.img.src)) {
      this.arrows.forEach((arrow) => {
        arrow.style.display = "none";
      });
      await this.fade(this.img, true);
    }
    console.log(activeC);
    console.log(appointment.files.length);
    console.log(appointment.files);
    console.log(activeC + 1 === appointment.files.length);
    this.clear(this.files);
    const markup = `
    ${
      activeC === 0
        ? ""
        : `<input id="arrow-left" name="arrow" type="checkbox" class="appointments_files_checkbox appointments_files_checkbox-left">
      <label for="arrow-left" class="appointments_files_arrow appointments_files_arrow-left">&#x1F844</label>`
    }
    
    ${
      activeC + 1 === appointment.files.length
        ? ""
        : `<input id="arrow-right" name="arrow" type="checkbox" class="appointments_files_checkbox appointments_files_checkbox-right">
      <label for="arrow-right" class="appointments_files_arrow appointments_files_arrow-right">&#x1F846</label>`
    }
    <img
    class="appointments_files_image" src="${appointment.files[activeC]}"
    alt=""
    />
    `;
    this.files.insertAdjacentHTML("beforeend", markup);
    this.arrows = document.querySelectorAll(".appointments_files_arrow");
    this.img = document.querySelector(".appointments_files_image");
  }

  renderContainers() {
    const markup = `<ul class="appointments_dates"></ul>
    <div class="appointments_description"></div>
    <div class="appointments_files"></div>`;
    this.parentElement.insertAdjacentHTML("beforeend", markup);
    this.dates = document.querySelector(".appointments_dates");
    this.description = document.querySelector(".appointments_description");
    this.files = document.querySelector(".appointments_files");
  }
}
export default new appointments();
