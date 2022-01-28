const { ContextMenuCommandBuilder, SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction, TextChannel } = require('discord.js');
const { id } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unsave")
        .setDescription("Deletes a saved message in the DM's")
        .addStringOption(option => (
            option.setName('message')
                .setDescription("The link to the message you want to delete.")
                .setRequired(true))
        ),

    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction){

        if(!interaction.options.getString('message').includes('@me')){
            await interaction.reply({content: "You can only delete messages inside the DM", ephemeral: true});
            return;
        }

        var msg_id = interaction.options.getString('message');
        msg_id = msg_id.substring(msg_id.lastIndexOf('/')+1);

        var dm_id = interaction.options.getString('message');
        dm_id = dm_id.substring(dm_id.indexOf('@me/')+4, dm_id.lastIndexOf('/'));

        try{
            /**@type {TextChannel} */
            // @ts-ignore
            var channel = await interaction.client.channels.fetch(dm_id);

            try {
                var msg = await channel.messages.fetch(msg_id);

                if(msg.deletable){
                    await msg.delete();
                    await interaction.reply({content: "Deleted saved message", ephemeral: true});
                }
                else{
                    await interaction.reply({content: "Cannot delete this message", ephemeral: true});
                }
                
            } catch{
                await interaction.reply({content: "Something went wrong while getting the message", ephemeral: true});
            }
        }
        catch{
            await interaction.reply({content: "Something went wrong while getting the channel", ephemeral: true});
        }        
    },
};