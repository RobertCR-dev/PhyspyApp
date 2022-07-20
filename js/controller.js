import popUp from "./views/popUp.js";
import from from "./views/form.js";
import result from "./views/result.js";
import * as model from "./model.js";

const input = document.querySelector("input[type='file']");
input.addEventListener("change", handleFiles, false);

function handleFiles(files) {
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
