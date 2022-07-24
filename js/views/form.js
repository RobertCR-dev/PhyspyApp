import View from "./View.js";

class form extends View {
  formLayout = document.querySelector(".form");
  form = document.querySelector(".form_grid");
  submitButton = document.querySelector(".form_submit");
  cancelButton = document.querySelector(".form_cancel");
  backgroundBlur = document.querySelector(".background-blur");
  openButton = document.querySelector(".header_add_button");
  inputImg = document.querySelector("input[type='file']");
  display = document.querySelector(".form_img");
  deleteButton = document.querySelector(".form_delete");

  constructor() {
    super();
    this.listenCloseForm();
    this.displayImage();
    this.selectDelete();
  }

  listenOpenForm(f) {
    this.openButton.addEventListener("click", f);
  }

  listenSubmit(f) {
    this.formLayout.addEventListener("submit", f);
  }

  selectDelete() {
    this.deleteButton.addEventListener("click", this.deleteImage);
  }

  deleteImage() {
    this.removeImage();
    this.form.elements["img"].value = "";
  }

  removeImage() {
    const imageToRemove = document.querySelector(".form_img_display");
    if (imageToRemove === null) return;
    imageToRemove.parentNode.removeChild(imageToRemove);
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

  displayImage() {
    this.inputImg.addEventListener(
      "change",
      this.handleImage.bind(this),
      false
    );
  }

  async hideForm() {
    await Promise.allSettled([
      this.fade(this.formLayout, true),
      this.fade(this.backgroundBlur, true),
    ]);
    this.formLayout.classList.toggle("hide");
    this.backgroundBlur.classList.toggle("hide");
  }

  handleImage(files) {
    this.removeImage();
    const display = document.querySelector(".form_img");
    const file = this.inputImg.files[0];

    if (!file.type.startsWith("image/")) {
      return;
    }
    const img = document.createElement("img");
    img.classList.add("form_img_display");
    img.file = file;
    display.appendChild(img);

    const reader = new FileReader();
    reader.onload = (function (aImg) {
      return function (e) {
        aImg.src = e.target.result;
      };
    })(img);
    reader.readAsDataURL(file);
  }
}

export default new form();
