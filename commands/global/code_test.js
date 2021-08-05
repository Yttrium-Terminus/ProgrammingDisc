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
      let t = message.content.split(" ").slice(1);
      message.channel.send(t.join(" ")).cleanContent;
    } catch (e) {
      console.log(e);
    }
  },
};
