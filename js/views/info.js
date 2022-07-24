import View from "./View.js";
class info extends View {
  parentElement = document.querySelector(".info_data");
  buttons = document.querySelectorAll(".info_btn");

  selectButtons(generate, edit, remove) {
    this.buttons = document.querySelectorAll(".info_btn");
    this.buttons[0].addEventListener("click", generate);
    this.buttons[1].addEventListener("click", edit);
    this.buttons[2].addEventListener("click", remove);
  }

  listenSelectedPattient(f) {
    window.addEventListener("hashchange", f);
  }

  renderInfo(pattient) {
    this.clear();
    const markup = `<figure class="info_figure">
    <div class="info_border">
      <img
        class="info_pattient_image"
        src="${pattient.imgSrc}"
      />
    </div>
    <figcaption class="info_name">${pattient.name}</figcaption>
  </figure>

  <div class="info_fields">
    <div class="info_flex"> <div>Gender: ${
      pattient.gender
    }</div> <div>Age: ${Math.floor(
      new Date(new Date() - new Date(pattient.birthDay)) /
        (365 * 24 * 60 * 60 * 1000)
    )}</div></div>
    <div class="info_flex"><div>${pattient.email} </div><div>${
      pattient.number
    }</div></div>
    <div>Main reason: <br>${pattient.reason}</div>
    <div >Description: <br>${pattient.description}</div>
  </div>
  <button class="info_edit info_btn">
    <img src="./img/gear.png" class="info_btn_image" alt="" />
  </button>
  <button class="info_remove info_btn">
    <img src="./img/remove-user.png" class="info_btn_image" alt="" />
  </button>
  <button class="info_generate info_btn">
    <img src="./img/agenda.png" class="info_btn_image" alt="" />
  </button>`;
    this.parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}

export default new info();
