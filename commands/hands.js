module.exports = {
    name: 'hands',
    description: "Raise your hands!",
    execute(message, args) {

        switch(args[0]) {
            case 'raise':
                // tries to raise hands
                let succes = handsClass.raiseHand(message.member.displayName) === "succes" ? true : false;
                if (!succes) {
                    message.author.send("Your hands is already raised");
                } else if (succes) {
                    message.author.send("Succesfully raised your hand");
                }
                
                return;

            case 'lower':
                // if student then lower their hand if teacher lower either specific hand or all hands. The number is the teacher role
                if (message.member.roles.cache.has('809395555062906880')) {
                    //checks if the teacher has given a name or not
                    if (args[1] != undefined) {
                        handsClass.lowerHand(args[1]);
                    
                    } else {
                        handsClass.lowerHand();
                    }
                } else {
                    let succes = handsClass.lowerHand(message.member.displayName) === "succes" ? true : false;
                    if(!succes) {
                        message.author.send("You can only lower your hand if it is raised")
                    } else if (succes) {
                        message.author.send("Succesfully lowered your hand");
                    }
                }
                return;

            case 'get':
                // Can only be executed by teacher role
                if (message.member.roles.cache.has('809395555062906880')) {
                    message.channel.send(handsClass.returnHands());
                } else {
                    message.author.send("You don't have permission to use this command");
                }
                
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
        return 'succes'
    }

    lowerHand(name = "") {
        // checks if person has their hand raised

        if (name === "") {
            this.hands = [];
            return;
        }

        let index = this.hands.indexOf(name);
        if (index < 0) {
            // give error message
            return 'error'; 
        }
        this.hands.splice(index, 1);
        return 'succes'
    }

    returnHands() {
        if (this.hands.length === 0) {
            return "Nobody has raised their hand";
        }

        return this.hands;
    }

}

const handsClass = new Hands();