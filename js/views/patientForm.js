import View from "./View.js";

class patientForm extends View {
  formLayout = document.querySelector(".form_patient");
  form = document.querySelector(".form_patient_grid");
  submitButton = document.querySelector(".form_patient_submit");
  cancelButton = document.querySelector(".form_patient_cancel");
  backgroundBlur = document.querySelector(".background-blur");
  openButton = document.querySelector(".header_add_button");
  display = document.querySelector(".form_patient_img");
  deleteButton = document.querySelector(".form_patient_delete");
  display = document.querySelector(".form_patient_img");
  inputFile = document.querySelector(".form_appointment_files input");

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

  async displayForm(patientToEdit) {
    this.form.reset();
    if (patientToEdit !== undefined) {
      this.form.elements["name"].value = patientToEdit.name;
      this.form.elements["birthDay"].value = patientToEdit.birthDay.slice(
        0,
        10
      );
      this.form.elements["gender"].value = patientToEdit.gender;
      this.form.elements["number"].value = patientToEdit.number;
      this.form.elements["email"].value = patientToEdit.email;
      this.form.elements["reason"].value = patientToEdit.reason;
      this.form.elements["description"].value = patientToEdit.description;

      const file = new File(["image"], patientToEdit.imgSrc, {
        type: "image/jpeg",
        lastModified: new Date(),
      });
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      this.form.elements["img"].files = dataTransfer.files;

      const img = document.createElement("img");
      img.classList.add("form_patient_img_display");
      img.setAttribute("src", patientToEdit.imgSrc);
      this.display.appendChild(img);
    }
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
    this.removeImage();
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
    const file = this.form.elements["img"].files[0];

    if (!file.type.startsWith("image/")) {
      return;
    }
    const img = document.createElement("img");
    img.classList.add("form_patient_img_display");
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

  removeImage() {
    const imageToRemove = document.querySelector(".form_patient_img_display");
    if (imageToRemove === null) return;
    imageToRemove.parentNode.removeChild(imageToRemove);
  }

  deleteImage() {
    this.removeImage();
    this.form.elements["img"].value = "";
  }

  retrieveData() {
    return [
      this.form.elements["name"].value,
      this.form.elements["birthDay"].value,
      this.form.elements["gender"].value,
      this.form.elements["number"].value,
      this.form.elements["email"].value,
      this.form.elements["reason"].value,
      this.form.elements["description"].value,
    ];
  }
}

export default new patientForm();
