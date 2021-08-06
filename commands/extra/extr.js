const { MessageEmbed } = require("discord.js");
const content = require('../../configs/content.json');

module.exports = {
  config: {
    name: `editor`,
    category: "",
    description: "",
    aliases: [`text`],
  },
  run: async (bot, message, args) => {
    try {
      var code = message.content.split(" ").slice(1);
      if(code == "INFO" || code == "info" || code == "help" || code == "HELP" || code == "?") {
        const embed = new MessageEmbed()
          .setTitle("Code Language Viewer")
          .setDescription(
            "This command helps you to view your code in the proper syntax and color. It can also add ``` or remove ``` from your code"
          )
          .addField(
            "Supported Languages [parameter]",
            "`c++`, `c`, `java`, `python`"
          )
          .addField(
            "Supported Fields [parameter]",
            "`add_ticks`, `remove_ticks`"
          )
          .addField("Usage", "```" + content.prefix + "editor [parameter]```")
          .addField(
            "Example Usage",
            "**INPUT**\n```" +
              content.prefix +
              "editor remove_ticks #include <iostream>\nusing namespace std;\nint main() {\n int a;\ncin >> a;\n cout << a << endl;\n}```"
          )
          .setColor("RANDOM")
          .setTimestamp();
          message.channel.send(embed);
      } else {
      /*
      if (code.slice(0, 3).join("") == "```" && code.slice(-3, code.length).join("") == "```") {
        message.channel.send("yes");
        code.shift(3);
        message.channel.send(code.join(" "));
      }
      */
      var codeStr = code.join(" ");
      //code = replaceAll(code, "```", "");
      //message.channel.send(code);
      if(codeStr.substring(0, 3) === '```' && codeStr.slice(-3) == '```')
        console.log("Found...");
        codeStr = codeStr.substring(3);
        codeStr = codeStr.slice(0, -3);
        message.channel.send(codeStr);
    }
    } catch (e) {
      console.log(e);
    }
    function replaceAll(str, obj, replaceWith) {
      return str.split(obj).join(replaceWith);
    }
  },
};


