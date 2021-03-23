module.exports = {
    name: 'absence',
    description: 'returns all offline students',
    execute(message) {
        message.channel.send(absence.checkAbsence(message));
    }
}

class Absence {

    constructor() {
        this.studentRole = '811920245563719681';
    }

    checkAbsence(message) {
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