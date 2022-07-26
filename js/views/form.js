import View from "./View.js";

class form extends View {
  formLayout = document.querySelector(".form_pattient");
  form = document.querySelector(".form_pattient_grid");
  submitButton = document.querySelector(".form_pattient_submit");
  cancelButton = document.querySelector(".form_pattient_cancel");
  backgroundBlur = document.querySelector(".background-blur");
  openButton = document.querySelector(".header_add_button");
  display = document.querySelector(".form_pattient_img");
  deleteButton = document.querySelector(".form_pattient_delete");

  constructor() {
    super();
    this.listenCloseForm();
    this.listenDisplayImage();
    this.listenSelectDelete();
  }

  listenOpenForm(f) {
    this.openButton.addEventListener("click", f);
  }

  listenSubmit(f) {
    this.formLayout.addEventListener("submit", f);
  }

  listenSelectDelete() {
    this.deleteButton.addEventListener("click", this.deleteImage.bind(this));
  }

  async displayForm() {
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

  async hideForm() {
    await Promise.allSettled([
      this.fade(this.formLayout, true),
      this.fade(this.backgroundBlur, true),
    ]);
    this.formLayout.classList.toggle("hide");
    this.backgroundBlur.classList.toggle("hide");
  }

  listenDisplayImage() {
    this.form.elements["img"].addEventListener(
      "change",
      this.handleImage.bind(this),
      false
    );
  }

  handleImage() {
    this.removeImage();
    const display = document.querySelector(".form_pattient_img");
    const file = this.form.elements["img"].files[0];

    if (!file.type.startsWith("image/")) {
      return;
    }
    const img = document.createElement("img");
    img.classList.add("form_pattient_img_display");
    img.file = file;
    display.appendChild(img);

    const reader = new FileReader();
    reader.onload = (function (aImg) {
      return function (e) {
        aImg.src = e.target.result;
      };
    })(img);
    reader.readAsDataURL(file);
    console.log(this.form.elements["img"].value);
  }

  removeImage() {
    const imageToRemove = document.querySelector(".form_pattient_img_display");
    if (imageToRemove === null) return;
    imageToRemove.parentNode.removeChild(imageToRemove);
  }

  deleteImage() {
    this.removeImage();
    this.form.elements["img"].value = "";
  }
}

export default new form();
