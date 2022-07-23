import View from "./View.js";

class pattients extends View {
  parentElement = document.querySelector(".pattients_result");
  childElements;

  constructor() {
    super();
    this.listenHash();
  }

  selectHash() {
    const hash = window.location.hash.slice(1);
    this.childElements = document.querySelectorAll(".pattients_result_item");
    this.childElements.forEach(function (el) {
      if (el.dataset.id === hash)
        el.classList.add("pattients_result_item_selected");
      else el.classList.remove("pattients_result_item_selected");
    });
  }

  listenHash() {
    window.addEventListener("hashchange", this.selectHash);
  }

  listenSelectedPattient(f) {
    this.parentElement.addEventListener("click", f);
  }

  renderPattients({ activePattients, page }) {
    this.clear();
    const pagePattients = activePattients.slice(page * 6 - 6, page * 6);
    pagePattients.forEach((pattient) => {
      this.renderPattient(pattient);
    });
    this.selectHash();
  }

  renderPattient(pattient) {
    const markup = `<li class="pattients_result_item" data-id=${pattient.id}>
    <img
      class="pattients_image"
      src="${pattient.imgSrc}"
      alt=""
    />
    <div class="pattients_name">${pattient.name}</div>`;
    this.parentElement.insertAdjacentHTML("beforeend", markup);
  }
}
export default new pattients();
