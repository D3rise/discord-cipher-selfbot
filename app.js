const Discord = require("discord.js");
const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const Logger = require("./logger");
const Morse = require("./morse");
const caesar = require("./caesar");
const vigenere = require("./vigenere");
require("dotenv").config();

const morse = new Morse();
const adapter = new FileSync("db.json");
const db = lowdb(adapter);
const client = new Discord.Client();
const logger = new Logger();

db.defaults({ mode: "none", secret: "secret", shift: 3 }).write();

client.on("ready", () => {
  logger.success(
    `Logged in as ${client.user.username}#${client.user.discriminator}`
  );
});

client.on("message", message => {
  if (message.author.id !== client.user.id) return;
  if (message.content.startsWith(process.env.PREFIX + "mode")) {
    const result = changeMode(
      message.content
        .replace(process.env.PREFIX + "mode")
        .replace("undefined", "")
        .trim()
    );
    if (result !== undefined) return message.delete();
    return message.edit("success").then(message => {
      setTimeout(() => message.delete(), 1000);
    });
  }

  if (message.content.startsWith(process.env.PREFIX + "key")) {
    db.set(
      "secret",
      message.content
        .replace(process.env.PREFIX + "key")
        .replace("undefined", "")
        .trim()
    ).write();
    return message.edit("success").then(message => {
      setTimeout(() => message.delete(), 1000);
    });
  }

  if (message.content.startsWith(process.env.PREFIX + "shift")) {
    const num = Number(
      message.content
        .replace(process.env.PREFIX + "shift")
        .replace("undefined", "")
        .trim()
    );

    if (isNaN(num))
      return message.edit("error: shift must be a number").then(() => {
        setTimeout(message.delete, 1500);
      });

    db.set("shift", num).write();
    return message.edit("success").then(message => {
      setTimeout(() => message.delete(), 1000);
    });
  }

  handleMessage(message);
});

function changeMode(mode) {
  if (
    mode.toLowerCase() !== "none" &&
    mode.toLowerCase() !== "morse" &&
    mode.toLowerCase() !== "caesar" &&
    mode.toLowerCase() !== "multi" &&
    mode.toLowerCase() !== "vigenere"
  )
    return false;
  db.set("mode", mode.toLowerCase()).write();
}

function handleMessage(message) {
  switch (db.get("mode").value()) {
    case "none":
      return;
    case "morse":
      {
        message.edit(morse.encode(message.content));
      }
      break;

    case "caesar":
      {
        message.edit(caesar.encode(message.content, db.get("shift").value()));
      }
      break;

    case "multi":
      {
        message.edit(
          morse.encode(caesar.encode(message.content, db.get("shift").value()))
        );
      }
      break;

    case "vigenere": {
      message.edit(vigenere.encode(message.content, db.get("secret").value()));
    }
  }
}

client.login(process.env.TOKEN);
