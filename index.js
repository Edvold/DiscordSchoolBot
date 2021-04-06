const Discord = require('discord.js');

const client = new Discord.Client();

const config = require('./config.json')

const path = require('path');

const fs = require('fs');

client.commands = new Discord.Collection();

client.on('ready', () => {
    console.log('Schoolbot is online');

    const handlerName = 'commandHandler.js';
    const commandHandler = require(`./commands/${handlerName}`);
    function readCommands(dir) {
        const files = fs.readdirSync(path.join(__dirname, dir));
        for (file of files) {
            if (file !== handlerName) {
                const option = require(path.join(__dirname, dir, file));
                commandHandler(client, option);
            }
        }
    }

    readCommands('commands');
});

/*
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
        if (message.member.roles.cache.has('811920217377865738')) {
            client.commands.get('groups').execute(message, args);
        } else {
            message.author.send("You are not allowed to use this command!");
        }
    } else if (command === 'absence') {
        client.commands.get('absence').execute(message);
    } else if (command === 'questions') {
        client.commands.get('questions').execute(message, args);
    }
    
});*/



client.login(config.token);