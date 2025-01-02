const { ContextMenuCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, MessageContextMenuCommandInteraction, ApplicationCommandType, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName("Save")
        .setType(ApplicationCommandType.Message)
        .setIntegrationTypes(0,1)
        .setContexts(0,1,2), //https://discord.com/developers/docs/interactions/application-commands#interaction-contexts
    

    /**
     * @param {MessageContextMenuCommandInteraction} interaction
     */
    async execute(interaction){
        await interaction.deferReply({ephemeral: true});

        var msg = interaction.targetMessage;

        let newAttachments = Array.from(msg.attachments.values())

        const emb = new EmbedBuilder()
            .setAuthor({ name: msg.author.displayName , iconURL: msg.author.avatarURL(), url: msg.url})
            .setDescription((msg.content.length > 0)? "> "+msg.content.replace("\n", "\n> ") : null)
            .setColor('#2f3136')
            .setURL(msg.url)
            .setTimestamp(msg.createdTimestamp);

        if(msg.content.startsWith("```") && msg.content.endsWith("```")){
            emb.setDescription(msg.content)
        }

        if(interaction.inCachedGuild()){
            emb.setFooter({text: interaction.guild.name + ": " +  interaction.channel?.name, iconURL: interaction.guild.iconURL()})
        }

        const row = new ActionRowBuilder()  
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Message')
                    .setURL(msg.url)
                    .setStyle(ButtonStyle.Link),
                new ButtonBuilder()
                    .setCustomId('delete')
                    .setLabel('Delete')
                    .setStyle(ButtonStyle.Danger),
            );
        
                
        await interaction.user.send({embeds: [emb].concat(msg.embeds), files: newAttachments, components: [row]}).then( (message) => {
            interaction.editReply({content: "[Message saved](" + message.url + ")"});
        });
    },
};