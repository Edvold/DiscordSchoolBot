# Discord School Bot

Discod School Bot is designed to make Discord easier to use for teachers.  
Via a few easy-to-learn commands you can get the bot to do everything from automaticaly creating groups to checking absence.

## Features
 - Automatically create groups and creating group rooms for them
 - Check absence
 - Hands-system
 - Question-system
 - Mute disturbing students
 - Send notification to students a few minutes befor the start of a lesson
 
## Setup
 - Download the program
 - Download nodejs **[here](https://nodejs.org/en/download/)**
 - Create a Discord bot by following this **[guide](https://www.writebots.com/discord-bot-token)**  
 - Create three roles:
    - Teacher/Admin Role - All permissions enabled
    - Student Role - Basic permissions
    - Mute role - Like student role but no permissions to speak  

Add a file called *config.json* located in the root of the project  

The JSON file requires the following keys:
 - token
 - adminRole
 - studentRole
 - mainChannel
 - prefix
 
All values should be strings.  

 To get the ID's of the roles and channels do the following:
 - Go to Settings → Advanced Settings → Enable *Developer Mode*
 
To get role ID:
 - Go to server settings → roles → right-click on role → copy ID

To get channel ID:
- Right-click on main voice channel → copy ID

The prefix can be whatever the user desires. The recommended choice is '!'.

## Launch Bot
To turn on the bot do the following:
- Open commando prompt and navigate to the project folder
- Type *node index.js*
- Await the message *'Schoolbot is online'*
- The school bot is now running

## Commands

Square brackets, [], mean obligatory arugments  
Round brackets, (), mean optional arguments

Template:
'![command] (argument1) (argument2)'

### Absence
Returns a list of absent students

#### Commands
- 'absence', 'fravær', 'absent'

### Config
Change config settings

#### Commands
- 'config', 'cfg', 'c', 'settings'

#### Arguments
- [name of config setting] [new value]

### Groups
Make groups, create group rooms and automatically send students to their designated room.

#### Commands
- 'group', 'groups', 'gm', 'gruppe', 'grupper'  

#### Arguments
- [online] [students per group]
- [all] [students per group]
- [back]

### Hands
Let students raise their hands

#### Commands
- 'hands', 'hand', 'hånd', 'hænder'  

#### Arguments
- [raise]
- [lower] (name)
- [get]

### Mute
Mute students

#### Commands
- 'mute', 'silence', 'm', 'dæmp'
- 'unmute', 'um', 'udæmp'

#### Arguments
- (student)

### Questions
Enable students to ask questions

#### Commands
- 'question', 'questions', 'quest', 'q', 'spørgsmål'  

#### Arguments
- [add]
- [get] (all)

### Schedule
Send notification 5 minutes before the start of lesson

#### Commands
- schedule', 'skema', 'sch', 'sk'

#### Arguments
- [add] [hour] [minute] [day] [month] [year]
