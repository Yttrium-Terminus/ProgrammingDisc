var JSCPP = require("JSCPP");
var tio = require('tio.js');

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
      let p = await tio(t, 'python3');
      message.channel.send("Cont : " + t.join(" ")).cleanContent;
      message.channel.send("Cont2: " + p.output);
    } catch (e) {
      console.log(e);
    }
  },
};
