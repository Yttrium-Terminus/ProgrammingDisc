const { MessageEmbed } = require("discord.js");

module.exports = {
  config: {
    name: `help`,
    category: "",
    description: "",
    aliases: [``],
  },
  run: async (bot, message, args) => {
    try {
      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Commands List")
        .setDescription(
          "Here you will find all the commands.\n**Note:** Commands with the letter `i` infront followed by its programming lang means that command is used for whne programs need input"
        )
        .addField("C++", "```icpp, cpp```")
        .addField("Others", "```ping, help, tos, editor, info```")
        .setFooter("2021-2022");
      message.channel.send(embed);
    } catch (e) {
      console.log(e);
    }
  },
};
