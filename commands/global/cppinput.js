var compiler = require("compilex");
const { MessageEmbed } = require("discord.js");
var tio = require("tio.js");
var options = { stats: true };
compiler.init(options);

const content = require("../../configs/content.json");

module.exports = {
  config: {
    name: `icpp`,
    category: "",
    description: "",
    aliases: [`inputcpp`, `inputc++`, `ic++`],
  },
  run: async (bot, message, args) => {
    try {
      var code = message.content.split(" ").slice(1);
      if (
        code == "INFO" ||
        code == "help" ||
        code == "info" ||
        code == "HELP" ||
        code == undefined ||
        !code
      ) {
        const embed = new MessageEmbed()
          .setTitle("C++ Runner with Input")
          .setDescription(
            "This is a basic C++ interpreter that **takes input**)"
          )
          .addField("Usage", "```" + content.prefix + "icpp [user_code_here]```")
          .addField(
            "user_code_here",
            "You will input your C++ Code here or command parameters like this one (see [additional_usages])"
          )
          .addField(
            "Example Usage",
            '**COMMAND**\n```cpp\n$icpp #include <iostream>\nusing namespace std;\nint main() {\n int a;\ncin >> a;\n cout << a << endl;\n}```\n**OUTPUT**\n`Hello World!`'
          )
          .addField(
            "Additional parameters",
            "After you have entered your code, you must specify your input, you will have 10 seconds to make a decision before your code will be invalidated. Then you must include your input in **ONE MESSAGE**"
          )
          .addField(
            "Constraints",
            "Do to security reasons, all program runtime constraints for with input will be 15 seconds, if your program runs longer, it will be automatically killed"
          )
          .addField("Additional Notes [PLEASE READ]", "It is best to run this command in the same channel as someone else!")
          .addField("[additional_usages]", "`help`")
          .setFooter("Pre-build");
        message.channel.send(embed);
      }
    } catch (e) {
      console.log(e);
    }
  },
};
