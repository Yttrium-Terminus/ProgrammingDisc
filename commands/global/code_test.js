var JSCPP = require("JSCPP");
var tio = require("tio.js");

module.exports = {
  config: {
    name: `code`,
    category: "",
    description: "",
    aliases: [``],
  },
  run: async (bot, message, args) => {
    try {
      var code = message.content.split(" ").slice(1);
      JSCPP.run(code.join(" "));
    } catch (error) {
      if (error) {
        message.channel.send("Check your code.");
      } else {
        message.channel.send(
          "Enter your input within the next 10 seconds (Type `ex!` to exit): "
        );
        message.channel
          .awaitMessages((m) => m.author.id == message.author.id, {
            max: 1,
            time: 10000,
          })
          .then((collected) => {
            if (collected.first().content.toLowerCase() == "ex!")
              message.channel.send(
                "Operation Timeout by `" + message.author.username + "`"
              );
            else
              message.channel.send(
                JSCPP.run(code.join(" "), collected, config) + " " + output
              );
          })
          .catch(() => {
            message.reply("No answer after 10 seconds, operation canceled.");
          });
        var output = "";
        var config = {
          stdio: {
            write: function (s) {
              output += s;
            },
          },
          unsigned_overflow: "error", // can be "error"(default), "warn" or "ignore"
        };
      }
    }
  },
};
