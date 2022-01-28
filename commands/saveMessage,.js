const { ContextMenuCommandBuilder } = require('@discordjs/builders');
const { MessageContextMenuInteraction, Message, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName("Save")
        .setType(3),

    /**
     * @param {MessageContextMenuInteraction} interaction
     */
    async execute(interaction){
        console.log(this.data.toJSON());
        interaction.deferReply({ephemeral: true});

        /**@type {Message} */
        // @ts-ignore
        var msg = interaction.targetMessage;

        const emb = new MessageEmbed()
            .setAuthor({ name: msg.author.username, iconURL: msg.author.avatarURL(), url: msg.url})
            .setDescription("> "+msg.content.replace("\n", "\n> "))
            .setColor('#2f3136')
            .setTimestamp(msg.createdTimestamp);

        const row = new MessageActionRow()  
            .addComponents(
                new MessageButton()
                    .setCustomId('delete')
                    .setLabel('Delete')
                    .setStyle('DANGER')
            );
        
        interaction.user.send({embeds: [emb].concat(msg.embeds), components: [row]}).then( (message) => {
            if(msg.attachments.size > 0){
                interaction.user.send({files: Array.from(msg.attachments.values())});
            }
            interaction.editReply({content: "[Message saved](" + message.url + ")"});
        });
    },
};