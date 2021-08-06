module.exports = {
  config: {
    name: `ping`,
    category: "",
    description: "",
    aliases: [``],
  },
  run: async (bot, message, args) => {
    try {
      message.channel.send(
        "Latency: " + (Date.now() - message.createdTimestamp) + "ms"
      );
      message.channel.send("API Latency: " + Math.round(bot.ws.ping) + "ms");
    } catch (e) {
      console.log(e);
    }
  },
};
