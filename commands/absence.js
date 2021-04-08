const config = require('../config.json')

module.exports = {
    name: 'absence',
    description: 'returns all offline students',
    commands: ['absence', 'fravær', 'absent'],
    permissions: ['ADMINISTRATOR'],
    
    callback: (message, args, text) => {
        const absentStudents = absence.checkAbsence(message);
        if (absentStudents.length > 0) {
            message.channel.send(absentStudents);
        } else {
            message.channel.send('There are no absent students today');
        }
        
    }
}

class Absence {

    constructor() {
        this.studentRole = config.studentRole;
    }

    checkAbsence(message) {
        // returns all offline students
        const students = message.guild.members.cache.filter(m => m.presence.status === "offline");
        let offlineStudents = [];
        students.forEach(m => {
            if (m.roles.cache.some(role => role.id === this.studentRole)) {
                offlineStudents.push(m);
            }
        });
        return offlineStudents;

    }

}

const absence = new Absence();