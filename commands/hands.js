module.exports = {
    name: 'hands',
    description: "Raise your hands!",
    execute(message, args) {
        switch(args) {
            case 'raise':
                message.channel.send('You raised your hand');
                return;
            case 'lower':
                message.channel.send('You lowered your hand');
                return;
        }
        
    }
}