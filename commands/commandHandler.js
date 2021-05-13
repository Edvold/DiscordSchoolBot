const {prefix} = require('../config.json');

module.exports = (client, options) => {
    // retrieving contents of file
    let {
        commands,
        expectedArgs = '',
        minArgs = 0,
        maxArgs = null,
        permissions = '',
        permissionError = 'You don\'t have the required permissions to access this command.',
        callback
    } = options;
    

    //Convert commands to an array if string
    if (typeof commands === 'string') {
        commands = [commands];
    }
    
    client.on('message', message => {
        // message recieved

        // retrieving contents of message
        const {member, content, guild} = message;

        //check if command exists
        for (const alias of commands) {
            if(content.toLowerCase().startsWith(`${prefix}${alias.toLowerCase()}`)) {
                //A command has been triggered. Now check if user has permissions for command
                for (const permission of permissions) {
                    if (!member.hasPermission(permission)) return message.author.send(permissionError);
                }

                //split message into array with regex
                const args = content.split(/\s+/);

                //Remove the command
                args.splice(0, 1);

                //Check if we have the correct number of arguments
                if(args.length < minArgs || (maxArgs !== null && args.length > maxArgs)) {
                    message.channel.send(`That doesn\'t look right. Use ${prefix}${alias} ${expectedArgs}`)
                    return;
                }

                //run the command
                callback(message, args, args.join(' '))

                return;
            }
        }
    });
}