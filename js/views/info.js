import View from "./View.js";
class info extends View {
  parentElement = document.querySelector(".info_data");

  listenSelectedPattient(f) {
    window.addEventListener("hashchange", f);
  }

  renderInfo(pattient) {
    console.log(pattient);
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
    <div>${pattient.gender} ${pattient.birthDay}</div>
    <div>${pattient.email} ${pattient.number}</div>
    <div>${pattient.reason}</div>
    <div>${pattient.description}</div>
  </div>
  <button class="info_edit">
    <img src="./img/gear.png" class="info_btn_image" alt="" />
  </button>
  <button class="info_remove">
    <img src="./img/remove-user.png" class="info_btn_image" alt="" />
  </button>
  <button class="info_generate">
    <img src="./img/agenda.png" class="info_btn_image" alt="" />
  </button>`;
    this.parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}

export default new info();
