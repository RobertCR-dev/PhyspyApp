import View from "./View.js";

class form extends View {
  form = document.querySelector(".form");
  submitButton = document.querySelector(".form_submit");
  cancelButton = document.querySelector(".form_cancel");
  backgroundBlur = document.querySelector(".background-blur");
  openButton = document.querySelector(".header_add_button");

  constructor() {
    super();
    // this.cancelForm();
    this.openForm();
    this.closeForm();
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

  async hideForm() {
    console.log("clicked");
    await Promise.allSettled([
      this.fade(this.form, true),
      this.fade(this.backgroundBlur, true),
    ]);
    this.form.classList.toggle("hide");
    this.backgroundBlur.classList.toggle("hide");
  }

  // async closeForm() {
  //   await Promise.allSettled([
  //     this.fade(this.form, true),
  //     this.fade(this.backgroundBlur, true),
  //   ]);
  //   this.form.classList.toggle("hide");
  //   this.backgroundBlur.classList.toggle("hide");
  // }

  // cancelForm() {
  //   this.cancelButton.addEventListener("click", this.closeForm.bind(this));
  // }

  // submitForm() {
  //   this.submitButton.addEventListener("click", function (e) {
  //     e.preventDefault();
  //     console.log("You clicked ", submitButton);
  //   });
  // }
}
export default new form();
