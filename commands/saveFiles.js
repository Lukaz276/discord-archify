const { ContextMenuCommandBuilder } = require('@discordjs/builders');
// @ts-ignore
const { MessageContextMenuInteraction, Message, Collection, MessageAttachment, MessageEmbed } = require('discord.js');

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName("Save Files")
        .setType(3),

    /**
     * @param {MessageContextMenuInteraction} interaction
     */
    async execute(interaction){
        interaction.deferReply({ ephemeral: true });

        /**@type {Message} */
        // @ts-ignore
        var msg = interaction.targetMessage;

        var emb = new MessageEmbed()
            .setAuthor({ name: msg.author.username+":", iconURL: msg.author.avatarURL(), url: msg.url})
            .setColor('#2f3136')
            .setTimestamp(msg.createdTimestamp);
            
        interaction.user.send({embeds: [emb].concat(msg.embeds)}).then( (message) => {
            interaction.user.send({files: Array.from(msg.attachments.values())});
            interaction.editReply({content: "[Message saved](" + message.url + ")"});
        });
        
    },
};