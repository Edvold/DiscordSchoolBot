const config = require('../config.json');

module.exports = {
    name: 'schedule',
    description: 'send notifications to students when lesson is about to start',
    commands: ['schedule', 'skema', 'sch', 'sk'],
    expectedArgs: '[add] [hour] [minute] [day] [month] [year]',
    minArgs: 6,
    maxArgs: 6,
    permissions: ['ADMINISTRATOR'],
    callback: (message, args, text) => {
        if (args[0] === 'add') {
            schedule.addDate(message, args);
        }
    }
}

class Schedule {
    
    constructor() {
        this.studentRole = config.studentRole;
        this.notificationTime = 5;
    }

    addDate(message, args) {

        // notification is 5 minutes before lesson
        const date = new Date(args[5], args[4]-1, args[3], args[1], args[2]-this.notificationTime);
        const time = date - Date.now();
        setTimeout(this.sendNotification, time, message, this.studentRole);
        message.channel.send('Successfully created a new lesson');
    }

    sendNotification(message, studentRole) {        
        message.guild.roles.cache.get(studentRole).members.forEach((student) => {
            student.user.send('Get ready! You have lessons in 5 minutes');
        }); 
        
    }
}

const schedule = new Schedule;