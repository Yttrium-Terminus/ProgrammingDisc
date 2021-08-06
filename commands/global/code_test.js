var compiler = require("compilex");
const { MessageEmbed } = require("discord.js");
var tio = require("tio.js");
var options = { stats: true };
compiler.init(options);
var content = require('../../configs/content.json')

module.exports = {
  config: {
    name: `cpp`,
    category: "",
    description: "",
    aliases: [`c++`],
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
          .setTitle("C++ Runner withOUT Input")
          .setDescription(
            "This is a basic C++ interpreter that **does not take input**)"
          )
          .addField("Usage", "```" + content.prefix + "cpp [user_code_here]```")
          .addField(
            "user_code_here",
            "You will input your C++ Code here or command parameters like this one (see [additional_usages])"
          )
          .addField(
            "Example Usage",
            "**COMMAND**\n```cpp\n$icpp #include <iostream>\nusing namespace std;\nint main() {\n int a;\ncin >> a;\n cout << a << endl;\n}```\n**OUTPUT**\n`Hello World!`"
          )
          .addField("Additional parameters", "None, this does not take inputs")
          .addField(
            "Constraints",
            "Do to security reasons, the runtime constraint for non-input programs will be 10 seconds, if your program runs longer, it will be automatically killed"
          )
          .addField("[additional_usages]", "`help`")
          .setFooter("Pre-build");
        message.channel.send(embed);
      } else {
        var linterX = {
          OS: "windows",
          cmd: "g++",
          options: { timeout: 10000 },
        };
        compiler.compileCPP(linterX, code.join(" "), function (data) {
          if (data.error) {
            const embed = new MessageEmbed()
            .setTitle("C++ Program Runner Exception")
            .setDescription("Your program had an error! *Not supposed to happen? Contact my developer: `ex-exoad#9292`")
            .addField("Error", "```"+data.error+"```")
            .setColor("RED")
            message.reply(embed);
            const embed2 = new MessageEmbed()
            .setTitle(message.author.id)
            .addField("Code", "```"+code.join(" ")+"```")
            .addField("Server", message.guild.id)
            .addField("Error", data.error)
            .setColor("RED")
            bot.channels.cache.get(content.cpp_log).send(embed2);
            console.log(data.error);
          } else {
            console.log(data.output);
            const embed = new MessageEmbed()
            .setTitle("C++ Program Runner Results")
            .setDescription("See anomalies in the output or its an incorrect output? Contact my developer: `ex-exoad#9292`")
            .addField("Output", "```"+data.output+"```")
            .addField("Tags", "`cpp`, `no_input`, `10s_constraint`")
            .setFooter("Action submitted by " + message.author.username)
            .setColor("GREEN")
            
            message.reply(embed);
            const embed2 = new MessageEmbed()
              .setTitle(message.author.id)
              .addField("Code", "```" + code.join(" ") + "```")
              .addField("Out", data.output)
              .addField("server", message.guild.id)
              .addField("channel", message.channel.id);
            bot.channels.cache.get(content.cpp_log).send(embed2);
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  },
};
