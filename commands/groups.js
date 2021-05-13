const config = require('../config.json');

module.exports =  {
    name: 'groups',
    description: 'Automatically create groups',
    commands: ['group', 'groups', 'gm', 'gruppe', 'grupper'],
    expectedArgs: '[online] [students per group] OR [all] [students per group] OR [back]',
    minArgs: 1,
    maxArgs: 2,
    callback: (message, args, text) => {
        if (args[0] === 'online') {
            message.channel.send(group.groupHandler(message, true, args[1]));

        } else if (args[0] === 'all') {
            message.channel.send(group.groupHandler(message, false, args[1]));
        }  else if (args[0] === 'back') {
            group.retrieveStudents(message);
        } else {
            message.channel.send(`Uknown argument. Try either of the following arguments: ${module.exports.expectedArgs}`);
        }
    }
}

class GroupMaker {
    constructor() {
        this.groups = [];
        this.studentRole = config.studentRole;
        this.mainChannel = config.mainChannel;
    }

    groupHandler(message, onlyOnline, groupSize) {
        
        this.groups = [];

        if (onlyOnline === true) {
            // make groups only with students online for more short-term groups
            
            const students = message.guild.members.cache.filter(m => m.presence.status === "online");
            let onlineStudents = [];
            students.forEach(m => {
                if (m.roles.cache.some(role => role.id === this.studentRole)) {
                    onlineStudents.push(m);
                }
            });
            onlineStudents = onlineStudents.map(m => m.displayName);
            this.groupMaker(message, onlineStudents, groupSize);


        } else {
            // make groups with every student on server regardless of online or not for more long-term groups
            
            let students = message.guild.roles.cache.get(this.studentRole).members.map(m=>m.displayName);
            
            this.groupMaker(message, students, groupSize);
        }

        this.channelDeleter(message);
        this.channelMaker(message, this.groups.length);
        // need to wait for all channels to be created properly before populating them
        if (onlyOnline) setTimeout(() => this.sendToChannel(message, this.groups), 500);

        
        return this.groups;
    }

    groupMaker(message, students, groupSize) {

        const groupAmount = Math.floor(students.length / groupSize);
       
            if (groupAmount === 0) {
                // Teacher wants to create more groups than there are students
                message.author.send("Error: Not enough students to create the desired amount of groups");
                return;
            }

            for (let i = 0; i<groupAmount; i++) {
                let tempArray = [];
                // creates random groups
                for (let j = 0; j<groupSize; j++) {
                    const index = Math.floor(Math.random()*students.length);
                    tempArray.push(students[index]);
                    
                    students.splice(index, 1);
                }
                this.groups.push(tempArray);
            }
            // if there are still students left then add them to groups
            if (students.length !== 0) {
                for (let i = 0; i<students.length; i++) {
                    this.groups[i].push(students[i]);
                }
            }
    }

    channelMaker(message, groupAmount) {
        // creates a discord channel for each group
        const category = message.guild.channels.cache.find(c => c.name === 'GRUPPER' && c.type === 'category');
        for (let i = 0; i<groupAmount; i++) {
            message.guild.channels.create(`Group ${i+1}`, {type: 'voice', topic: 'groupwork', parent: category.id});
        }
        
    }

    channelDeleter(message) {
        // deletes all group work channels
        const channels = message.guild.channels.cache
        channels.forEach(c => {
            if (c.name.startsWith("Group")) {
                c.delete();
            }
        })
    }

    sendToChannel(message, groups) {
        // finds every member of each group and sends them to the correct channel
        groups.forEach(g => {
            g.forEach(m => {
                message.guild.members.cache.forEach(member => {
                    if (member.displayName === m) {
                        const index = groups.indexOf(g) + 1;
                        message.guild.channels.cache.forEach(c => {
                            if (c.name === `Group ${index}`) {
                                member.voice.setChannel(c);
                            }
                        }); 
                    }
                });
            }); 
        });
    }

    retrieveStudents(message) {
        // get all students back to the main channel
        const students = message.guild.members.cache.filter(m => m.presence.status === "online");
            let onlineStudents = [];
            students.forEach(m => {
                if (m.roles.cache.some(role => role.id === this.studentRole)) {
                    onlineStudents.push(m);
                }
            });

            onlineStudents.forEach(s => {
                s.voice.setChannel(this.mainChannel);
            })
    }
}

const group = new GroupMaker();