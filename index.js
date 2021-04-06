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

client.login(config.token);