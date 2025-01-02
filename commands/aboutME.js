const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("aboutme")
        .setDescription("Replies with some information and the invite link to Archify"),
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction){

        const emb = new EmbedBuilder()
            .setTitle("Archify")
            .setThumbnail(interaction.client.user.avatarURL())
            .setDescription("Archify is a bot to save messages and images sent server.")
            .addFields([
                {name: "Developer", value:"zelythia", inline: true},
                {name: "Issues/Suggestions", value:"[GitHub](https://github.com/zelythia/discord-archify/issues) or [Twitter](https://twitter.com/zelythia)", inline: true},
            ]);

        const row = new ActionRowBuilder()  
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Invite')
                    .setURL('https://discord.com/oauth2/authorize?client_id=936276333309337622')
                    .setStyle(ButtonStyle.Link),
                new ButtonBuilder()
                    .setLabel('Source')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://github.com/zelythia/discord-archify') 
            );


        await interaction.reply({embeds: [emb], components: [row]});
    },
};