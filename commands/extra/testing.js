var compiler = require("compilex");
const { MessageEmbed } = require("discord.js");
var tio = require("tio.js");

const content = require("../../configs/content.json");

module.exports = {
  config: {
    name: `tst`,
    category: "",
    description: "",
    aliases: [``],
  },
  run: async (bot, message, args) => {
    try {
      let filter = (m) => m.author.id === message.author.id;
      
      var c = message.content.split(" ").slice(1);
      var codeStr = c.join(" ");
      if (codeStr.substring(0, 3) === "```" && codeStr.slice(-3) == "```") {
        console.log("Found...");
        codeStr = codeStr.substring(3);
        codeStr = codeStr.slice(0, -3);
      }
      var options = { stats: true };
      compiler.init(options);
      var linterX = {
        OS: "windows",
        cmd: "g++",
        options: { timeout: 15000 },
      };
      message.channel.send("Enter val: ").then(() => {
        message.channel
          .awaitMessages(filter, {
            max: 1,
            time: 10000,
            errors: ["time"],
          })
          .then((message) => {
            message = message.first();
            compiler.compileCPPWithInput(linterX, codeStr, message.toString(), function(data) {
              const embed = new MessageEmbed()
              .setTitle("C++ Program Runner (with inputs) | Success!")
              .setDescription("Your program was executed properly!\n*Is this not correct and is an anomaly? Contact my developer: ex-exoad#9292`")
              .addField("OUTPUT (stdout)", "```"+data.output+"```")
              .addField("Input(s) (stdin)", "```"+message.toString()+"```")
              .addField("Tags", "`15s_constraint`,`c++`,`withinput`")
              .setColor("GREEN")
              .setFooter("Action submitted by " + message.author.username)
              message.channel.send(embed);
            })
          })
          .catch((collected) => {
            message.channel.send("Operation Cancelled after 10 seconds");
          });
      });
    } catch (e) {
      console.log(e);
    }
  },
};
