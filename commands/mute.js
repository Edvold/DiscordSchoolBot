module.exports = {
    name: 'mute',
    description: 'Mute students',
    execute(message, args, mute) {
        if (mute === true) {
            muteClass.mute(message, args[0]);
        } else {
            muteClass.unmute(message, args[0]);
        }
    }

}

class Mute {

    constructor() {
        this.mutedPersons = [];
        this.studentRole = '811920245563719681';
    }

    mute(message, name = "") {

        const elevRole = message.guild.roles.cache.find(role => role.name === 'Elev');
        const muteRole = message.guild.roles.cache.find(role => role.name === 'Mute');

        if (name === "") {
            // find all students and put them in array
            this.mutedPersons = message.guild.roles.cache.get(this.studentRole).members.map(m=>message.guild.members.cache.get(m.id));

            this.mutedPersons.forEach((member) => {
                member.roles.remove(elevRole);
                member.roles.add(muteRole);
            })

        } else {
            const student = message.guild.members.cache.find(user => user.displayName === name);
            console.log(typeof this.mutedPersons);
            this.mutedPersons.push(student);
            student.roles.remove(elevRole);
            student.roles.add(muteRole);

        }
    }

    unmute(message, name = "") {

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