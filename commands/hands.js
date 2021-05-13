const config = require('../config.json');

module.exports = {
    name: 'hands',
    description: 'Raise your hands!',
    commands: ['hands', 'hand', 'hånd', 'hænder'],
    expectedArgs: '[raise] or [lower] (name) or [get]',
    minArgs: 1,
    maxArgs: 2,
    callback: (message, args, text) => {
        switch(args[0]) {
            case 'raise':
                // tries to raise hands
                let succes = handsClass.raiseHand(message.member.displayName) === "success" ? true : false;
                if (!succes) {
                    message.author.send("Your hand is already raised");
                } else {
                    message.author.send("Succesfully raised your hand");
                }
                
                return;

            case 'lower':
                // if student then lower their hand if teacher lower either specific hand or all hands. The number is the teacher role
                if (message.member.roles.cache.has(config.adminRole)) {
                    //checks if the teacher has given a name or not
                    if (args[1] != undefined) {
                        handsClass.lowerHand(args[1]);
                    
                    } else {
                        handsClass.lowerHand();
                    }
                } else {
                    let succes = handsClass.lowerHand(message.member.displayName) === "success" ? true : false;
                    if(!succes) {
                        message.author.send("You can only lower your hand if it is raised");
                    } else {
                        message.author.send("Succesfully lowered your hand");
                    }
                }
                return;

            case 'get':
                // Can only be executed by teacher role
                if (message.member.roles.cache.has(config.adminRole)) {
                    message.channel.send(handsClass.returnHands());
                } else {
                    message.author.send("You don't have permission to use this command");
                }
                break;

            default:
                message.channel.send(`Uknown argument. Try either of the following arguments: ${module.exports.expectedArgs}`);
                break;
                
        }
    }
}


class Hands {

    constructor() {
        this.hands = [];
    }

    raiseHand(name) {
        // checks if person already has raised their hand

        let index = this.hands.indexOf(name);
        if (!index > 0) {
            // give error message
            return 'error'; 
        }
        this.hands.push(name);
        return 'success'
    }

    lowerHand(name = "") {
        // checks if person has their hand raised

        if (name === "") {
            this.hands = [];
            return;
        }

        // index returns -1 if list doesn't contain name
        let index = this.hands.indexOf(name);
        if (index < 0) {
            // give error message
            return 'error'; 
        }
        this.hands.splice(index, 1);
        return 'success';
    }

    returnHands() {
        // returns everybody with their hands up
        if (this.hands.length === 0) {
            return "Nobody has raised their hand";
        }

        return this.hands;
    }

}

const handsClass = new Hands();