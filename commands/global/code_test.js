var JSCPP = require("JSCPP");

module.exports = {
  config: {
    name: `code`,
    category: "",
    description: "",
    aliases: [``],
  },
  run: async (bot, message, args) => {
    try {
      message.channel.send(message.content.split(" ").slice(1).join(" "));
    } catch (e) {
      console.log(e);
    }
  },
};
