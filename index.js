const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '!';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Schoolbot is online');
});

client.on('message', message =>{
    if (!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }

    const args = message.content.slice(prefix.length).split(" ");
    const command = args.shift().toLowerCase();

    if (command === 'hands') {
        client.commands.get('hands').execute(message, args);
    } else if (command === 'mute' || command === 'unmute') {
        // only the teacher can use these commmands
        if (message.member.roles.cache.has('811920217377865738')) {
            if (command === 'mute') {
                client.commands.get('mute').execute(message, args, true);
            } else {
                client.commands.get('mute').execute(message, args, false);
            }
        } else {
            message.author.send("You are not allowed to use this command!");
        }
    } else if (command === 'groups') {
        client.commands.get('groups').execute(message, args);
    }
    

})



client.login('ODAzNTM3NTUwMTczMjc0MTUz.YA_OqA.05MAfZnZVuNYV7UKR3uQbNciEQY');