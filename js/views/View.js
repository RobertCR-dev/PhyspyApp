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
          out && (opacity -= 0.01);
          out || (opacity += 0.01);
          element.style.opacity = opacity;
          if (opacity < 0) e("");
        }, i);
      }
    });
  }
}
