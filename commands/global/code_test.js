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
    var linterX = { OS: "windows", cmd: "g++", options: { timeout: 20000 } };
    message.reply(
      "**Input?**\nType `yes` for input or `no` for no input and `exit` to exit **10 SECOND LIMIT**"
    );
    message.channel
      .awaitMessages((m) => m.author.id == message.author.id, {
        max: 1,
        time: 10000,
      })
      .then((collected) => {
        if (
          collected.first().content.toLowerCase() == "no" ||
          collected.first().content.toLowerCase() == "n" ||
          collected.first().content.toLowerCase() == "NO" ||
          collected.first().content.toLowerCase() == "No" ||
          collected.first().content.toLowerCase() == "N"
        ) {
          message.channel.send("**NO INPUT**");
          compiler.compileCPP(linterX, code.join(" "), function (data) {
            if (data.error) {
              message.channel.send(
                "**An Error Occured!**\n```" + data.error + "```"
              );
              console.log(data.error);
            } else {
              console.log(data.output);
              message.channel.send(data.output);
            }
          });
        } else if (
          collected.first().content.toLowerCase() == "exit" ||
          collected.first().content.toLowerCase() == "quit" ||
          collected.first().content.toLowerCase() == "terminate"
        ) {
          message.channel.send(
            "Operation Terminated by " + message.author.username
          );
        } else if (
          collected.first().content.toLowerCase() == "yes" ||
          collected.first().content.toLowerCase() == "y" ||
          collected.first().content.toLowerCase() == "Y" ||
          collected.first().content.toLowerCase() == "YES" ||
          collected.first().content.toLowerCase() == "Yes"
        ) {
          message.channel
            .awaitMessages((m) => m.author.id == message.author.id, {
              max: 1,
              time: 10000,
            })
            .then((prt) => {
              compiler.compileCPPWithInput(
                linterX,
                code.join(" "),
                prt.toString(),
                function (data) {
                  if (data.error) {
                    message.channel.send(
                      "**An Error Occured!**\n```log\n" + data.error + "```"
                    );
                    console.log(data.error);
                  } else {
                    console.log(data.output);
                    message.channel.send(
                      JSON.parse(JSON.stringify(data.output))
                    );
                  }
                }
              );
            })
            .catch(() => {
              message.reply("Operation Cancelled after 10 seconds");
            });
        }
      })
      .catch((err) => {
        message.reply("Operation Cancelled automatically after 10 seconds");
        console.error(err);
      });
  },
};
