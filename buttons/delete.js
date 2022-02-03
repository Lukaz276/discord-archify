const { ButtonInteraction, Message, TextChannel } = require("discord.js");
const { id } = require('../config.json');


module.exports = {
    customId : 'delete',

    /**
     * @param {ButtonInteraction} interaction 
     */
    async execute(interaction){
        /** @type {TextChannel} */
        // @ts-ignore
        var channel = await interaction.client.channels.fetch(interaction.channelId);
        var msg = await channel.messages.fetch(interaction.message.id);

        if(msg.deletable){
            await msg.delete();
            await interaction.reply({content: "Deleted saved message", ephemeral: true});
        }
        else{
            await interaction.reply({content: "Cannot delete this message", ephemeral: true});
        }
    },
};