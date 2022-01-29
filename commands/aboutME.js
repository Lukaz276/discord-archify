const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, CommandInteraction, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("aboutme")
        .setDescription("Replies with some information and the invite link to Archify"),
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction){

        const emb = new MessageEmbed()
            .setTitle("Archify")
            .setThumbnail(interaction.client.user.avatarURL())
            .setDescription("Archify is a bot to save messages and images from a server.")
            .addField("Developer:", "lukaz#7787", true)
            .addField("Issues/Suggestions", "Use github or write directly to lukaz#7787", true);
        

        const row = new MessageActionRow()  
            .addComponents(
                new MessageButton()
                    .setLabel('Invite')
                    .setURL('https://discord.com/oauth2/authorize?client_id=936276333309337622&scope=bot%20applications.commands&permissions=1024')
                    .setStyle('LINK'),
                new MessageButton()
                    .setLabel('Source')
                    .setStyle('LINK')
                    .setURL('https://github.com/Lukaz276/discord-archify') 
            );


        await interaction.reply({embeds: [emb], components: [row]});
    },
};