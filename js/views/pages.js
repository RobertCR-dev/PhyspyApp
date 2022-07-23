import View from "./View.js";

class pages extends View {
  parentElement = document.querySelector(".pattients_navigation");
  buttons;

  constructor() {
    super();
  }

  listenButtons(f) {
    this.parentElement.addEventListener("click", f);
  }

  renderPages({ activePattients, page }) {
    this.clear();
    const pages = Math.ceil(activePattients.length / 6);
    this.parentElement.innerHTML = `<div class="pattients_pages"></div>`;
    this.buttons = document.querySelector(".pattients_pages");
    for (let i = 1; i <= pages; i++) {
      this.renderButton(i, page);
    }
    if (page !== pages) this.renderRight();
    if (page !== 1) this.renderLeft();
  }

  renderButton(i, page) {
    const markUp = `<button data-number=${i} class="pattients_pages_button ${
      i === page ? "pattients_pages_button pattients_pages_button_selected" : ""
    }"></button>`;
    this.buttons.insertAdjacentHTML("beforeend", markUp);
  }

  renderRight() {
    const markUp = `<button data-number="+1" ><img class="pattients_arrow" src="img/log-out.png" alt="" /></button>`;
    document
      .querySelector(".pattients_navigation")
      .insertAdjacentHTML("beforeend", markUp);
  }

  renderLeft() {
    const markUp = `<button data-number="-1"><img class="pattients_arrow" src="img/log-in.png" alt="" /></button>`;
    document
      .querySelector(".pattients_navigation")
      .insertAdjacentHTML("afterbegin", markUp);
  }
}
export default new pages();
