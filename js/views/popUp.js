import View from "./View.js";
class popUp extends View {
  backgroundBlur = document.querySelector(".background-blur");
  welcome = document.querySelector(".welcome");
  button = document.querySelector(".welcome_button");

  constructor() {
    super();
    this.acceptWelcome();
  }

  async hideWelcome() {
    await Promise.allSettled([
      this.fade(this.welcome, true),
      this.fade(this.backgroundBlur, true),
    ]);

    this.welcome.classList.toggle("hide");
    this.backgroundBlur.classList.toggle("hide");
  }

  acceptWelcome() {
    this.button.addEventListener("click", this.hideWelcome.bind(this));
  }
}
export default new popUp();
