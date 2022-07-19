export default class View {
  _parentElement;

  render(data) {
    this.parentElement.insertHTML(generateMarkUp);
  }

  fade(element, out) {
    return new Promise((e) => {
      let opacity = getComputedStyle(element).opacity;
      for (let i = 0; i < 1000; i += 10) {
        setTimeout(() => {
          opacity = Number(opacity);
          out && (opacity -= 0.01);
          !out && (opacity += 0.01);
          element.style.opacity = opacity;
          if (out & (opacity <= 0)) e("");
          if (!out & (opacity >= 1)) e("");
        }, i);
      }
    });
  }
}
