const io = require('@pm2/io');
const {Client} = require('discord.js');

module.exports = {
  name: 'ready',
  once: true,
  /**
   * @param {Client} client
   */
  async execute(client) {
    console.log(`Logged in as ${client.user.tag}`);
    console.log((await client.guilds.fetch()).map((guild) => guild.name));

    setInterval(async function () {
      console.log('Guilds: ' + client.guilds.cache.size);
      console.log((await client.guilds.fetch()).map((guild) => guild.name));
    }, 3600000);
  },
};
