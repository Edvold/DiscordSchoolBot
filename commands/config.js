fs = require('fs');

module.exports = {
    name: 'config',
    description: 'change config settings',
    commands: ['config', 'cfg', 'c', 'settings'],
    expectedArgs: '[name of config settings] [new value]',
    minArgs: 2,
    maxArgs: 2,
    callback: (message, args, text) => {
        config.edit(message, args);
    }
}

class Config {
    constructor() {
        this.file = 'config.json';
    }

    edit(message, args) {
        let json = JSON.parse(fs.readFileSync(this.file.toString()));

        for (const key in json) {
            if (args[0] === key) {
                json[key] = args[1];
            }
        }
        
        fs.writeFileSync(this.file, JSON.stringify(json));
    }
}

const config = new Config();