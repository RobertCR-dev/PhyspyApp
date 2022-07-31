import View from "./View.js";

class pages extends View {
  parentElement = document.querySelector(".patients_navigation");
  buttons;

  constructor() {
    super();
  }

  listenButtons(f) {
    this.parentElement.addEventListener("click", f);
  }

  renderPages({ activePatients, pageA }) {
    this.clear(this.parentElement);
    const pages = Math.ceil(activePatients.length / 6);
    this.parentElement.innerHTML = `<div class="patients_pages"></div>`;
    this.buttons = document.querySelector(".patients_pages");
    for (let i = 1; i <= pages; i++) {
      this.renderButton(i, pageA);
    }
    if (pageA !== pages) this.renderRight();
    if (pageA !== 1) this.renderLeft();
  }

  renderButton(i, page) {
    const markUp = `<button data-number=${i} class="patients_pages_button ${
      i === page ? "patients_pages_button patients_pages_button_selected" : ""
    }"></button>`;
    this.buttons.insertAdjacentHTML("beforeend", markUp);
  }

  renderRight() {
    const markUp = `<button data-number="+1" ><img class="patients_arrow" src="img/log-out.png" alt="" /></button>`;
    document
      .querySelector(".patients_navigation")
      .insertAdjacentHTML("beforeend", markUp);
  }

  renderLeft() {
    const markUp = `<button data-number="-1"><img class="patients_arrow" src="img/log-in.png" alt="" /></button>`;
    document
      .querySelector(".patients_navigation")
      .insertAdjacentHTML("afterbegin", markUp);
  }
}
export default new pages();
