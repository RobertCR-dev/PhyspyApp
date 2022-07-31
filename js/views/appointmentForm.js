import View from "./View.js";

class appointmentForm extends View {
  form = document.querySelector(".form_appointment_grid");
  formLayout = document.querySelector(".form_appointment");
  backgroundBlur = document.querySelector(".background-blur");
  cancelButton = document.querySelector(".form_appointment_cancel");
  inputFiles = document.querySelector(".form_appointment_files input");
  display = document.querySelector(".form_appointment_img");
  deleteButton = document.querySelector(".form_appointment_delete");

  constructor() {
    super();
    this.listenCloseForm();
    this.listenDisplayImage();
    this.listenSelectDelete();
  }

  listenSelectDelete() {
    this.deleteButton.addEventListener("click", this.deleteImage.bind(this));
  }
  deleteImage() {
    this.removeImage();
    this.form.elements["files"].value = "";
  }
  removeImage() {
    document.querySelector(".form_appointment_img") &&
      this.clear(document.querySelector(".form_appointment_img"));
  }

  async displayForm(appointmentToEdit) {
    this.form.reset();
    this.removeImage();
    this.formLayout.classList.toggle("hide");
    this.backgroundBlur.classList.toggle("hide");
    await Promise.allSettled([
      this.fade(this.formLayout, false),
      this.fade(this.backgroundBlur, false),
    ]);
  }

  listenCloseForm() {
    this.cancelButton.addEventListener("click", this.hideForm.bind(this));
  }

  listenSubmit(f) {
    this.form.addEventListener("submit", f);
  }

  async hideForm() {
    await Promise.allSettled([
      this.fade(this.formLayout, true),
      this.fade(this.backgroundBlur, true),
    ]);
    this.formLayout.classList.toggle("hide");
    this.backgroundBlur.classList.toggle("hide");
  }

  retrieveData() {
    return [
      this.form.elements["date"].value,
      this.form.elements["condition"].value,
      this.form.elements["prescription"].value,
      this.form.elements["comments"].value,
    ];
  }

  listenDisplayImage() {
    this.form.elements["files"].addEventListener(
      "change",
      this.handleImage.bind(this),
      false
    );
  }

  handleImage() {
    for (let i = 0; i < this.form.elements["files"].files.length; i++) {
      let file = this.form.elements["files"].files[i];
      if (!file.type.startsWith("image/")) {
        return;
      }
      let img = document.createElement("img");
      img.classList.add("form_appointment_img_display");
      img.file = file;
      this.display.appendChild(img);
      const reader = new FileReader();
      reader.onload = (function (aImg) {
        return function (e) {
          aImg.src = e.target.result;
        };
      })(img);
      reader.readAsDataURL(file);
    }

    // const file = this.form.elements["files"].files[0];
    // console.log(file);

    // if (!file.type.startsWith("image/")) {
    //   return;
    // }
    // const img = document.createElement("img");
    // img.classList.add("form_patient_img_display");
    // img.file = file;
    // this.display.appendChild(img);

    // const reader = new FileReader();
    // reader.onload = (function (aImg) {
    //   return function (e) {
    //     aImg.src = e.target.result;
    //   };
    // })(img);
    // reader.readAsDataURL(file);
  }
}
export default new appointmentForm();
