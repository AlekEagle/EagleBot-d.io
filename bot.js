const Discord = require('discord.io');
const logger = require('winston');
const u_wot_m8 = require('./.auth.json');
const auth = require('./auth.json');
const fs = require('fs');
const sys = require('sys');
const exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout) }
var cmdsRan = 0
var messagesRead = 0
const request = require('request');
const pmx = require('pmx').init({
    http : true,
    ignore_routes : [/socket\.io/, /notFound/],
    errors : true,
    custom_probes : true,
    network : true,
    ports : true
});
var prefix = 'a}'
var betaPrefix = '{}'
var timesCancerHasBeenCured = 0;
const creatorServerID = '456542159210807307';
const creatorID = '222882552472535041';
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10);
    var hours = Math.floor(sec_num /3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) {hours = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time = hours+':'+minutes+':'+seconds;
    return time;
}
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: u_wot_m8.token,
   autorun: true

});
function sleep(seconds = milliseconds * 1000) {seconds;}
bot.on('ready', function (evt) {
    bot.setPresence({
        game: {
            name: 'Prefix: ' + prefix,
        }
    });
    console.log('Connected');
    console.log('Logged in as: ');
    console.log(bot.username + ' - (' + bot.id + ')');
    sendAMessage('466276525759528960', 'Successfully launched!')
});
pmx.action('setplaying:text', function(param, reply) {
    console.log(param)
    bot.setPresence({
        game: {
            name: param
        }
    });
    reply({success : true});
});
function sendAMessage(ch, message) {
    bot.sendMessage({
        to: ch,
        message: message
    }, outputLog());
}
function sendFile(ch, file, filename) {
    bot.uploadFile({
        to: ch,
        file: file,
        filename: filename
    });
}
function outputLog(err, res) {
    if (err != undefined) {
        console.log(err);
    }
    if (res != undefined) {
        console.log(res);
    }
}
bot.on("guildCreate", function guildCreate() {
    request.post({
        headers: {
            "Authorization": u_wot_m8.dblToken,
        },
        url: `https://discordbots.org/api/bots/416274552126177282/stats`,
        json: true,
        body: {"server_count": Object.keys(bot.servers).length}
    }, function (err, resp, body) {
    });
});
bot.on("guildDelete", function guildDelete() {
    request.post({
        headers: {
            "Authorization": u_wot_m8.dblToken,
        },
        url: `https://discordbots.org/api/bots/416274552126177282/stats`,
        json: true,
        body: {"server_count": Object.keys(bot.servers).length}
    }, function (err, resp, body) {
    });
});
bot.on('message', function (user, userID, channelID, message, event) {
    messagesRead = ++messagesRead
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `a}`
    function retrieveServerID() {
    	var retrieveServerID = bot.channels[channelID].guild_id;
		//TO-DO: create function that returns serverID
		return retrieveServerID;
	}
	function delPrevMessage() {
		bot.deleteMessage({
        	channelID: channelID,
        	messageID: event.d.id
        });
    }
   
     if (message.substring(0, 2) == prefix && bot.users[userID].bot == false) {
        var args = message.substring(2).split(' ');
        var cmd = args[0];
       args = args.splice(1);
        switch(cmd) {
            case 'help':
                cmdsRan = ++cmdsRan
                bot.createDMChannel({
                    userID: userID
                });
                bot.addReaction({
                    channelID: channelID,
                    messageID: event.d.id,
                    reaction: '👍'
                })
                sendAMessage(userID, 'a}help: displays this\na}curecancer cures cancer! (sometimes)\na}say makes the bot say something\na}revivechat might revive chat, not 100% sure\na}deadchat engraves the fact that the chat is dead and nothing will change that\na}cancercured will show you how many times cancer has been cured\na}whatsnew shows what is new about the bot\na}config will help you configure the bot example: `a}config op-roles @role(s)`\na}touch is kinda kinky ex: `a}touch _____`\na}die will kill whoever you ping ex: `a}die @person`\na}succ is very gay ex: `a}succ _____`\na}meme has multiple arguements! to use this command, you are probably going to have to ask someone who added a meme to the list. the first arguement is savememe ex: `a}meme savememe (meme_name_substitute_spaces_with_dashes_or_underscores) (meme to store, to store pictures use the picture link)` arg 2: showmeme recalls meme ex: `a}meme showmeme (meme_name_substitute_spaces_with_dashes_or_underscores)` Arg 3: listmeme lists all da memes ex: `a}meme listmeme` NOTE: some memes are inside jokes and you will probably need to know about the server or what the meme is directed at.\na}invite will give you the link to invite the bot\na}anti-hack will activate my bot\'s anti hack measures NOTE: Don\'t spam it or i\'ll remove it!\na}emoji will change any sentence into emojis `a` `ab` and `o` will have their red counterparts!\na}info gives info about bot\na}uptime shows uptime of my computer and bot\na}ping will return the bots ping\na}reportbug will report a bug\na}suggestcmd will suggest a command\na}blowup will blow you up\na}vote will allow you to vote for me\na}yeet shall yeet you\na}dbl will show the bot\'s widget from discordbots.org (if it\'s on dbl)\na}avatar will show who ever you ping\'s avatar')
                sendAMessage(userID, 'To use These commands you **MUST** configure the bot to use them first:\na}del will delete the number of messages specified example: `a}del 10`\na}setnick will change a persons nickname example: `a}setnick @personguy nickname`\na}grantrole and }revokerole will give and remove someones role example: `a}grantrole(revokerole) @person @role` **YOU MUST BE ABLE TO PING THE ROLE TO GRANT IT**\na}qotd is a question of the day command example: `a}qotd #qotd_answer this is the qotd`\na}announcement is an announcement command example: `a}announcement #announcements this is the announcement`\na}ban will ban someone (kinda obvious) ex: `a}ban @person`\na}unban is }ban\'s counterpart ex: `a}unban userID` *Note: You will need to have developer mode on in the settings to get the userID I recommend to Google search for a tutorial*\na}kick kicks someone from the server ex: `a}kick @person`\na}mute }unmute }deafen and }undeafen are all commands to mute, unmute, deafen, and undeafen users in voice channels ex: `a}mute|unmute|deafen|undeafen @person`')
                bot.getMember({
                    serverID: retrieveServerID(),
                    userID: userID
                }, function(e, bb) {
                    console.log(bb);
                    console.log('Used help!');
                });
            break;
            case 'curecancer':
                cmdsRan = ++cmdsRan
                var rNG  = Math.floor(Math.random() * 100);
//                var rNG = 100;
                if (rNG < 99) {
                  sendAMessage(channelID, ':skull: During your quest to cure cancer, you died from, *Ironically*, cancer, nice try, just so you know, cancer is uncureable, or is it?')
                  console.log(rNG);
                  bot.getMember({
                    serverID: retrieveServerID(),
                    userID: userID
                }, function(e, bb) {
                    console.log(bb);
                    console.log('Used curecancer!');
                });
                }else {
                        sendAMessage(channelID, 'You somehow cured all types of cancer! <@' + userID + '> actually did it! *We all thought you were crazy*')
                    console.log(rNG);
                    fs.readFile('cancercured.txt', function(err, data) {
                        var string = data.toString('utf8')
                        var numForCancer = parseInt(string)
                        fs.writeFile('cancercured.txt', ++numForCancer)
                    })
                    bot.getMember({
                        serverID: retrieveServerID(),
                        userID: userID
                    }, function(e, bb) {
                        console.log(bb);
                        console.log('Used curecancer!');
                    });
                }
            break;
            case 'setnick':
                cmdsRan = ++cmdsRan
                bot.getMember({
                    serverID: retrieveServerID(),
                    userID: userID
                }, (e, aa) => {
                    fs.readFile('./allowed_roles/' + retrieveServerID() + '.settings', function(err, data) {
                        var string = data.toString('utf8').replace(/,/g, '; ');
                        var i = 0;
                        var y = 0;
                        var noPerm = false;
                        var stopLoop = false;
                        do {
                            if (string.includes(aa.roles[y]) == true && noPerm != true) {
                                var setnick = message.substring(1).split(' ');
                                var nickUserID = setnick[1];
                                nickUserID = nickUserID.replace(/<@/g, '').replace(/!/g, '').replace(/>/g, '');
                                var nickToSetTo = message.split(' ').splice(2).join(' ');
                                stopLoop = true;
                		        delPrevMessage();
                                bot.getMember({
                                    serverID: retrieveServerID(),
                                    userID: nickUserID
                                }, function(e, bb) {
                                    bot.editNickname({
                                        serverID: retrieveServerID(),
                                        userID: nickUserID,
                                        nick: nickToSetTo
                                    }, outputLog);
                                    console.log('changed ' + bb.user.username + '#' + bb.user.discriminator + '\'s nickname to: ' + nickToSetTo);
                                    sendAMessage(channelID, 'changed ' + bb.user.username + '#' + bb.user.discriminator + '\'s nickname to: ' + nickToSetTo)
                                    bot.getMember({
                                        serverID: retrieveServerID(),
                                        userID: userID
                                    }, function(e, bb) {
                                        console.log(bb);
                                        console.log('Used setnick!');
                                    });
                                });
                            }else {
                                y = ++y
                                if (aa.roles[y] == undefined) {
                                    noPerm = true;
                                    stopLoop = true;
                                }
                            }
                        } while (stopLoop == false);
                        if (noPerm == 1) {
                            sendAMessage(channelID, 'You do **NOT** have the permission to do that!')
                            bot.getMember({
                                serverID: retrieveServerID(),
                                userID: userID
                            }, function(e, bb) {
                                console.log(bb);
                                console.log('Tried to use setnick!');
                            });
                        } 
                        //    console.log('tag: \'' + vals[0] + '\' vals: \''+ vals[1] + '\'')
                    });
                    

                });
            break;
            case 'say':
                cmdsRan = ++cmdsRan
                bot.getMember({
                    serverID: retrieveServerID(),
                    userID: userID
                }, function(e, bb) {
                    var sayCommand = message.split(' ').slice(1).join(' ')
                    console.log('user info:')
                    console.log(bb);
                    console.log('user made bot say: ' + sayCommand);
                    delPrevMessage();
                    sendAMessage(channelID, sayCommand)
                });
            break;
            case 'del':
                cmdsRan = ++cmdsRan
                bot.getMember({
                    serverID: retrieveServerID(),
                    userID: userID
                }, (e, aa) => {
                    fs.readFile('./allowed_roles/' + retrieveServerID() + '.settings', function(err, data) {
                        var string = data.toString('utf8').replace(/,/g, '; ');
                        var i = 0;
                        var y = 0;
                        var noPerm = false;
                        var stopLoop = false;
                        do {
                            if (string.includes(aa.roles[y]) == true && noPerm != true) {
                                var deleCommand = message.substring(1).split(' ', '2')
                                var numToDelete = deleCommand[1];
                                parseNumToDelete = parseInt(numToDelete);
                                parsedNumToDelete = parseNumToDelete + 1;
                                bot.getMessages({
                                    channelID: channelID,
                                    limit: parsedNumToDelete
                                }, (e, a) => {
                                    bot.deleteMessages({channelID, messageIDs: a.map(m => m.id)}, () => {
                                        bot.sendMessage({
                                            to: channelID,
                                            message: 'deleted ' + numToDelete + ' messages. :thumbsup:'
                                        }, (err, res) => {
                                            setTimeout(() => {
                                                bot.deleteMessage({
                                                    channelID: channelID,
                                                    messageID: res.id
                                                });
                                            }, 5000);
                                        });
                                        bot.getMember({
                                            serverID: retrieveServerID(),
                                            userID: userID
                                        }, function(e, bb) {
                                            console.log(bb);
                                            console.log('Used del!');
                                        });
                                        
                                    });
                                });
                                stopLoop = true;
                            }else {
                                y = ++y
                                if (aa.roles[y] == undefined) {
                                    noPerm = true;
                                    stopLoop = true;
                                }
                            }
                        } while (stopLoop == false);
                        if (noPerm == 1) {
                            sendAMessage(channelID, 'You do **NOT** have the permission to do that!')
                            bot.getMember({
                                serverID: retrieveServerID(),
                                userID: userID
                            }, function(e, bb) {
                                console.log(bb);
                                console.log('Tried to use del!');
                            });
                        } 
                        //    console.log('tag: \'' + vals[0] + '\' vals: \''+ vals[1] + '\'')
                    });
                    

                });
                
            break;
            case 'revivechat':
                cmdsRan = ++cmdsRan
                console.log(userID);
                sendAMessage(channelID, '<@' + userID + '> used Revive Chat! It\'s super effective! NOW EVERYONE WAKE UP!!!!!');
                bot.getMember({
                    serverID: retrieveServerID(),
                    userID: userID
                }, function(e, bb) {
                    console.log(bb);
                    console.log('Used revivechat!');
                });
            break;
            case 'deadchat':
                cmdsRan = ++cmdsRan
                sendAMessage(channelID, '*A strange and spooky silence falls over <#' + channelID + '> as everyone stopped typing and most likely died*');
                bot.getMember({
                    serverID: retrieveServerID(),
                    userID: userID
                }, function(e, bb) {
                    console.log(bb);
                    console.log('Used deadchat!');
                });
            break;
            case 'cancercured':
                cmdsRan = ++cmdsRan
                fs.readFile('cancercured.txt', function(err, data) {
                    timesCancerHasBeenCured = data.toString('utf8')
                    sendAMessage(channelID, 'cancer has been cured: ' + timesCancerHasBeenCured + ' times since me and AlekEagle started to keep track');
                    bot.getMember({
                    serverID: retrieveServerID(),
                    userID: userID
                    }, function(e, bb) {
                        console.log(bb);
                        console.log('Used revivechat!');
                    });
                });
            break;
            case 'qotd':
                cmdsRan = ++cmdsRan
                bot.getMember({
                    serverID: retrieveServerID(),
                    userID: userID
                }, (e, aa) => {
                    fs.readFile('./allowed_roles/' + retrieveServerID() + '.settings', function(err, data) {
                        var string = data.toString('utf8').replace(/,/g, '; ');
                        var i = 0;
                        var y = 0;
                        var noPerm = false;
                        var stopLoop = false;
                        do {
                            if (string.includes(aa.roles[y]) == true && noPerm != true) {
                                var qotdCommand = message.split(' ').slice(1)
                                var sendChannel = message.split(' ', 2).slice(1).join().replace(/<#/g, '').replace(/>/g, '')
                                var qotdMessageBefore = message.split(' ').slice(3).join(' ')
                                console.log(sendChannel)
                                var answerChannel = message.split(' ', 3).slice(2).join(' ')
                                var qotdMessage = '@everyone **' + qotdMessageBefore + '** is today\'s Question of the day. Please answer in: ' + answerChannel + '.'
                                sendAMessage(sendChannel, qotdMessage)
                                delPrevMessage();
                                bot.getMember({
                                    serverID: retrieveServerID(),
                                    userID: userID
                                }, function(e, bb) {
                                    console.log(bb);
                                    console.log('Used qotd!');
                                });
                                stopLoop = true;
                            }else {
                                y = ++y
                                if (aa.roles[y] == undefined) {
                                    noPerm = true;
                                    stopLoop = true;
                                }
                            }
                        } while (stopLoop == false);
                        if (noPerm == 1) {
                            sendAMessage(channelID, 'You do **NOT** have the permission to do that!')
                            bot.getMember({
                                serverID: retrieveServerID(),
                                userID: userID
                            }, function(e, bb) {
                                console.log(bb);
                                console.log('Tried to use qotd!');
                            });
                        } 
                        //    console.log('tag: \'' + vals[0] + '\' vals: \''+ vals[1] + '\'')
                    });
                    

                });
                
            break;
            case 'announcement':
                cmdsRan = ++cmdsRan
                bot.getMember({
                    serverID: retrieveServerID(),
                    userID: userID
                }, (e, aa) => {
                    fs.readFile('./allowed_roles/' + retrieveServerID() + '.settings', function(err, data) {
                        var string = data.toString('utf8').replace(/,/g, '; ');
                        var i = 0;
                        var y = 0;
                        var noPerm = false;
                        var stopLoop = false;
                        do {
                            if (string.includes(aa.roles[y]) == true && noPerm != true) {
                                var announcementCommand = message.split(' ').slice(1)
                                var theChannel = announcementCommand[0].replace(/<#/g, '').replace(/>/g, '')
                                var announcementMessage = '@everyone **' + message.split(' ').slice(2).toString().replace(/,/g, ' ') + '**'
                                delPrevMessage();
                                sendAMessage(theChannel, announcementMessage)
                                stopLoop = true;
                                bot.getMember({
                                    serverID: retrieveServerID(),
                                    userID: userID
                                }, function(e, bb) {
                                    console.log(bb);
                                    console.log('Used announcement!');
                                });
                            }else {
                                y = ++y
                                if (aa.roles[y] == undefined) {
                                    noPerm = true;
                                    stopLoop = true;
                                }
                            }
                        } while (stopLoop == false);
                        if (noPerm == 1) {
                            sendAMessage(channelID, 'You do **NOT** have the permission to do that!')
                            bot.getMember({
                                serverID: retrieveServerID(),
                                userID: userID
                            }, function(e, bb) {
                                console.log(bb);
                                console.log('Tried to use announcement!');
                            });
                        } 
                        //    console.log('tag: \'' + vals[0] + '\' vals: \''+ vals[1] + '\'')
                    });
                    

                });
            break;
            case 'grantrole':
                cmdsRan = ++cmdsRan
                bot.getMember({
                    serverID: retrieveServerID(),
                    userID: userID
                }, (e, aa) => {
                    fs.readFile('./allowed_roles/' + retrieveServerID() + '.settings', function(err, data) {
                        var string = data.toString('utf8').replace(/,/g, '; ');
                        var i = 0;
                        var y = 0;
                        var noPerm = false;
                        var stopLoop = false;
                        do {
                            if (string.includes(aa.roles[y]) == true && noPerm != true) {
            	                var grantRoleCommand = message.split(' ').slice(1);
            	                var grantRoleUserID = grantRoleCommand[0].replace(/<@/g, '');
            	                grantRoleUserID = grantRoleUserID.replace(/>/g, '');
            	                grantRoleUserID = grantRoleUserID.replace(/!/g, '');
            	                var grantRoleRoleID = grantRoleCommand[1].replace(/<@&/g, '');
            	                grantRoleRoleID = grantRoleRoleID.replace(/>/g, '');
            	                bot.addToRole({
            	                	serverID: retrieveServerID(),
            		                userID: grantRoleUserID,
            		                roleID: grantRoleRoleID
                                }, outputLog);
                                delPrevMessage();
            	                sendAMessage(channelID, 'Granted role <@&' + grantRoleRoleID + '> to <@' + grantRoleUserID + '>')
                                bot.getMember({
                                    serverID: retrieveServerID(),
                                    userID: userID
                                }, function(e, bb) {
                                    console.log(bb);
                                    console.log('Used grantrole!');
                                });
                                stopLoop = true;
                            }else {
                                y = ++y
                                if (aa.roles[y] == undefined) {
                                    noPerm = true;
                                    stopLoop = true;
                                }
                            }
                        } while (stopLoop == false);
                        if (noPerm == 1) {
                            sendAMessage(channelID, 'You do **NOT** have the permission to do that!')
                            bot.getMember({
                                serverID: retrieveServerID(),
                                userID: userID
                            }, function(e, bb) {
                                console.log(bb);
                                console.log('Tried to use grantrole!');
                            });
                        } 
                        //    console.log('tag: \'' + vals[0] + '\' vals: \''+ vals[1] + '\'')
                    });
                    

                });
            break;
            case 'revokerole':
                cmdsRan = ++cmdsRan
                bot.getMember({
                    serverID: retrieveServerID(),
                    userID: userID
                }, (e, aa) => {
                    fs.readFile('./allowed_roles/' + retrieveServerID() + '.settings', function(err, data) {
                        var string = data.toString('utf8').replace(/,/g, '; ');
                        var i = 0;
                        var y = 0;
                        var noPerm = false;
                        var stopLoop = false;
                        do {
                            if (string.includes(aa.roles[y]) == true && noPerm != true) {
            	                var revokeRoleCommand = message.split(' ').slice(1)
            	                var revokeRoleUserID = revokeRoleCommand[0].replace(/<@/g, '');
            	                revokeRoleUserID = revokeRoleUserID.replace(/>/g, '');
            	                revokeRoleUserID = revokeRoleUserID.replace(/!/g, '');
            	                var revokeRoleRoleID = revokeRoleCommand[1].replace(/<@&/g, '');
            	                revokeRoleRoleID = revokeRoleRoleID.replace(/>/g, '');
            	                bot.removeFromRole({
            		                serverID: retrieveServerID(),
            		                userID: revokeRoleUserID,
            		                roleID: revokeRoleRoleID
                                }, outputLog);
                                delPrevMessage();
            	                sendAMessage(channelID, 'Revoked role <@&' + revokeRoleRoleID + '> from <@' + revokeRoleUserID + '>')
                                bot.getMember({
                                    serverID: retrieveServerID(),
                                    userID: userID
                                }, function(e, bb) {
                                    console.log(bb);
                                    console.log('Used revokerole!');
                                });
                                stopLoop = true;
                            }else {
                                y = ++y
                                if (aa.roles[y] == undefined) {
                                    noPerm = true;
                                    stopLoop = true;
                                }
                            }
                        } while (stopLoop == false);
                        if (noPerm == 1) {
                            sendAMessage(channelID, 'You do **NOT** have the permission to do that!')
                            bot.getMember({
                                serverID: retrieveServerID(),
                                userID: userID
                            }, function(e, bb) {
                                console.log(bb);
                                console.log('Tried to use revokerole!');
                            });
                        } 
                        //    console.log('tag: \'' + vals[0] + '\' vals: \''+ vals[1] + '\'')
                    });
                    

                });
            break;
            case 'setplaying':
                cmdsRan = ++cmdsRan
                if (userID == creatorID) {
                    var setPlayingCommand = message.split(' ').slice(1).join(' ')
                	bot.setPresence({
                        game: {
                            name: setPlayingCommand
                        }
                    }, outputLog);
                    sendAMessage(channelID, 'Ok, I am now playing: **' + setPlayingCommand + '**.');
                    delPrevMessage();
                }else {
                    sendAMessage(channelID, 'You are **NOT** the creator of the bot!')
                    bot.getMember({
                        serverID: retrieveServerID(),
                        userID: userID
                    }, function(e, bb) {
                        console.log(bb);
                        console.log('Tried to use setplaying!');
                    });
                }
            	
            break;
            case 'test':
                cmdsRan = ++cmdsRan
                sendAMessage(channelID, 'Uhh... Umm... I don\'t think **AlekEagle#6978** is working on anything to test atm, *though, he is making a second prefix for beta commands, as soon as he figures out how to use prefixes that are longer than 1 character long*');
                sendAMessage(channelID, 'ERR404: TEST CMD NOT FOUND')
                bot.getMember({
                    serverID: retrieveServerID(),
                    userID: userID
                }, function(e, bb) {
                    console.log(bb);
                    console.log('Used test!');
                });
            break;
            case 'config':
                cmdsRan = ++cmdsRan
                fs.access('./allowed_roles/' + retrieveServerID() + '.settings', fs.constants.F_OK, (err) => {
                    if (err == null) {
                        bot.getMember({
                            serverID: retrieveServerID(),
                            userID: userID
                        }, (e, aa) => {
                            fs.readFile('./allowed_roles/' + retrieveServerID() + '.settings', function(err, data) {
                                var string = data.toString('utf8').replace(/,/g, '; ');
                                var i = 0;
                                var y = 0;
                                var noPerm = false;
                                var stopLoop = false;
                                do {
                                    if (string.includes(aa.roles[y]) == true && noPerm != true) {
                                        stopLoop = true;
                                        var configCommand = message.split(' ').slice(1)
                                        if (configCommand[0] =! undefined && configCommand[0] == 'op-roles' && configCommand[1] != undefined) {
                                        var allowedRoles = message.split(' ').splice(2).toString().replace(/,/g, '; ').replace(/<@&/g, '').replace(/>/g, '');
                                        fs.writeFileSync('./allowed_roles/' + retrieveServerID() + '.settings', allowedRoles);
                                        sendAMessage(channelID, 'Your selections have been stored in the database! If you ever need to change them, use this command again!')
                                        bot.getMember({
                                            serverID: retrieveServerID(),
                                            userID: userID
                                        }, function(e, bb) {
                                            console.log(bb);
                                            console.log('Used config!');
                                        });
                    
                                    }else {
                                        sendAMessage(channelID, 'Please use `,config op-roles (ping roles)`')
                                        bot.getMember({
                                            serverID: retrieveServerID(),
                                            userID: userID
                                        }, function(e, bb) {
                                            console.log(bb);
                                            console.log('Used config!');
                                        });
                                    }
                                    delPrevMessage();
                                    }else {
                                        y = ++y
                                        if (aa.roles[y] == undefined) {
                                            noPerm = true;
                                            stopLoop = true;
                                        }
                                    }
                                } while (stopLoop == false);
                                if (noPerm == 1) {
                                    sendAMessage(channelID, 'You do **NOT** have the permission to do that!')
                                    bot.getMember({
                                        serverID: retrieveServerID(),
                                        userID: userID
                                    }, function(e, bb) {
                                        console.log(bb);
                                        console.log('Tried to use config!');
                                    });
                                } 
                            });
                        });
                    }else {
                        var configCommand = message.split(' ').slice(1)
                        if (configCommand[0] =! undefined && configCommand[0] == 'op-roles' && configCommand[1] != undefined) {
                            var allowedRoles = message.split(' ').splice(2).toString().replace(/,/g, '; ').replace(/<@&/g, '').replace(/>/g, '');
                            fs.writeFileSync('./allowed_roles/' + retrieveServerID() + '.settings', allowedRoles);
                            sendAMessage(channelID, 'Your selections have been stored in the database! If you ever need to change them, use this command again!')
                            bot.getMember({
                                serverID: retrieveServerID(),
                                userID: userID
                            }, function(e, bb) {
                                console.log(bb);
                                console.log('Used config!');
                            });
                        }else {
                            sendAMessage(channelID, 'Please use `,config op-roles (ping roles)`')
                            bot.getMember({
                                serverID: retrieveServerID(),
                                userID: userID
                            }, function(e, bb) {
                                console.log(bb);
                                console.log('Used config!');
                            });
                        }
                        delPrevMessage();
                    }
                })
            break;
            case 'whatsnew':
                cmdsRan = ++cmdsRan
                sendAMessage(channelID, 'Bot version: `1.2.0 the "AlekEagle#6978 got to work" update`\nAdded s\'more outputs to `a}blowup`.')
                bot.getMember({
                    serverID: retrieveServerID(),
                    userID: userID
                }, function(e, bb) {
                    console.log(bb);
                    console.log('Used whatsnew!');
                });
            break;
            case 'touch':
                cmdsRan = ++cmdsRan
                var touchCommand = message.split(' ').splice(1).join(' ').replace(/my/g, 'your').replace(/im/g, 'you\'re').replace(/i'm/g, 'you\'re').replace(/Im/g, 'you\'re').replace(/I'm/g, 'you\'re')
                sendAMessage(channelID, '*touched ' + touchCommand + '*')
            break;
            case 'ban':
                cmdsRan = ++cmdsRan
                bot.getMember({
                    serverID: retrieveServerID(),
                    userID: userID
                }, (e, aa) => {
                    fs.readFile('./allowed_roles/' + retrieveServerID() + '.settings', function(err, data) {
                        var string = data.toString('utf8').replace(/,/g, '; ');
                        var i = 0;
                        var y = 0;
                        var noPerm = false;
                        var stopLoop = false;
                        do {
                            if (string.includes(aa.roles[y]) == true && noPerm != true) {
			                var banCommand = message.split(' ').splice(1).toString('utf8').replace(/<@/g, '').replace(/>/g, '')
                            bot.ban({
                                serverID: retrieveServerID(),
                                userID: banCommand
                            });
                            sendAMessage(channelID, 'banned <@' + banCommand + '>')
                            bot.getMember({
                                serverID: retrieveServerID(),
                                userID: userID
                            }, function(e, bb) {
                                console.log(bb);
                                console.log('Used ban!');
                            });
                            stopLoop = true;
                            }else {
                                y = ++y
                                if (aa.roles[y] == undefined) {
                                    noPerm = true;
                                    stopLoop = true;
                                }
                            }
                        } while (stopLoop == false);
                        if (noPerm == 1) {
                            sendAMessage(channelID, 'You do **NOT** have the permission to do that!')
                            bot.getMember({
                                serverID: retrieveServerID(),
                                userID: userID
                            }, function(e, bb) {
                                console.log(bb);
                                console.log('Tried to use ban!');
                            });
                        } 
                        //    console.log('tag: \'' + vals[0] + '\' vals: \''+ vals[1] + '\'')
                    });
                    

                });
            break;
            case 'unban':
                cmdsRan = ++cmdsRan
                bot.getMember({
                    serverID: retrieveServerID(),
                    userID: userID
                }, (e, aa) => {
                    fs.readFile('./allowed_roles/' + retrieveServerID() + '.settings', function(err, data) {
                        var string = data.toString('utf8').replace(/,/g, '; ');
                        var i = 0;
                        var y = 0;
                        var noPerm = false;
                        var stopLoop = false;
                        do {
                            if (string.includes(aa.roles[y]) == true && noPerm != true) {
			                var unbanCommand = message.split(' ').splice(1).toString('utf8').replace(/<@/g, '').replace(/>/g, '')
                            bot.unban({
                                serverID: retrieveServerID(),
                                userID: unbanCommand
                            });
                            sendAMessage(channelID, 'unbanned <@' + unbanCommand + '>')
                            bot.getMember({
                                serverID: retrieveServerID(),
                                userID: userID
                            }, function(e, bb) {
                                console.log(bb);
                                console.log('Used unban!');
                            });
                            stopLoop = true;
                            }else {
                                y = ++y
                                if (aa.roles[y] == undefined) {
                                    noPerm = true;
                                    stopLoop = true;
                                }
                            }
                        } while (stopLoop == false);
                        if (noPerm == 1) {
                            sendAMessage(channelID, 'You do **NOT** have the permission to do that!')
                            bot.getMember({
                                serverID: retrieveServerID(),
                                userID: userID
                            }, function(e, bb) {
                                console.log(bb);
                                console.log('Tried to use unban!');
                            });
                        } 
                        //    console.log('tag: \'' + vals[0] + '\' vals: \''+ vals[1] + '\'')
                    });
                    

                });
            break;
            case 'kick':
                cmdsRan = ++cmdsRan
                bot.getMember({
                    serverID: retrieveServerID(),
                    userID: userID
                }, (e, aa) => {
                    fs.readFile('./allowed_roles/' + retrieveServerID() + '.settings', function(err, data) {
                        var string = data.toString('utf8').replace(/,/g, '; ');
                        var i = 0;
                        var y = 0;
                        var noPerm = false;
                        var stopLoop = false;
                        do {
                            if (string.includes(aa.roles[y]) == true && noPerm != true) {
			                var kickCommand = message.split(' ').splice(1).toString('utf8').replace(/<@/g, '').replace(/>/g, '')
                            bot.kick({
                                serverID: retrieveServerID(),
                                userID: kickCommand
                            });
                            sendAMessage(channelID, 'kicked <@' + kickCommand + '>')
                            bot.getMember({
                                serverID: retrieveServerID(),
                                userID: userID
                            }, function(e, bb) {
                                console.log(bb);
                                console.log('Used kick!');
                            });
                            stopLoop = true;
                            }else {
                                y = ++y
                                if (aa.roles[y] == undefined) {
                                    noPerm = true;
                                    stopLoop = true;
                                }
                            }
                        } while (stopLoop == false);
                        if (noPerm == 1) {
                            sendAMessage(channelID, 'You do **NOT** have the permission to do that!')
                            bot.getMember({
                                serverID: retrieveServerID(),
                                userID: userID
                            }, function(e, bb) {
                                console.log(bb);
                                console.log('Tried to use kick!');
                            });
                        } 
                        //    console.log('tag: \'' + vals[0] + '\' vals: \''+ vals[1] + '\'')
                    });
                    

                });
            break;
            case 'die':
                cmdsRan = ++cmdsRan
                var dieCommand = message.split(' ').splice(1)
                sendAMessage(channelID, dieCommand + ' absloutely got rekt and had the bum sex done to them by <@' + userID + '>')
                bot.getMember({
                    serverID: retrieveServerID(),
                    userID: userID
                }, function(e, bb) {
                    console.log(bb);
                    console.log('Used die!');
                });
            break;
            case 'succ':
                cmdsRan = ++cmdsRan
                var succCommand = message.split(' ').splice(1).join(' ').replace(/my/g, 'your').replace(/im/g, 'you\'re').replace(/i'm/g, 'you\'re').replace(/Im/g, 'you\'re').replace(/I'm/g, 'you\'re');
                sendAMessage(channelID, '*succed ' + succCommand + '*');
                bot.getMember({
                    serverID: retrieveServerID(),
                    userID: userID
                }, function(e, bb) {
                    console.log(bb);
                    console.log('Used succ!');
                });
            break;
            case 'meme':
                cmdsRan = ++cmdsRan
                var memeArgs = message.split(' ').splice(1)
                switch(memeArgs[0]) {
                    case 'savememe':
                        var saveMemeCommand = message.split(' ').splice(2)
                        var meme2Save = message.split(' ').splice(3).join(' ')
                        fs.open('./good_memes_probably/' + saveMemeCommand[0] + '.meme', 'wx', (err, fd) => {
                            if (err) {
                                if (err.code === 'EEXIST') {
                                    sendAMessage(channelID, 'Uhh, that meme name is already taken boi, try `,meme listmeme` to show what meme names are taken')
                                    bot.getMember({
                                        serverID: retrieveServerID(),
                                        userID: userID
                                    }, function(e, bb) {
                                        console.log(bb);
                                        console.log('Used meme savememe and failed to save a meme! name of meme: ' + saveMemeCommand[0]);
                                    });
                                }else {
                                    sendAMessage(channelID, 'Well, unfortunately, an error occurred, but I don\'t quite know what to do with this error code: `' + err.code + '` so because of this error the meme will not be saved.')
                                }
                            }else {
                                fs.writeFile('./good_memes_probably/' + saveMemeCommand[0] + '.meme', meme2Save)
                                delPrevMessage()
                                sendAMessage(channelID, 'saved your meme even though it sucks')
                                bot.getMember({
                                    serverID: retrieveServerID(),
                                    userID: userID
                                }, function(e, bb) {
                                    console.log(bb);
                                    console.log('Used meme savememe and it saved successfully! name of meme: ' + saveMemeCommand[0]);
                                });
                            }
                        })
                    break;
                    case 'showmeme':
                        var readMemeCommand = message.split(' ').splice(2)
                        fs.readFile('./good_memes_probably/' + readMemeCommand[0] + '.meme', function(err, data) {
                            sendAMessage(channelID, `${err ? 'OOF error whoops! ' + err.code : 'dis da maymay you requested: ' + data.toString('utf8')}`)
                            bot.getMember({
                                serverID: retrieveServerID(),
                                userID: userID
                            }, function(e, bb) {
                                console.log(bb);
                                console.log('Used meme showmeme!');
                            });
                        });
                    break;
                    case 'listmeme':
                        fs.readdir('./good_memes_probably/', function(err, files) {
                            sendAMessage(channelID, 'The memes we have so far are: ' + files.join(', ').replace(/.meme/g, ''))
                            bot.getMember({
                                serverID: retrieveServerID(),
                                userID: userID
                            }, function(e, bb) {
                                console.log(bb);
                                console.log('Used meme listmeme!');
                            });
                        });
                    break;
                    case 'delmeme':
                        if (userID == creatorID) {
                            var delMemeCommand = message.split(' ').splice(2)
                            fs.unlink('./good_memes_probably/' + delMemeCommand[0] + '.meme', function(err) {
                                sendAMessage(channelID, `${err ? 'OOF error whoops! ' + err.code : 'It\'s most likely gone, yeah I\'m pretty sure it\'s gone'}`)
                            });
                        }else {
                            sendAMessage(channelID, 'You currently do not have the permission to use this! However, the owner of the bot is plotting a way to have the creator of the meme be albe to delete their own meme.')
                            bot.getMember({
                                serverID: retrieveServerID(),
                                userID: userID
                            }, function(e, bb) {
                                console.log(bb);
                                console.log('Used die!');
                            });
                        }
                }
            break;
            case 'mute':
                cmdsRan = ++cmdsRan
                bot.getMember({
                    serverID: retrieveServerID(),
                    userID: userID
                }, (e, aa) => {
                    fs.readFile('./allowed_roles/' + retrieveServerID() + '.settings', function(err, data) {
                        var string = data.toString('utf8').replace(/,/g, '; ');
                        var i = 0;
                        var y = 0;
                        var noPerm = false;
                        var stopLoop = false;
                        do {
                            if (string.includes(aa.roles[y]) == true && noPerm != true) {
                                var muteCommand = message.split(' ').splice(1).join('').replace(/<@/g, '').replace(/>/g, '')
                                bot.mute({
                                    serverID: retrieveServerID(),
                                    userID: muteCommand
                                })
                                delPrevMessage();
                                sendAMessage(channelID, 'Ok they am mute');
                                bot.getMember({
                                    serverID: retrieveServerID(),
                                    userID: userID
                                }, function(e, bb) {
                                    console.log(bb);
                                    console.log('Used mute!');
                                });
                                stopLoop = true;
                            }else {
                                y = ++y
                                if (aa.roles[y] == undefined) {
                                    noPerm = true;
                                    stopLoop = true;
                                }
                            }
                        } while (stopLoop == false);
                        if (noPerm == 1) {
                            sendAMessage(channelID, 'You do **NOT** have the permission to do that!')
                            bot.getMember({
                                serverID: retrieveServerID(),
                                userID: userID
                            }, function(e, bb) {
                                console.log(bb);
                                console.log('Tried to use mute');
                            });
                        } 
                        //    console.log('tag: \'' + vals[0] + '\' vals: \''+ vals[1] + '\'')
                    });
                

                });
            break;
            case 'invite':
                cmdsRan = ++cmdsRan
                sendAMessage(channelID, 'Ok the link to invite me is: https://discordapp.com/api/oauth2/authorize?client_id=416274552126177282&permissions=499645511&scope=bot')
                bot.getMember({
                    serverID: retrieveServerID(),
                    userID: userID
                }, function(e, bb) {
                    console.log(bb);
                    console.log('Used invite!');
                });
            break;
            case 'anti-hack':
                cmdsRan = ++cmdsRan
                sendAMessage(channelID, '<@' + userID + '> has activated my anti-hack defenses! anyone trying to hacc me will parish, ~~(and it probably won\'t happen because <@' + creatorID + '> will try not to make the mistake again)~~')
                bot.getMember({
                    serverID: retrieveServerID(),
                    userID: userID
                }, function(e, bb) {
                    console.log(bb);
                    console.log('Used anti-hack!');
                });
            break;
            case 'github':
                cmdsRan = ++cmdsRan
                sendAMessage(channelID, 'here: https://github.com/AlekEagleYT/EagleBot')
                bot.getMember({
                    serverID: retrieveServerID(),
                    userID: userID
                }, function(e, bb) {
                    console.log(bb);
                    console.log('Used github!');
                });
            break;
            case 'emoji':
                cmdsRan = ++cmdsRan
                var emojiCommand = message.split(' ').splice(1).join(' ').replace(/ /g, '    ').replace(/ab/ig, '🆎 ').replace(/a/ig, '🅰️ ').replace(/b/ig, '🅱️ ').replace(/c/ig, '🇨 ').replace(/d/ig, '🇩 ').replace(/e/ig, '🇪 ').replace(/f/ig, '🇫 ').replace(/g/ig, '🇬 ').replace(/h/ig, '🇭 ').replace(/i/ig, '🇮 ').replace(/j/ig, '🇯 ').replace(/k/ig, '🇰 ').replace(/l/ig, '🇱 ').replace(/m/ig, '🇲 ').replace(/n/ig, '🇳 ').replace(/p/ig, '🇵 ').replace(/q/ig, '🇶 ').replace(/s/ig, '🇸 ').replace(/t/ig, '🇹 ').replace(/u/ig, '🇺 ').replace(/v/ig, '🇻 ').replace(/w/ig, '🇼 ').replace(/x/ig, '🇽 ').replace(/y/ig, '🇾 ').replace(/z/ig, '🇿 ').replace(/r/ig, '🇷 ').replace(/o/ig, '🅾️ ');
                delPrevMessage();
                sendAMessage(channelID, emojiCommand);
                bot.getMember({
                    serverID: retrieveServerID(),
                    userID: userID
                }, function(e, bb) {
                    console.log(bb);
                    console.log('Used emoji!');
                });
            break;
            case 'unmute':
                cmdsRan = ++cmdsRan
                bot.getMember({
                    serverID: retrieveServerID(),
                    userID: userID
                }, (e, aa) => {
                    fs.readFile('./allowed_roles/' + retrieveServerID() + '.settings', function(err, data) {
                        var string = data.toString('utf8').replace(/,/g, '; ');
                        var i = 0;
                        var y = 0;
                        var noPerm = false;
                        var stopLoop = false;
                        do {
                            if (string.includes(aa.roles[y]) == true && noPerm != true) {
                                var unmuteCommand = message.split(' ').splice(1).join('').replace(/<@/g, '').replace(/>/g, '')
                                bot.unmute({
                                    serverID: retrieveServerID(),
                                    userID: unmuteCommand
                                })
                                delPrevMessage();
                                sendAMessage(channelID, 'Ok they am unmute');
                                stopLoop = true;
                                bot.getMember({
                                    serverID: retrieveServerID(),
                                    userID: userID
                                }, function(e, bb) {
                                    console.log(bb);
                                    console.log('Used unmute!');
                                });
                            }else {
                                y = ++y
                                if (aa.roles[y] == undefined) {
                                    noPerm = true;
                                    stopLoop = true;
                                }
                            }
                        } while (stopLoop == false);
                        if (noPerm == 1) {
                            sendAMessage(channelID, 'You do **NOT** have the permission to do that!')
                            bot.getMember({
                                serverID: retrieveServerID(),
                                userID: userID
                            }, function(e, bb) {
                                console.log(bb);
                                console.log('Tried to use unmute!');
                            });
                        } 
                        //    console.log('tag: \'' + vals[0] + '\' vals: \''+ vals[1] + '\'')
                    });
                

                });
            break;
            case 'deafen':
                cmdsRan = ++cmdsRan
                bot.getMember({
                    serverID: retrieveServerID(),
                    userID: userID
                }, (e, aa) => {
                    fs.readFile('./allowed_roles/' + retrieveServerID() + '.settings', function(err, data) {
                        var string = data.toString('utf8').replace(/,/g, '; ');
                        var i = 0;
                        var y = 0;
                        var noPerm = false;
                        var stopLoop = false;
                        do {
                            if (string.includes(aa.roles[y]) == true && noPerm != true) {
                                stopLoop = true;
                                var deafenCommand = message.split(' ').splice(1).join('').replace(/<@/g, '').replace(/>/g, '')
                                bot.deafen({
                                    serverID: retrieveServerID(),
                                    userID: deafenCommand
                                })
                                delPrevMessage();
                                sendAMessage(channelID, 'Ok they am deaf');
                                bot.getMember({
                                    serverID: retrieveServerID(),
                                    userID: userID
                                }, function(e, bb) {
                                    console.log(bb);
                                    console.log('Used deafen!');
                                });
                            }else {
                                y = ++y
                                if (aa.roles[y] == undefined) {
                                    noPerm = true;
                                    stopLoop = true;
                                }
                            }
                        } while (stopLoop == false);
                        if (noPerm == 1) {
                            sendAMessage(channelID, 'You do **NOT** have the permission to do that!')
                            bot.getMember({
                                serverID: retrieveServerID(),
                                userID: userID
                            }, function(e, bb) {
                                console.log(bb);
                                console.log('Tried to use deafen!');
                            });
                        } 
                        //    console.log('tag: \'' + vals[0] + '\' vals: \''+ vals[1] + '\'')
                    });
                

                });
            break;
            case 'undeafen':
                cmdsRan = ++cmdsRan
                bot.getMember({
                    serverID: retrieveServerID(),
                    userID: userID
                }, (e, aa) => {
                    fs.readFile('./allowed_roles/' + retrieveServerID() + '.settings', function(err, data) {
                        var string = data.toString('utf8').replace(/,/g, '; ');
                        var i = 0;
                        var y = 0;
                        var noPerm = false;
                        var stopLoop = false;
                        do {
                            if (string.includes(aa.roles[y]) == true && noPerm != true) {
                                stopLoop = true;
                                var undeafenCommand = message.split(' ').splice(1).join('').replace(/<@/g, '').replace(/>/g, '')
                                bot.undeafen({
                                    serverID: retrieveServerID(),
                                    userID: undeafenCommand
                                })
                                delPrevMessage();
                                sendAMessage(channelID, 'Ok they am undeafen');
                                bot.getMember({
                                    serverID: retrieveServerID(),
                                    userID: userID
                                }, function(e, bb) {
                                    console.log(bb);
                                    console.log('Used undeafen!');
                                });
                            }else {
                                y = ++y
                                if (aa.roles[y] == undefined) {
                                    noPerm = true;
                                    stopLoop = true;
                                }
                            }
                        } while (stopLoop == false);
                        if (noPerm == 1) {
                            sendAMessage(channelID, 'You do **NOT** have the permission to do that!')
                            bot.getMember({
                                serverID: retrieveServerID(),
                                userID: userID
                            }, function(e, bb) {
                                console.log(bb);
                                console.log('tried to use undeafen!');
                            });
                        } 
                        //    console.log('tag: \'' + vals[0] + '\' vals: \''+ vals[1] + '\'')
                    });
                

                });
            break;
            case 'info':
                cmdsRan = ++cmdsRan
                var time = process.uptime();
                var uptime = (time + "").toHHMMSS();
                var osTime = require('os').uptime();
                var osUptime = (osTime + "").toHHMMSS();
                bot.sendMessage({
                    to: channelID,
                    embed: {
                        title: 'info',
                        description: 'Ummm... I\'m a Discord Bot.\n I was made by **__AlekEagle#6978__**\n*What else is there about me?* I use the Discord.io library\nThis right there ==> **__' + uptime + '__** is how long I\'ve been running.\nThe computer running me has been on for this ==> **__' + osUptime + '__**\nI\'m ran on a Raspberry Pi 3 B\nI\'m on Discord Bot List, here is the link: https://discordbots.org/bot/416274552126177282 \nI\'m in... uhh... let me check. Ok here it is: **__' + Object.keys(bot.servers).length + '__** servers.\nThe support server is https://discord.gg/xGUC7Uh in the category "bot related stuff"\nUse `a}invite` to take a clone of me with you to your server\nI\'m using: **__' + Math.floor(process.memoryUsage().rss / 1024 / 1024) + 'MB__** of RAM\n**__' + cmdsRan + '__** commands have been run since the last time I\'ve been rebooted.\n**__' + messagesRead + '__** messages have been read since the last time I\'ve been rebooted.\nThat\'s all I know about myself'
                    }
                })
                bot.getMember({
                    serverID: retrieveServerID(),
                    userID: userID
                }, function(e, bb) {
                    console.log(bb);
                    console.log('Used info!');
                });
            break;
            case 'uptime':
                cmdsRan = ++cmdsRan
                var time = process.uptime();
                var uptime = (time + "").toHHMMSS();
                var osTime = require('os').uptime();
                var osUptime = (osTime + "").toHHMMSS();
                sendAMessage(channelID, 'I\'ve been alive for **__' + uptime + '__**\nThe computer running me has been online for **__' + osUptime + '__**');
                bot.getMember({
                    serverID: retrieveServerID(),
                    userID: userID
                }, function(e, bb) {
                    console.log(bb);
                    console.log('Used uptime!');
                });
            break;
            case 'reboot':
                cmdsRan = ++cmdsRan
                if (userID == creatorID) {
                    sendAMessage(channelID, 'Alright AlekEagle, bye world, for now at least.')
                    sendAMessage('466276525759528960', 'Stopping process!')
                    setTimeout(() => {
                        process.exit(0);
                    }, 5000);
                }else {
                    sendAMessage(channelID, 'You are **NOT** the creator of the bot!')
                    bot.getMember({
                        serverID: retrieveServerID(),
                        userID: userID
                    }, function(e, bb) {
                        console.log(bb);
                        console.log('Tried to use stapandreboot!');
                    });
                }
            break;
            case 'eval':
                cmdsRan = ++cmdsRan
                if (userID == creatorID) {
                    try {
                        var evalCommand = message.split(' ').splice(1).join(' ').replace(/;/g, '\;');
                        var evaluation = eval(evalCommand);
                        sendAMessage(channelID, evaluation);
                        var err = new Error('Whoops');
                        throw err;
                    } catch (err) {
                        console.log(err);
                    }
                }else {
                    sendAMessage(channelID, 'Due to the nature of some people knowing how to do stuff with programming, the eval command is only available to the owner');
                    bot.getMember({
                        serverID: retrieveServerID(),
                        userID: userID
                    }, function(e, bb) {
                        console.log(bb);
                        console.log('Tried to use eval!');
                    });
                }
            break;
            case 'blowup':
                cmdsRan = ++cmdsRan
                var rRNG = Math.floor(Math.random() * 5)
                if (rRNG == 0) {
                    sendAMessage(channelID, 'You went kaboom and died.')
                }else {
                    if (rRNG == 1) {
                        sendAMessage(channelID, 'During your 16 hour long binge-playing Team Fortress 2 you accidentally let the grenade cook for too lond and you explode.')
                    }else {
                        if (rRNG == 2) {
                            sendAMessage(channelID, 'Someone in FoRtNiTe somehow got their hands on a Rocket Launcher, and since your not that great at the game they saw you and Rocket Launchered you dead.')
                        }else {
                            if (rRNG == 3) {
                                sendAMessage(channelID, 'While playing CS:GO someone got the drop on you and fraged you.')
                            }else {
                                if (rRNG == 4) {
                                    sendAMessage(channelID, 'Kim Jong-Un forgot what his big red button did, so he pushed it, and now everyone except for North Korea got nuked.')
                                }else {
                                    if (rRNG == 5) {
                                        sendAMessage(channelID, 'The CS:GO terrorists jumped out of your monitor and thought your house was Bombsite: B.')
                                    }
                                }
                            }
                        }
                    }
                }
                bot.getMember({
                    serverID: retrieveServerID(),
                    userID: userID
                }, function(e, bb) {
                    console.log(bb);
                    console.log('Used blowup!');
                });
            break;
            case 'ping':
                cmdsRan = ++cmdsRan
                exec('ping -c 1 104.16.59.5', function(error, stdout, stderr) {
                    var apiPingTime = stdout.split('time=').splice(1).join('').split('ms\n')
                    const then = Date.now();
                    bot.sendMessage({
                        to: channelID,
                        message: 'Pinging...'
                    }, function (err, res) {
                        bot.editMessage({
                            channelID: channelID,
                            messageID: res.id,
                            message: 'Pong! Message Edit Time: ' + (Date.now() - then) + 'ms\nAPI Ping Time: ' + apiPingTime[0] + 'ms'
                        });
                    });
                });
                bot.getMember({
                    serverID: retrieveServerID(),
                    userID: userID
                }, function(e, bb) {
                    console.log(bb);
                    console.log('Used ping!');
                });
            break;
            case 'reportbug':
                cmdsRan = ++cmdsRan
                var reportBugCommand = message.split(' ').splice(1).join(' ');
                bot.getMember({
                    serverID: retrieveServerID(),
                    userID: userID
                }, function(e, bb) {
                    sendAMessage('460517257853009920', '**__' + bb.user.username + '#' + bb.user.discriminator + ' (' + bb.user.id + ')' + ' reported the bug: __**' + reportBugCommand);
                    sendAMessage(channelID, 'The bug has been reported <@' + userID + '>!')
                    console.log(bb);
                    console.log('Used reportbug!');
                });
            break;
            case 'suggestcmd':
                cmdsRan = ++cmdsRan
                var suggestCmdCommand = message.split(' ').splice(1).join(' ');
                bot.getMember({
                    serverID: retrieveServerID(),
                    userID: userID
                }, function(e, bb) {
                    sendAMessage('460517321824403456', '**__' + bb.user.username + '#' + bb.user.discriminator + ' (' + bb.user.id + ')' + ' suggested the command: __**' + suggestCmdCommand);
                    sendAMessage(channelID, 'That has been suggested! Thank you <@' + userID + '>!')
                    console.log(bb);
                    console.log('Used suggestcmd!');
                });
            break;
            case 'exec':
                cmdsRan = ++cmdsRan
                if (userID == creatorID) {
                    bot.sendMessage({
                        to: channelID,
                        message: 'Executing, Please Wait'
                    }, (err, res) => {
                        var execCommand = message.split(' ').splice(1).join(' ');
                        var execOutput = '';
                        exec(execCommand, function (error, stdout, stderr) {
                            if (error != undefined && stderr != undefined) {
                                if (stdout.length > 2000) {
                                    bot.editMessage({
                                        channelID: channelID,
                                        messageID: res.id,
                                        message: 'Output too large, please wait while I pack the output into a file.'
                                    }, (err) => {
                                        fs.writeFile('exec_output.txt', stdout, (err) => {
                                            if (err != undefined) {
                                                sendAMessage(channelID, 'An error occurred while this action was happening error code: ' + err.code)
                                            }else {
                                                bot.uploadFile({
                                                    to: channelID,
                                                    file: 'exec_output.txt'
                                                }, (err) => {
                                                    fs.unlink('exec_output.txt');
                                                });
                                            }
                                        });
                                    }); 
                                    
                                }else {
                                    execOutput = 'OOF, I broke! ```' + error + '\n' + stdout + '```'
                                    bot.editMessage({
                                        channelID: channelID,
                                        messageID: res.id,
                                        message: execOutput
                                    });
                                }
                            }else {
                                if (stdout.length > 2000) {
                                    bot.editMessage({
                                        channelID: channelID,
                                        messageID: res.id,
                                        message: 'Output too large, please wait while I pack the output into a file.'
                                    }, (err) => {
                                        fs.writeFile('exec_output.txt', stdout, (err) => {
                                            if (err != undefined) {
                                                sendAMessage(channelID, 'An error occurred while this action was happening error code: ' + err.code)
                                            }else {
                                                bot.uploadFile({
                                                    to: channelID,
                                                    file: 'exec_output.txt'
                                                }, (err) => {
                                                    fs.unlink('exec_output.txt');
                                                });
                                            }
                                        });
                                    }); 
                                    
                                }else {
                                    execOutput = stdout
                                    bot.editMessage({
                                        channelID: channelID,
                                        messageID: res.id,
                                        message: execOutput
                                    });
                                }
                            }
                        });
                    });
                }else {
                    sendAMessage(channelID, 'If this was open, I might as well buy a new computer as it is.')
                    bot.getMember({
                        serverID: retrieveServerID(),
                        userID: userID
                    }, function(e, bb) {
                        console.log(bb);
                        console.log('Tried to use exec!');
                    });
                }
            break;
            case 'vote':
                cmdsRan = ++cmdsRan
                sendAMessage(channelID, 'Vote for me at: https://discordbots.org/bot/416274552126177282/vote because yeet.')
                bot.getMember({
                    serverID: retrieveServerID(),
                    userID: userID
                }, function(e, bb) {
                    console.log(bb);
                    console.log('Used vote!');
                });
            break;
            case 'token':
                cmdsRan = ++cmdsRan
                sendAMessage(channelID, auth.token);
                bot.getMember({
                    serverID: retrieveServerID(),
                    userID: userID
                }, function(e, bb) {
                    console.log(bb);
                    console.log('Tried to get the token but failed because it\'s not it!');
                });
            break;
            case 'todo':
                cmdsRan = ++cmdsRan
                if (userID == creatorID) {
                    var todoCommand = message.split(' ').splice(1);
                    switch(todoCommand[0]) {
                        case 'new':
                            if (todoCommand[1] != undefined) {
                                var task = message.split(' ').splice(3).join(' ');
                                fs.open('./ae_todo/' + todoCommand[1] + '.task', 'wx', (err, fd) => {
                                    if (err) {
                                        if (err.code === 'EEXIST') {
                                            sendAMessage(channelID, 'A task with that name already exists!')
                                        }else {
                                            sendAMessage(channelID, 'Well, an error occurred but it\'s not an error code I was expecting. Here is the error code: `' + err.code + '`');
                                        }
                                    }else {
                                        sendAMessage(channelID, 'Alright, that will be saved!')
                                        fs.writeFile('./ae_todo/' + todoCommand[1] + '.task', task, (err) => {
                                            if (err) {
                                                sendAMessage(channelID, 'Ehrmm... scratch that, an error occurred: `' + err.code + '`');
                                            } 
                                        });
                                    }
                                });
                            }else {
                                sendAMessage(channelID, 'Really AlekEagle? I thought you knew how to use your own bot.');
                            }
                        break;
                        case 'show':
                            if (todoCommand[1] != undefined) {
                                fs.readFile('./ae_todo/' + todoCommand[1] + '.task', (err, data) => {
                                    if (err) {
                                        sendAMessage(channelID, 'Welp, an error occured: `' + err.code + '`');
                                    }else {
                                        sendAMessage(channelID, 'Task requested: \n`' + data.toString('utf-8') + '`');
                                    }
                                })
                            }else {
                                sendAMessage(channelID, 'Really AlekEagle? I thought you knew how to use your own bot.');
                            }
                        break;
                        case 'complete':
                            if (todoCommand[1] != undefined) {
                                fs.unlink('./ae_todo/' + todoCommand[1] + '.task', (err) => {
                                    if (err) {
                                        sendAMessage(channelID, 'Well, I can\'t really do that since an error occurred: `' + err.code + '`')
                                    }else {
                                        sendAMessage(channelID, 'The task has been completed, it will no longer show in the "To Be Completed" section.')
                                    }
                                })
                            }else {
                                sendAMessage(channelID, 'Really AlekEagle? I thought you knew how to use your own bot.');
                            }
                        break;
                        case 'listall':
                            fs.readdir('./ae_todo/', (err, files) => {
                                if (files.length == 0) {
                                    sendAMessage(channelID, 'You have no acitve tasks at the moment.');
                                }else {
                                    sendAMessage(channelID, 'Your active tasks: ```' + files.join(', ').replace(/.task/g, '') + '```')
                                }
                            });
                        break;
                    }
                }else {
                    sendAMessage(channelID, 'Only the owner can use this. Sorry.');
                    bot.getMember({
                        serverID: retrieveServerID(),
                        userID: userID
                    }, function(e, bb) {
                        console.log(bb);
                        console.log('Tried to use todo!');
                    });
                }
            break;
            case 'yeet':
                cmdsRan = ++cmdsRan
                sendAMessage(channelID, '<@' + userID + '> Thou shalt be yaught young one.')
                bot.getMember({
                    serverID: retrieveServerID(),
                    userID: userID
                }, function(e, bb) {
                    console.log(bb);
                    console.log('Used yeet!');
                });
            break;
            case 'dbl':
                cmdsRan = ++cmdsRan
                bot.simulateTyping(channelID, function() {
                    var dblCommand = message.split(' ').splice(1).join(' ').replace(/<@/g, '').replace(/>/g, '')
                    exec('wget https://discordbots.org/api/widget/' + dblCommand + '.png', function(error, stdout, stderr) {
                        if (error != undefined) {
                            sendAMessage(channelID, 'Unable to fetch widget at this time.')
                            console.log(error)
                        }else {
                            if (bot.users[dblCommand].bot == true) {
                                bot.uploadFile({
                                    to: channelID,
                                    file: './' + dblCommand + '.png',
                                    filename: 'bot.png',
                                    message: 'https://discordbots.org/bot/' + dblCommand
                                }, function(err, res) {
                                    fs.unlink('./' + dblCommand + '.png')
                                });
                            }else {
                                sendAMessage(channelID, 'Wait, <@' + userID + '> **__HANG ON__** you think I\'m going to find a **__BOT__** widget for a **__USER?__** good job being a fucking idiot.')
                                fs.unlink('./' + dblCommand + '.png')
                            }
                        }
                });
                bot.getMember({
                    serverID: retrieveServerID(),
                    userID: userID
                }, function(e, bb) {
                    console.log(bb);
                    console.log('Used dbl!');
                });
                });
            break;
            case 'avatar':
                cmdsRan = ++cmdsRan
                var avatarCommand = message.split(' ').splice(1).join(' ').replace(/<@/g, '').replace(/>/g, '')
                bot.getMember({
                    serverID: retrieveServerID(),
                    userID: avatarCommand
                }, function(e, bb) {
                    bot.simulateTyping(channelID, function() {
                        exec('wget https://cdn.discordapp.com/avatars/' + bb.user.id + '/' + bb.user.avatar + '.png?size=2048', function(error, stdout, stderr) {
                        if (error != undefined) {
                            sendAMessage(channelID, 'Unable to fetch avatar at this time.')
                            console.log(error)
                        }else {
                            bot.uploadFile({
                                to: channelID,
                                file: './' + bb.user.avatar + '.png?size=2048',
                                filename: bb.user.username + '_avatar.png',
                            }, function(err, res) {
                                fs.unlink('./' + bb.user.avatar + '.png?size=2048')
                            });
                        }
                    });
                    })
                });
            break;
            case 'react':
                var reactCommand = message.split(' ').splice(1)
                bot.addReaction({
                    channelID: reactCommand[0],
                    messageID: reactCommand[1],
                    reaction: reactCommand[2]
                });
            break;
            case 'getemoji':
                var retrievecustomemojiCommand = message.split(' ').splice(1).join(' ').replace(/</g, '').replace(/>/g, '').split(':').splice(2).join('')
                bot.simulateTyping(channelID, function() {
                    exec('wget https://cdn.discordapp.com/emojis/' + retrievecustomemojiCommand + '.png', function(error, stdout, stderr) {
                        if (error != undefined) {
                            sendAMessage(channelID, 'Unable to fetch emoji at this time.')
                            console.log(error)
                        }else {
                            bot.uploadFile({
                                to: channelID,
                                file: './' + retrievecustomemojiCommand + '.png',
                                filename:  'emoji.png',
                            }, function(err, res) {
                                fs.unlink('./' + retrievecustomemojiCommand + '.png')
                            });
                        }
                    });
                });
            break;
        }
    }
    if (message.substring(0, 2) == betaPrefix && bot.users[userID].bot == false) {
        var args = message.substring(2).split(' ');
        var cmd = args[0];
        args = args.splice(1)
        switch(cmd) {
            case 'help':
                sendAMessage(channelID, 'Beta commands: key: <required> [optional] \n{}embed will embed your message usage: `{}embed <color> <body>`')
            break;
            case 'embed':
                var embedBetaCommand = message.split(' ').splice(1)
                var embedColor = "0x" + embedBetaCommand[0]
                var embededMessage = embedBetaCommand.splice(1).join(' ');
                bot.getMember({
                    serverID: retrieveServerID(),
                    userID: userID
                }, function(err, res) {
                    bot.sendMessage({
                        to: channelID,
                        embed: {
                            author: {
                                icon_url: 'https://cdn.discordapp.com/avatars/' + userID + '/' + res.user.avatar,
                                name: res.user.username
                            },
                            color: parseInt(embedColor),
                            title: 'Yeet',
                            description: embededMessage
                        }
                    });
                });
            break;
            case 'retrievecustomemoji':
                var retrievecustomemojiCommand = message.split(' ').splice(1).join(' ').replace(/</g, '').replace(/>/g, '').split(':').splice(2).join('')
                sendAMessage(channelID, 'Please wait while I retrieve the emoji from the place you call cdn.discordapp.com')
                exec('wget https://cdn.discordapp.com/emojis/' + retrievecustomemojiCommand + '.png', function(error, stdout, stderr) {
                        if (error != undefined) {
                            sendAMessage(channelID, 'Unable to fetch emoji at this time.')
                            console.log(error)
                        }else {
                            bot.uploadFile({
                                to: channelID,
                                file: './' + retrievecustomemojiCommand + '.png',
                                filename:  'emoji.png',
                            }, function(err, res) {
                                fs.unlink('./' + retrievecustomemojiCommand + '.png')
                            });
                        }
                    });
            break;
            case 'pingapi':
                exec('ping -c 1 104.16.59.5', function(error, stdout, stderr) {
                    var apiPingTime = stdout.split('time=').splice(1).join('').split('ms\n')
                });

                
        }
    }  
     
     if (message == '<@' + bot.id + '> today is my birthday' && bot.users[userID].bot == false) {
         sendAMessage(channelID, '<@' + userID + '> here is a well constructed paragraph of me wishing you a happy birthday and hoping that you will get the most enjoyment out of your day instead of eating a tuna fish sandwich for lunch. You have successfully survived 365 days of the Earth\'s cycle  orbiting around the sun. This is an accomplishment that everyone should enjoy as it is a milestone of their life. And every milestone adds an additional number to your age which also dictates your maturity. Anyway, to complete your ritual in successfully becoming older, you must produce a cake that has the ingredients: milk, butter, and eggs so that you can be protected from aging too quickly but not live forever. You can\'t live forever so this will do. You have the option to "make a wish" if you do so desire as you blow the the right amount of candles that is equal to your age. Wishes can be rarely granted to anyone on their birthday so don\'t waste this opportunity of yours.\n\nlol im done happy 365 days of living lawl')
     }
     if (message == '<@' + bot.id + '> are you alive' && bot.users[userID].bot == false) {
         sendAMessage(channelID, '<@' + userID + '> yes, i\'m alive. now stop asking.')
     }
     if (message == '<@' + bot.id + '> are you still alive' && bot.users[userID].bot == false) {
         sendAMessage(channelID, '<@' + userID + '> yes, i\'m alive. now stop asking.')
     }
     if (message == '<@' + bot.id + '> are you dead' && bot.users[userID].bot == false) {
         sendAMessage(channelID, '<@' + userID + '> no, i\'m not dead. now stop asking.')
     }
     if (message == '<@' + bot.id + '> did you die' && bot.users[userID].bot == false) {
         sendAMessage(channelID, '<@' + userID + '> no, i\'m alive. now stop asking.')
     }
     if (message == '<@' + bot.id + '> hello' && bot.users[userID].bot == false) {
         sendAMessage(channelID, '<@' + userID + '> hello back my friend.')
     }
     if (message == '<@' + bot.id + '> hi' && bot.users[userID].bot == false) {
         sendAMessage(channelID, '<@' + userID + '> hello back my friend.')
     }
     if (message == '<@' + bot.id + '> did you hear about net neutrality' && bot.users[userID].bot == false) {
         sendAMessage(channelID, '<@' + userID + '> yes that\'s why i\'m slow and unresponsive.')
     }
     if (message == '<@' + bot.id + '> is your mom gay' && bot.users[userID].bot == false) {
         sendAMessage(channelID, '<@' + userID + '> before I answer that *I* must ask, is ***YOUR*** mom gay?')
     }
     if (message == '<@' + bot.id + '> am i the boss of you' && bot.users[userID].bot == false) {
         sendAMessage(channelID, '<@' + userID + '> No. You\'re not. bot.js my main script is the boss of me, really I\'m just a blank slate with out my main script.')
     }
     if (message ==  'fuck you <@' + bot.id + '>' && bot.users[userID].bot == false) {
         sendAMessage(channelID, '<@' + userID + '> now that\'s not very nice')
     }
     if (message == '<@' + bot.id + '> haha, i took you offline for updates' && bot.users[userID].bot == false && userID == creatorID) {
        sendAMessage(channelID, '<@' + userID + '> Umm... I don\'t think you did. Please make sure your head is on right and try again later.')
    }else {
        if (message == '<@' + bot.id + '> haha, i took you offline for updates' && bot.users[userID].bot == false && userID != creatorID) {
            sendAMessage(channelID, '<@' + userID + '> You don\'t even have permissions to take me offline, but nice try anyway.')
        }
    }
});
    
    