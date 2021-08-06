var compiler = require("compilex");
var tio = require("tio.js");
var options = { stats: true };
compiler.init(options);

module.exports = {
  config: {
    name: `cpp`,
    category: "",
    description: "",
    aliases: [`c++`, `gcc`, `g++`, `cpluplus`],
  },
  run: async (bot, message, args) => {
    var code = message.content.split(" ").slice(1);
    var linterX = { OS: "windows", cmd: "g++", options: { timeout: 10000 } };
    message.reply(
      "Type in your input: (Type `ex$!` for no input or type `tr$!` to quit) **10 SECOND LIMIT**"
    );
    message.channel
      .awaitMessages((m) => m.author.id == message.author.id, {
        max: 1,
        time: 10000,
      })
      .then((collected) => {
        if (collected.first().content.toLowerCase() == "ex$!") {
          message.channel.send("**NO INPUT**");
          compiler.compileCPP(
            linterX,
            code.join(" "),
            function (data) {
              if (data.error) {
                message.channel.send(
                  "**An Error Occured!**\n```" + data.error + "```"
                );
                console.log(data.error);
              } else {
                console.log(data.output);
                message.channel.send(JSON.parse(JSON.stringify(data.output)));
              }
            }
          );
        } else if (collected.first().content.toLowerCase() == "tr$!") {
          message.channel.send(
            "Operation Terminated by " + message.author.username
          );
        } else {
          compiler.compileCPPWithInput(
            linterX, code.join(" "), collected.toString(), function (data) {
              if (data.error) {
                message.channel.send(
                  "**An Error Occured!**\n```" + data.error + "```"
                );
                console.log(data.error);
              } else {
                console.log(data.output);
                message.channel.send(JSON.parse(JSON.stringify(data.output)));
              }
            }
          );
        }
      })
      .catch(() => {
        message.reply("Operation Cancelled automatically after 10 seconds");
      });
  },
};
