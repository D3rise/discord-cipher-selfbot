const map = require("./assets/morse");

const markup = {
  dot: ".",
  dash: "-",
  space: " ",
  sentanceSpace: "/"
};

class Morse {
  encode(text) {
    return text
      .toUpperCase()
      .split("")
      .filter(letter => letter in map)
      .map(letter => this.letterToMarkup(map[letter]).join(""))
      .join(this.byLetter());
  }

  decode(code) {
    return code
      .split(this.byWord())
      .map(encoded => this.getWordFromMarkup(encoded))
      .join(" ");
  }

  byWord() {
    return markup.sentanceSpace;
  }

  byLetter() {
    return markup.space;
  }

  getMarkup(letter) {
    return letter
      .toString(2)
      .split("")
      .slice(1, -1);
  }

  getWordFromMarkup(code) {
    return code
      .split(this.byLetter())
      .filter(String)
      .map(letter => this.letterFromMarkup(letter))
      .join("");
  }

  getLetter(code) {
    return Object.keys(map).find(
      letter => map[letter].toString(2) === `1${code}1`
    );
  }

  letterToMarkup(letter) {
    return !letter
      ? [this.byWord()]
      : this.getMarkup(letter).map(point =>
          point === "1" ? markup.dot : markup.dash
        );
  }

  letterFromMarkup(code) {
    return this.getLetter(
      code
        .split("")
        .map(ch => ch === markup.dot)
        .map(Number)
        .join("")
    );
  }
}

module.exports = Morse;
