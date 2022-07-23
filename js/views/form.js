import View from "./View.js";

class form extends View {
  form = document.querySelector(".form");
  submitButton = document.querySelector(".form_submit");
  cancelButton = document.querySelector(".form_cancel");
  backgroundBlur = document.querySelector(".background-blur");
  openButton = document.querySelector(".header_add_button");
  input = document.querySelector("input[type='file']");
  display = document.querySelector(".form_img");

  constructor() {
    super();
    this.openForm();
    this.closeForm();
    this.displayImage();
    // this.submitForm();
  }

  openForm() {
    this.openButton.addEventListener("click", this.displayForm.bind(this));
  }

  async displayForm() {
    this.form.classList.toggle("hide");
    this.backgroundBlur.classList.toggle("hide");
    await Promise.allSettled([
      this.fade(this.form, false),
      this.fade(this.backgroundBlur, false),
    ]);
  }

  closeForm() {
    this.cancelButton.addEventListener("click", this.hideForm.bind(this));
  }

  displayImage() {
    this.input.addEventListener("change", this.handleFiles, false);
  }

  async hideForm() {
    console.log("clicked");
    await Promise.allSettled([
      this.fade(this.form, true),
      this.fade(this.backgroundBlur, true),
    ]);
    this.form.classList.toggle("hide");
    this.backgroundBlur.classList.toggle("hide");
  }

  handleFiles(files) {
    console.log("changed");
    const display = document.querySelector(".form_img");
    const file = this.files[0];

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
