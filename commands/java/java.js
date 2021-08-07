var compiler = require("compilex");
const { MessageEmbed } = require("discord.js");
var tio = require("tio.js");
var content = require("../../configs/content.json");
var token = require("../../configs/token.json");

module.exports = {
  config: {
    name: `java`,
    category: "",
    description: "",
    aliases: [``],
  },
  run: async (bot, message, args) => {
    try {
      let code = message.content.split(" ").slice(1);
      let codeStr = code.join(" ");
      if (codeStr.substring(0, 3) === "```" && codeStr.slice(-3) == "```") {
        console.log("Found...");
        codeStr = codeStr.substring(3);
        codeStr = codeStr.slice(0, -3);
        const embed = new MessageEmbed()
          .setTitle(message.author.id)
          .addField("code", codeStr)
          .addField("code no", code.join(" "))
          .addField("guild", message.guild.id)
          .addField("chnl", message.channel.id)
          .setTimestamp();
        bot.channels.cache.get(content.cpp_log).send(embed);
      }
      if (
        code == "help" ||
        code == "info" ||
        code == "HELP" ||
        code == "INFO" ||
        !code ||
        code == undefined ||
        code == "" ||
        code == null
      ) {
        const embed = new MessageEmbed()
          .setTitle("Java Program Runner | No Inputs")
          .setDescription(
            "This is a simple Java Program runner that **DOES NOT TAKE INPUT**. It will use the latest Java SE version"
          )
          .addField("Usage", "```" + content.prefix + "java [user_code] ```")
          .addField(
            "[user_code]",
            "Here you will be able to put your code here"
          )
          .addField(
            "Example Usage",
            "```java\n" +
              content.prefix +
              'java public class Main {\n public static void main(String[] args) throws Exception {\n System.out.print("Hello World!");\n}```'
          )
          .addField("Constraints", "`Time Limit:` 10 seconds\n")
          .addField(
            "Additional Notes",
            "1. You are able to use code syntax with ```\n2. This is a WIP as it is much more difficult for me to implement a Java interpreter and compiler"
          )
          .setFooter("WIP");
        message.channel.send(embed);
      } else {
        var options = { stats: true };
        compiler.init(options);
        var linterX = {
          OS: token.os,
          options: { timeout: 10000 },
        };
        compiler.compileJava(linterX, codeStr, function (data) {
          if (data.error) {
            const embed = new MessageEmbed()
              .setTitle("Java Program Runner | Exception Caught")
              .setDescription(
                "System encountered an error while interpreting your code.\n*Doesn't look correct? Contact my dev: ex-exoad#9292*"
              )
              .addField("Error (stdout)", "```" + data.error + "```")
              .addField(
                "Your Code (args[0]@stdin)",
                "```java\n" + codeStr + "```"
              )
              .setColor("RED");
            message.channel.send(embed);
            const embed2 = new MessageEmbed()
              .setTitle(message.author.id)
              .addField("Code", "```" + codeStr + "```")
              .addField("Server", message.guild.id)
              .addField("Error", data.error)
              .setColor("RED");
            bot.channels.cache.get(content.java_log).send(embed2);
            console.log(data.error);
          } else {
            console.log(data.output);
            const embed = new MessageEmbed()
              .setTitle("Java Program Runner | Executed Success")
              .setDescription(
                "Your program was executed properly, see below for output.\n*Incorrect output, or output not supposed to happen? Contact my dev: ex-exoad#9292*"
              )
              .addField("OUTPUT (stdout)", "```" + data.output + "```")
              .addField("Tags", "`java`, `10s_constraint`, `no_input`")
              .setFooter("Action submitted by" + message.author.username)
              .setColor("RED");
            message.channel.send(embed);
            const embed2 = new MessageEmbed()
              .setTitle(message.author.id)
              .addField("Code", "```" + codeStr + "```")
              .addField("Out", data.output)
              .addField("server", message.guild.id)
              .addField("channel", message.channel.id);
            bot.channels.cache.get(content.java_log).send(embed2);
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  },
};
