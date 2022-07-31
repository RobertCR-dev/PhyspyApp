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

  listenInfo(f) {
    ["load", "hashchange"].forEach((ev) => {
      window.addEventListener(ev, f);
    });
  }

  renderMessage(a) {
    this.clear(this.parentElement);
    const message =
      a === 2
        ? "Select a patient"
        : "<h4>Look for a patient</h4><h4>or upload a patient</h4>";
    const markup = `<div class="info_look">
    ${message}
    </div>`;
    this.parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderInfo(patient) {
    this.clear(this.parentElement);
    const markup = `<figure class="info_figure">
    <div class="info_border">
    <img
    class="info_patient_image"
    src="${patient.imgSrc}"
    />
    </div>
    <figcaption class="info_name">${patient.name}</figcaption>
    </figure>
    
    <div class="info_fields">
    <div class="info_flex"> <div>Gender: ${
      patient.gender
    }</div> <div>Age: ${Math.floor(
      new Date(new Date() - new Date(patient.birthDay)) /
        (365 * 24 * 60 * 60 * 1000)
    )}</div></div>
      <div  ><div>${patient.email}</div><div>${patient.number}</div></div>
      <div>Main reason: <br>${patient.reason}</div>
      <div >Description: <div class="info_text">${
        patient.description
      }</div></div>
      </div>
      <button class="info_generate info_btn">
      <img src="./img/agenda.png" class="info_btn_image" alt="" />
      </button>
      <button class="info_edit info_btn">
      <img src="./img/gear.png" class="info_btn_image" alt="" />
      </button>
      <button class="info_remove info_btn">
      <img src="./img/remove-user.png" class="info_btn_image" alt="" />
      </button>
      `;
    this.parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}

export default new info();
