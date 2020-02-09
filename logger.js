const colors = require("colors");

class Logger {
  constructor(levels = [{}]) {
    this.levels = [
      { name: "error", color: "red" },
      { name: "warning", color: "yellow" },
      { name: "info" },
      { name: "success", color: "green" },
      { name: "debug", color: "cyan" },
      ...levels
    ];

    this.levels.forEach(level => {
      Object.defineProperty(this, level.name, {
        value: message => console.log(this.format(level, message))
      });
    });
  }

  format(level, message) {
    message = `${new Date()} [${level.name.toUpperCase()}] ${message}`;
    if (!level.color) level.color = "blue";
    var output = colors[level.color](message);

    return output;
  }
}

module.exports = Logger;
