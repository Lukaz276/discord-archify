const { ContextMenuCommandBuilder } = require('@discordjs/builders');
const { MessageContextMenuInteraction, Message, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName("Save")
        .setType(3),

    /**
     * @param {MessageContextMenuInteraction} interaction
     */
    async execute(interaction){
        await interaction.deferReply({ephemeral: true});

        /**@type {Message} */
        // @ts-ignore
        var msg = interaction.targetMessage;

        const emb = new MessageEmbed()
            .setAuthor({ name: msg.author.username, iconURL: msg.author.avatarURL(), url: msg.url})
            .setDescription((msg.content.length > 0)? "> "+msg.content.replace("\n", "\n> "): "")
            .setColor('#2f3136')
            .setTimestamp(msg.createdTimestamp);

        const row = new MessageActionRow()  
            .addComponents(
                new MessageButton()
                    .setCustomId('delete')
                    .setLabel('Delete')
                    .setStyle('DANGER')
            );
        
                
        await interaction.user.send({embeds: [emb].concat(msg.embeds), files: Array.from(msg.attachments.values()), components: [row]}).then( (message) => {
            interaction.editReply({content: "[Message saved](" + message.url + ")"});
        });
    },
};