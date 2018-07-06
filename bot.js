const Discord = require('discord.io');
const logger = require('winston');
const u_wot_m8 = require('./.auth.json');
const fs = require('fs');
const sys = require('sys');
const exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout) }
const request = require('request');
const pmx = require('pmx').init({
    http : true,
    ignore_routes : [/socket\.io/, /notFound/],
    errors : true,
    custom_probes : true,
    network : true,
    ports : true
});
const prefix = '}'
const timesCancerHasBeenCured = 0;
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
            name: 'Prefix: ' + prefix
        }
    });
    console.log('Connected');
    console.log('Logged in as: ');
    console.log(bot.username + ' - (' + bot.id + ')');
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

    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `}`
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
   
     if (message.substring(0, 1) == prefix && bot.users[userID].bot == false) {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       args = args.splice(1);
        switch(cmd) {
            case 'help':
                sendAMessage(channelID, '}help: displays this\n}curecancer cures cancer! (sometimes)\n}say makes the bot say something\n}revivechat might revive chat, not 100% sure\n}deadchat engraves the fact that the chat is dead and nothing will change that\n}cancercured will show you how many times cancer has been cured\n}whatsnew shows what is new about the bot\n}config will help you configure the bot example: `}config op-roles @role(s)`\n}touch is kinda kinky ex: `}touch _____`\n}die will kill whoever you ping ex: `}die @person`\n}succ is very gay ex: `}succ _____`\n}meme has multiple arguements! to use this command, you are probably going to have to ask someone who added a meme to the list. the first arguement is savememe ex: `}meme savememe (meme_name_substitute_spaces_with_dashes_or_underscores) (meme to store, to store pictures use the picture link)` arg 2: showmeme recalls meme ex: `}meme showmeme (meme_name_substitute_spaces_with_dashes_or_underscores)` Arg 3: listmeme lists all da memes ex: `}meme listmeme` NOTE: some memes are inside jokes and you will probably need to know about the server or what the meme is directed at.\n}invite will give you the link to invite the bot\n}anti-hack will activate my bot\'s anti hack measures NOTE: Don\'t spam it or i\'ll remove it!\n}emoji will change any sentence into emojis `a` `ab` and `o` will have their red counterparts!\n}info gives info about bot\n}uptime shows uptime of my computer and bot\n}ping will return the bots ping\n}reportbug will report a bug\n}suggestcmd will suggest a command\n}blowup will blow you up\n}vote will allow you to vote for me')
                sendAMessage(channelID, 'To use These commands you **MUST** configure the bot to use them first:\n}del will delete the number of messages specified example: `}del 10`\n}setnick will change a persons nickname example: `}setnick @personguy nickname`\n}grantrole and }revokerole will give and remove someones role example: `}grantrole(revokerole) @person @role` **YOU MUST BE ABLE TO PING THE ROLE TO GRANT IT**\n}qotd is a question of the day command example: `}qotd #qotd_answer this is the qotd`\n}announcement is an announcement command example: `}announcement #announcements this is the announcement`\n}ban will ban someone (kinda obvious) ex: `}ban @person`\n}unban is }ban\'s counterpart ex: `}unban userID` *Note: You will need to have developer mode on in the settings to get the userID I recommend to Google search for a tutorial*\n}kick kicks someone from the server ex: `}kick @person`\n}mute }unmute }deafen and }undeafen are all commands to mute, unmute, deafen, and undeafen users in voice channels ex: `}mute|unmute|deafen|undeafen @person`')
                bot.getMember({
                    serverID: retrieveServerID(),
                    userID: userID
                }, function(e, bb) {
                    console.log(bb);
                    console.log('Used help!');
                });
            break;
            case 'curecancer':
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
                                        sendAMessage(channelID, 'deleted ' + numToDelete + ' messages. :thumbsup:');
                                        bot.getMember({
                                            serverID: retrieveServerID(),
                                            userID: userID
                                        }, function(e, bb) {
                                            console.log(bb);
                                            console.log('Used del!');
                                        });
                                        setTimeout(delPrevMessage(), 5000);
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
                sendAMessage(channelID, 'Bot version: `1.2.0 the "AlekEagle#6978 got to work" update`\nAdded `}vote`, `}suggestcmd`, `}reportbug`, `}ping`, and `}blowup`.')
                bot.getMember({
                    serverID: retrieveServerID(),
                    userID: userID
                }, function(e, bb) {
                    console.log(bb);
                    console.log('Used whatsnew!');
                });
            break;
            case 'touch':
                var touchCommand = message.split(' ').splice(1).join(' ').replace(/my/g, 'your').replace(/im/g, 'you\'re').replace(/i'm/g, 'you\'re').replace(/Im/g, 'you\'re').replace(/I'm/g, 'you\'re')
                sendAMessage(channelID, '*touched ' + touchCommand + '*')
            break;
            case 'ban':
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
                            sendAMessage(channelID, `${err ? 'OOF error whoops! ' + err : 'dis da maymay you requested: ' + data.toString('utf8')}`)
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
                                sendAMessage(channelID, `${err ? 'OOF error whoops! ' + err : 'It\'s most likely gone, yeah I\'m pretty sure it\'s gone'}`)
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
                sendAMessage(channelID, 'here: https://github.com/AlekEagleYT/Discord-Bot')
                bot.getMember({
                    serverID: retrieveServerID(),
                    userID: userID
                }, function(e, bb) {
                    console.log(bb);
                    console.log('Used github!');
                });
            break;
            case 'emoji':
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
                var time = process.uptime();
                var uptime = (time + "").toHHMMSS();
                var osTime = require('os').uptime();
                var osUptime = (osTime + "").toHHMMSS();
                sendAMessage(channelID, 'Ummm... I\'m a Discord Bot.\n I was made by **__AlekEagle#6978__**\n*What else is there about me?* I use the Discord.io library\nThis right there ==> **__' + uptime + '__** is how long I\'ve been running.\nThe computer running me has been on for this ==> **__' + osUptime + '__**\nI\'m ran on a Raspberry Pi 3 B\nI\'m on Discord Bot List link: https://discordbots.org/bot/416274552126177282 \nI\'m in... uhh... let me check. Ok here it is: **__' + Object.keys(bot.servers).length + '__** servers.\nThe support server is https://discord.gg/xGUC7Uh in the category "bot related stuff"\nUse `}invite` to take a clone of me with you to your server\nThat\'s all I know about myself')
                bot.getMember({
                    serverID: retrieveServerID(),
                    userID: userID
                }, function(e, bb) {
                    console.log(bb);
                    console.log('Used info!');
                });
            break;
            case 'uptime':
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
            case 'stapandreboot':
                if (userID == creatorID) {
                    process.exit(0)
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
                if (userID == creatorID) {
                    try {
                        var evalCommand = message.split(' ').splice(1).join(' ').replace(/;/g, '\;');
                        sendAMessage(channelID, eval(evalCommand));
                        var err = new Error('Whoops');
                        throw err;
                    } catch (err) {
                        console.log(err);
                        sendAMessage(channelID, 'OOF, I did done a goof! This is what happened: ```' + err.stack + '```');
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
                sendAMessage(channelID, 'You went kaboom and died')
                bot.getMember({
                    serverID: retrieveServerID(),
                    userID: userID
                }, function(e, bb) {
                    console.log(bb);
                    console.log('Used blowup!');
                });
            break;
            case 'ping':
                const then = Date.now();
                bot.sendMessage({
                    to: channelID,
                    message: 'Pinging...'
                }, function (err, res) {
                    bot.editMessage({
                        channelID: channelID,
                        messageID: res.id,
                        message: 'Pong! ' + (Date.now() - then) + 'ms'
                    });
                })
                bot.getMember({
                    serverID: retrieveServerID(),
                    userID: userID
                }, function(e, bb) {
                    console.log(bb);
                    console.log('Used ping!');
                });
            break;
            case 'reportbug':
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
                if (userID == creatorID) {
                    var execCommand = message.split(' ').splice(1).join(' ');
                    exec(execCommand, function (error, stdout, stderr) {
                        if (error != undefined && stderr != undefined) {
                            sendAMessage(channelID, 'OOF, i broke! ```' + error + '\n' + stdout + '```');
                        }else {
                            sendAMessage(channelID, stdout);
                        }
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
                sendAMessage(channelID, 'Vote for me at: https://discordbots.org/bot/416274552126177282/vote because yeet.')
                bot.getMember({
                    serverID: retrieveServerID(),
                    userID: userID
                }, function(e, bb) {
                    console.log(bb);
                    console.log('Used vote!');
                });
            break;
            
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
    
    