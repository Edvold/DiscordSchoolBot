const config = require('../config.json')
module.exports = {
    name: 'mute',
    description: 'Mute students',
    commands: ['mute', 'silence', 'm', 'dæmp', 'unmute', 'um', 'udæmp'],
    expectedArgs: '(student)',
    minArgs: 0,
    maxArgs: 1,
    permissions: ['ADMINISTRATOR'],
    callback: (message, args, text) => {

        const messageArr = message.content.split(' ');
        const firstWord = messageArr[0].substring(1);

        if (firstWord === 'mute' || firstWord === 'silence' || firstWord === 'm' || firstWord === 'dæmp') {
            muteClass.mute(message, args[0]);
        } else if (firstWord === 'unmute' || firstWord === 'um' || firstWord === 'udæmp') {
            muteClass.unmute(message, args[0]);
        } else {
            message.channel.send(`Uknown argument. Try either of the following arguments: ${this.expectedArgs}`);
        }
    }
}

class Mute {

    constructor() {
        this.mutedPersons = [];
        this.studentRole = config.studentRole;
    }

    mute(message, name = "") {

        const elevRole = message.guild.roles.cache.find(role => role.name === 'Elev');
        const muteRole = message.guild.roles.cache.find(role => role.name === 'Mute');

        if (name === "") {
            // changes role of either all students or a specific one to mute role
            this.mutedPersons = message.guild.roles.cache.get(this.studentRole).members.map(m=>message.guild.members.cache.get(m.id));

            this.mutedPersons.forEach((member) => {
                member.roles.remove(elevRole);
                member.roles.add(muteRole);
            })

        } else {
            const student = message.guild.members.cache.find(user => user.displayName === name);
            this.mutedPersons.push(student);
            student.roles.remove(elevRole);
            student.roles.add(muteRole);

        }
    }

    unmute(message, name = "") {
        // changes role of either all students or a specific one to non-mute (student) role 
        const elevRole = message.guild.roles.cache.find(role => role.name === 'Elev');
        const muteRole = message.guild.roles.cache.find(role => role.name === 'Mute');

        if (name === "") {
            //remove everybody from array
            this.mutedPersons.forEach((member) => {
                member.roles.remove(muteRole);
                member.roles.add(elevRole);
            })

            this.mutedPersons = [];

        } else {
            // remove name from array
            const student = message.guild.members.cache.find(user => user.displayName === name);
            const index = this.mutedPersons.indexOf(student)
            if (index >= 1) {
                this.mutedPersons = this.mutedPersons.slice(0,index) + this.mutedPersons.slice(index+1);
            } else if (index === 0) {
                this.mutedPersons = this.mutedPersons.slice(1);
            }
            student.roles.remove(muteRole);
            student.roles.add(elevRole);

        }
    }

}

const muteClass = new Mute();