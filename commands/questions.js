module.exports = {
    name: 'questions',
    description: 'Make and read written questions',
    commands: ['question', 'questions', 'quest', 'q', 'spørgsmål'],
    expectedArgs: '[add] OR [get] (all)',
    minArgs: 1,
    
    callback: (message, args, text) => {
        if (args[0] === 'add') {
            questions.add(text)
        } else if (args[0] === 'get') {
            if (questions.questions.length === 0) return message.author.send('There are no questions at the moment');
            if (args[1] === 'all') return message.channel.send(questions.get(true));
            message.channel.send(questions.get(false));
        }
    }
}

class Questions {
    
    constructor() {
        this.questions = [];
    }

    add(text) {
        text = text.substring(4);
        this.questions.push(text);


    }

    get(all) {
        if (all) {
            const array = this.questions;
            this.questions = [];
            return array;
        }

        const index = Math.floor(Math.random()*this.questions.length);
        const question = this.questions[index];
        this.questions.splice(index, 1);
        return question;
    }


}

const questions = new Questions();