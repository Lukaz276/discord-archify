const {Client} = require('discord.js');

module.exports = {
  name: 'ready',
  once: true,
  /**
   * @param {Client} client
   */
  async execute(client) {
    console.log(`Logged in as ${client.user.tag}`);

    let test = client.users.cache.filter(user => user.bot == false).size

    console.log("Guilds: " + client.guilds.cache.size);
    console.log("Users: " + client.users.cache.filter(user => user.bot == false).size);

    setInterval(function () {
      console.log("Guilds: " + client.guilds.cache.size);
      console.log("Users: " + client.users.cache.filter(user => user.bot == false).size);
    }, 86400000); //daily
  },
};
