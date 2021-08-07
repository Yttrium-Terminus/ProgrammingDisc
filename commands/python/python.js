var compiler = require("compilex");
const { MessageEmbed } = require("discord.js");
var tio = require("tio.js");
var content = require("../../configs/content.json");
var token = require("../../configs/token.json");

module.exports = {
  config: {
    name: `python`,
    category: "",
    description: "",
    aliases: [`py`],
  },
  run: async (bot, message, args) => {
    try {
      let code = message.content.split(" ").slice(1);
      let codeStr = code.join(" ");
      
    } catch (e) {
      console.log(e);
    }
  },
};
