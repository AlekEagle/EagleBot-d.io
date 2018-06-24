var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./.auth.json');
var fs = require('fs');
var pmx = require('pmx').init({
    http : true,
    ignore_routes : [/socket\.io/, /notFound/],
    errors : true,
    custom_probes : true,
    network : true,
    ports : true
});
var prefix = ','
var timesCancerHasBeenCured = 0;
var theServerID = '361281425284136962'
var creatorID = '222882552472535041';
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
   token: auth.token,
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

bot.on('message', function (user, userID, channelID, message, event) {
    
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `,`
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
                sendAMessage(channelID, ',help: displays this\n,curecancer cures cancer! (sometimes)\n,say makes the bot say something\n,revivechat might revive chat, not 100% sure\n,deadchat engraves the fact that the chat is dead and nothing will change that\n,cancercured will show you how many times cancer has been cured\n,whatsnew shows what is new about the bot\n,config will help you configure the bot example: `,config op-roles @role(s)`\n,touch is kinda kinky ex: `,touch _____`\n,die will kill whoever you ping ex: `,die @person`\n,succ is very gay ex: `,succ _____`\n,meme has multiple arguements! to use this command, you are probably going to have to ask someone who added a meme to the list. the first arguement is savememe ex: `,meme savememe (meme_name_substitute_spaces_with_dashes_or_underscores) (meme to store, to store pictures use the picture link)` arg 2: readmeme recalls meme ex: `,meme showmeme (meme_name_substitute_spaces_with_dashes_or_underscores)` Arg 3: listmeme lists all da memes ex: `,meme listmeme` NOTE: some memes are inside jokes and you will probably need to know about the server or what the meme is directed at.\n,invite will give you the link to invite the bot\n,anti-hack will activate my bot\'s anti hack measures NOTE: Don\'t spam it or i\'ll remove it!\n,emoji will change any sentence into emojis `a` ab` and `o` will have their red counterparts!\n,info gives info about bot\n,uptime shows uptime of my computer and bot')
                sendAMessage(channelID, 'To use These commands you **MUST** configure the bot to use them first:\n,del will delete the number of messages specified example: `,del 10`\n,setnick will change a persons nickname example: `,setnick @personguy nickname`\n,grantrole and ,revokerole will give and remove someones role example: `,grantrole(revokerole) @person @role` **YOU MUST BE ABLE TO PING THE ROLE TO GRANT IT**\n,qotd is a question of the day command example: `,qotd #qotd_answer this is the qotd`\n,announcement is an announcement command example: `,announcement #announcements this is the announcement`\n,ban will ban someone (kinda obvious) ex: `,ban @person`\n,unban is ,ban\'s counterpart ex: `,unban userID` *Note: You will need to have developer mode on in the settings to get the userID I recommend to Google search for a tutorial*\n,kick kicks someone from the server ex: `,kick @person`\n,mute ,unmute ,deafen and ,undeafen are all commands to mute, unmute, deafen, and undeafen users in voice channels ex: `,mute|unmute|deafen|undeafen @person`')
            break;
            case 'curecancer':
                var rNG  = Math.floor(Math.random() * 100);
//                var rNG = 100;
                if (rNG < 99) {
                  sendAMessage(channelID, ':skull: During your quest to cure cancer, you died from, *Ironically*, cancer, nice try, just so you know, cancer is uncureable, or is it?')
                  console.log(rNG);
                }else {
                        sendAMessage(channelID, 'You somehow cured all types of cancer! <@' + userID + '> actually did it! *We all thought you were crazy*')
                    console.log(rNG);
                    fs.readFile('cancercured.txt', function(err, data) {
                        var string = data.toString('utf8')
                        var numForCancer = parseInt(string)
                        fs.writeFile('cancercured.txt', ++numForCancer)
                    })
                }
            break;
            case 'setnick':
                bot.getMember({
                    serverID: retrieveServerID(),
                    userID: userID
                }, (e, aa) => {
//                    console.log(aa)
                    fs.readFile('./allowed_roles/' + retrieveServerID() + '.settings', function(err, data) {
                        var string = data.toString('utf8').replace(/,/g, '; ');
                        var i = 0;
                        var y = 0;
                        var noPerm = false;
                        var stopLoop = false;
                        do {
//                            console.log(noPerm)
//                            console.log(stopLoop)
//                            console.log(aa.roles[y])
                            if (string.includes(aa.roles[y]) == true && noPerm != true) {
                                var setnick = message.substring(1).split(' ');
                                var nickUserID = setnick[1];
                                nickUserID = nickUserID.replace(/<@/g, '').replace(/!/g, '').replace(/>/g, '');
                                var nickToSetTo = message.split(' ').splice(2).join(' ');
                                stopLoop = 1;
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
                        } 
                        //    console.log('tag: \'' + vals[0] + '\' vals: \''+ vals[1] + '\'')
                    });
                    

                });
            break;
            case 'say':
                var sayCommand = message.split(' ').slice(1).join(' ')
                delPrevMessage();
                sendAMessage(channelID, sayCommand)
            break;
            case 'del':
                bot.getMember({
                    serverID: retrieveServerID(),
                    userID: userID
                }, (e, aa) => {
                    console.log(aa)
                    fs.readFile('./allowed_roles/' + retrieveServerID() + '.settings', function(err, data) {
                        var string = data.toString('utf8').replace(/,/g, '; ');
                        var i = 0;
                        var y = 0;
                        var noPerm = false;
                        var stopLoop = false;
                        do {
                            console.log(noPerm)
                            console.log(stopLoop)
                            console.log(aa.roles[y])
                            if (string.includes(aa.roles[y]) == true && noPerm != true) {
                                var deleCommand = message.substring(1).split(' ', '2')
                                var numToDelete = deleCommand[1];
                                parseNumToDelete = parseInt(numToDelete);
                                parsedNumToDelete = parseNumToDelete + 1;
                                bot.getMessages({
                                    channelID: channelID,
                                    limit: parsedNumToDelete
                                }, (e, a) => {
//                                    console.log(a);
                                    bot.deleteMessages({channelID, messageIDs: a.map(m => m.id)}, () => {
                                        sendAMessage(channelID, 'deleted ' + numToDelete + ' messages. :thumbsup:')
                                    });
                                });
                                stopLoop = 1;
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
                        } 
                        //    console.log('tag: \'' + vals[0] + '\' vals: \''+ vals[1] + '\'')
                    });
                    

                });
                
            break;
            case 'revivechat':
                console.log(userID);
                sendAMessage(channelID, '<@' + userID + '> used Revive Chat! It\'s super effective! NOW EVERYONE WAKE UP!!!!!');
            break;
            case 'deadchat':
                sendAMessage(channelID, '*A strange and spooky silence falls over <#' + channelID + '> as everyone stopped typing and most likely died*');
            break;
            case 'cancercured':
            fs.readFile('cancercured.txt', function(err, data) {
                timesCancerHasBeenCured = data.toString('utf8')
                sendAMessage(channelID, 'cancer has been cured: ' + timesCancerHasBeenCured + ' times since me and AlekEagle started to keep track');
            });
            break;
            case 'qotd':
                bot.getMember({
                    serverID: retrieveServerID(),
                    userID: userID
                }, (e, aa) => {
                    console.log(aa)
                    fs.readFile('./allowed_roles/' + retrieveServerID() + '.settings', function(err, data) {
                        var string = data.toString('utf8').replace(/,/g, '; ');
                        var i = 0;
                        var y = 0;
                        var noPerm = false;
                        var stopLoop = false;
                        do {
                            console.log(noPerm)
                            console.log(stopLoop)
                            console.log(aa.roles[y])
                            if (string.includes(aa.roles[y]) == true && noPerm != true) {
                                var qotdCommand = message.split(' ').slice(1)
                                var sendChannel = message.split(' ', 2).slice(1).join().replace(/<#/g, '').replace(/>/g, '')
                                var qotdMessageBefore = message.split(' ').slice(3).join(' ')
                                console.log(sendChannel)
                                var answerChannel = message.split(' ', 3).slice(2).join(' ')
                                var qotdMessage = '@everyone **' + qotdMessageBefore + '** is today\'s Question of the day. Please answer in: ' + answerChannel + '.'
                                sendAMessage(sendChannel, qotdMessage)
                                delPrevMessage();
                                stopLoop = 1;
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
                    console.log(aa)
                    fs.readFile('./allowed_roles/' + retrieveServerID() + '.settings', function(err, data) {
                        var string = data.toString('utf8').replace(/,/g, '; ');
                        var i = 0;
                        var y = 0;
                        var noPerm = false;
                        var stopLoop = false;
                        do {
                            console.log(noPerm)
                            console.log(stopLoop)
                            console.log(aa.roles[y])
                            if (string.includes(aa.roles[y]) == true && noPerm != true) {
                                var announcementCommand = message.split(' ').slice(1)
                                var theChannel = announcementCommand[0].replace(/<#/g, '').replace(/>/g, '')
                                var announcementMessage = '@everyone **' + message.split(' ').slice(2).toString().replace(/,/g, ' ') + '**'
                                delPrevMessage();
                                sendAMessage(theChannel, announcementMessage)
                                stopLoop = 1;
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
                    console.log(aa)
                    fs.readFile('./allowed_roles/' + retrieveServerID() + '.settings', function(err, data) {
                        var string = data.toString('utf8').replace(/,/g, '; ');
                        var i = 0;
                        var y = 0;
                        var noPerm = false;
                        var stopLoop = false;
                        do {
                            console.log(noPerm)
                            console.log(stopLoop)
                            console.log(aa.roles[y])
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
                                stopLoop = 1;
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
                    console.log(aa)
                    fs.readFile('./allowed_roles/' + retrieveServerID() + '.settings', function(err, data) {
                        var string = data.toString('utf8').replace(/,/g, '; ');
                        var i = 0;
                        var y = 0;
                        var noPerm = false;
                        var stopLoop = false;
                        do {
                            console.log(noPerm)
                            console.log(stopLoop)
                            console.log(aa.roles[y])
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
                                stopLoop = 1;
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
                    delPrevMessage();
                }
            	
            break;
            case 'test':
                bot.getMember({
                    serverID: retrieveServerID(),
                    userID: bot.id
                }, function(e, bb) {
                    console.log(bb);
                })
            break;
            case 'config':
                fs.access('./allowed_roles/' + retrieveServerID() + '.settings', fs.constants.F_OK, (err) => {
                    if (err == null) {
                        bot.getMember({
                            serverID: retrieveServerID(),
                            userID: userID
                        }, (e, aa) => {
                            console.log(aa)
                            fs.readFile('./allowed_roles/' + retrieveServerID() + '.settings', function(err, data) {
                                var string = data.toString('utf8').replace(/,/g, '; ');
                                var i = 0;
                                var y = 0;
                                var noPerm = false;
                                var stopLoop = false;
                                do {
                                    console.log(noPerm)
                                    console.log(stopLoop)
                                    console.log(aa.roles[y])
                                    if (string.includes(aa.roles[y]) == true && noPerm != true) {
                                        stopLoop = 1;
                                        var configCommand = message.split(' ').slice(1)
                                        if (configCommand[0] =! undefined && configCommand[0] == 'op-roles' && configCommand[1] != undefined) {
                                        var allowedRoles = message.split(' ').splice(2).toString().replace(/,/g, '; ').replace(/<@&/g, '').replace(/>/g, '');
                                        fs.writeFileSync('./allowed_roles/' + retrieveServerID() + '.settings', allowedRoles);
                                        sendAMessage(channelID, 'Your selections have been stored in the database! If you ever need to change them, use this command again!')
                    
                                    }else {
                                        sendAMessage(channelID, 'Please use `,config op-roles (ping roles)`')
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
                                } 
                            });
                        });
                    }else {
                        var configCommand = message.split(' ').slice(1)
                        if (configCommand[0] =! undefined && configCommand[0] == 'op-roles' && configCommand[1] != undefined) {
                            var allowedRoles = message.split(' ').splice(2).toString().replace(/,/g, '; ').replace(/<@&/g, '').replace(/>/g, '');
                            fs.writeFileSync('./allowed_roles/' + retrieveServerID() + '.settings', allowedRoles);
                            sendAMessage(channelID, 'Your selections have been stored in the database! If you ever need to change them, use this command again!')
                    
                        }else {
                            sendAMessage(channelID, 'Please use `,config op-roles (ping roles)`')
                        }
                        delPrevMessage();
                    }
                })
            break;
            case 'whatsnew':
                sendAMessage(channelID, 'Bot version: `1.2.0 the "AlekEagle#6978 got to work" update`\nAdded `,mute`, `,unmute`, `,deafen`, and `,undeafen` as what can be called utility commands (P.S. they need permissions, which means you need to use `,config op-roles` to use them without crashing me, see ,help for more info) fun commands added are: `,touch`, `,die`, `,succ`, `,meme`, and `,emoji`')
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
                    console.log(aa)
                    fs.readFile('./allowed_roles/' + retrieveServerID() + '.settings', function(err, data) {
                        var string = data.toString('utf8').replace(/,/g, '; ');
                        var i = 0;
                        var y = 0;
                        var noPerm = false;
                        var stopLoop = false;
                        do {
                            console.log(noPerm)
                            console.log(stopLoop)
                            console.log(aa.roles[y])
                            if (string.includes(aa.roles[y]) == true && noPerm != true) {
			    var banCommand = message.split(' ').splice(1).toString('utf8').replace(/<@/g, '').replace(/>/g, '')
                             bot.ban({
                                 serverID: retrieveServerID(),
                                 userID: banCommand
                             });
                sendAMessage(channelID, 'banned <@' + banCommand + '>')
                                stopLoop = 1;
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
                    console.log(aa)
                    fs.readFile('./allowed_roles/' + retrieveServerID() + '.settings', function(err, data) {
                        var string = data.toString('utf8').replace(/,/g, '; ');
                        var i = 0;
                        var y = 0;
                        var noPerm = false;
                        var stopLoop = false;
                        do {
                            console.log(noPerm)
                            console.log(stopLoop)
                            console.log(aa.roles[y])
                            if (string.includes(aa.roles[y]) == true && noPerm != true) {
			    var unbanCommand = message.split(' ').splice(1).toString('utf8').replace(/<@/g, '').replace(/>/g, '')
                             bot.unban({
                                 serverID: retrieveServerID(),
                                 userID: unbanCommand
                             });
                sendAMessage(channelID, 'unbanned <@' + unbanCommand + '>')
                                stopLoop = 1;
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
                    console.log(aa)
                    fs.readFile('./allowed_roles/' + retrieveServerID() + '.settings', function(err, data) {
                        var string = data.toString('utf8').replace(/,/g, '; ');
                        var i = 0;
                        var y = 0;
                        var noPerm = false;
                        var stopLoop = false;
                        do {
                            console.log(noPerm)
                            console.log(stopLoop)
                            console.log(aa.roles[y])
                            if (string.includes(aa.roles[y]) == true && noPerm != true) {
			    var kickCommand = message.split(' ').splice(1).toString('utf8').replace(/<@/g, '').replace(/>/g, '')
                             bot.kick({
                                 serverID: retrieveServerID(),
                                 userID: kickCommand
                             });
                sendAMessage(channelID, 'kicked <@' + kickCommand + '>')
                                stopLoop = 1;
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
                        } 
                        //    console.log('tag: \'' + vals[0] + '\' vals: \''+ vals[1] + '\'')
                    });
                    

                });
            break;
            case 'die':
                var dieCommand = message.split(' ').splice(1)
                sendAMessage(channelID, dieCommand + ' absloutely got rekt and had the bum sex done to them by <@' + userID + '>')
            break;
            case 'succ':
                var succCommand = message.split(' ').splice(1).join(' ').replace(/my/g, 'your').replace(/im/g, 'you\'re').replace(/i'm/g, 'you\'re').replace(/Im/g, 'you\'re').replace(/I'm/g, 'you\'re');
                sendAMessage(channelID, '*succed ' + succCommand + '*');
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
                                }else {
                                    fs.writeFile('./good_memes_probably/' + saveMemeCommand[0] + '.meme', meme2Save)
                                    delPrevMessage()
                                    sendAMessage(channelID, 'saved your meme even though it sucks')
                                }
                            }else {
                                fs.writeFile('./good_memes_probably/' + saveMemeCommand[0] + '.meme', meme2Save)
                                delPrevMessage()
                                sendAMessage(channelID, 'saved your meme even though it sucks')
                            }
                        })
                    break;
                    case 'showmeme':
                        var readMemeCommand = message.split(' ').splice(2)
                        fs.readFile('./good_memes_probably/' + readMemeCommand[0] + '.meme', function(err, data) {
                            sendAMessage(channelID, `${err ? 'OOF error whoops! ' + err : 'dis da maymay you requested: ' + data.toString('utf8')}`)
                        });
                    break;
                    case 'listmeme':
                        fs.readdir('./good_memes_probably/', function(err, files) {
                            sendAMessage(channelID, 'The memes we have so far are: ' + files.join(', ').replace(/.meme/g, ''))
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
                        }
                }
            break;
            case 'mute':
                bot.getMember({
                    serverID: retrieveServerID(),
                    userID: userID
                }, (e, aa) => {
                    console.log(aa)
                    fs.readFile('./allowed_roles/' + retrieveServerID() + '.settings', function(err, data) {
                        var string = data.toString('utf8').replace(/,/g, '; ');
                        var i = 0;
                        var y = 0;
                        var noPerm = false;
                        var stopLoop = false;
                        do {
                            console.log(noPerm)
                            console.log(stopLoop)
                            console.log(aa.roles[y])
                            if (string.includes(aa.roles[y]) == true && noPerm != true) {
                                stopLoop = 1;
                                var muteCommand = message.split(' ').splice(1).join('').replace(/<@/g, '').replace(/>/g, '')
                                bot.mute({
                                    serverID: retrieveServerID(),
                                    userID: muteCommand
                                })
                                delPrevMessage();
                                sendAMessage(channelID, 'Ok they am muted');
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
                        } 
                        //    console.log('tag: \'' + vals[0] + '\' vals: \''+ vals[1] + '\'')
                    });
                

                });
            break;
            case 'invite':
                sendAMessage(channelID, 'Ok the link to invite me is: https://discordapp.com/api/oauth2/authorize?client_id=416274552126177282&permissions=499645511&redirect_uri=https%3A%2F%2Fdiscord.gg%2FKNvbtCb&scope=bot')
            break;
            case 'anti-hack':
                sendAMessage(channelID, '<@' + userID + '> has activated my anti-hack defenses! anyone trying to hacc me will parish, ~~(and it probably won\'t happen because <@' + creatorID + '> will try not to make the mistake again)~~')
            break;
            case 'github':
                sendAMessage(channelID, 'here: https://github.com/AlekEagleYT/Discord-Bot')
            break;
            case 'emoji':
                var emojiCommand = message.split(' ').splice(1).join(' ').replace(/ /g, '    ').replace(/ab/ig, '🆎 ').replace(/a/ig, '🅰️ ').replace(/b/ig, '🅱️ ').replace(/c/ig, '🇨 ').replace(/d/ig, '🇩 ').replace(/e/ig, '🇪 ').replace(/f/ig, '🇫 ').replace(/g/ig, '🇬 ').replace(/h/ig, '🇭 ').replace(/i/ig, '🇮 ').replace(/j/ig, '🇯 ').replace(/k/ig, '🇰 ').replace(/l/ig, '🇱 ').replace(/m/ig, '🇲 ').replace(/n/ig, '🇳 ').replace(/p/ig, '🇵 ').replace(/q/ig, '🇶 ').replace(/s/ig, '🇸 ').replace(/t/ig, '🇹 ').replace(/u/ig, '🇺 ').replace(/v/ig, '🇻 ').replace(/w/ig, '🇼 ').replace(/x/ig, '🇽 ').replace(/y/ig, '🇾 ').replace(/z/ig, '🇿 ').replace(/r/ig, '🇷 ').replace(/o/ig, '🅾️ ');
                delPrevMessage();
                sendAMessage(channelID, emojiCommand);
            break;
            case 'unmute':
                bot.getMember({
                    serverID: retrieveServerID(),
                    userID: userID
                }, (e, aa) => {
                    console.log(aa)
                    fs.readFile('./allowed_roles/' + retrieveServerID() + '.settings', function(err, data) {
                        var string = data.toString('utf8').replace(/,/g, '; ');
                        var i = 0;
                        var y = 0;
                        var noPerm = false;
                        var stopLoop = false;
                        do {
                            console.log(noPerm)
                            console.log(stopLoop)
                            console.log(aa.roles[y])
                            if (string.includes(aa.roles[y]) == true && noPerm != true) {
                                stopLoop = 1;
                                var unmuteCommand = message.split(' ').splice(1).join('').replace(/<@/g, '').replace(/>/g, '')
                                bot.unmute({
                                    serverID: retrieveServerID(),
                                    userID: unmuteCommand
                                })
                                delPrevMessage();
                                sendAMessage(channelID, 'Ok they am unmuted');
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
                    console.log(aa)
                    fs.readFile('./allowed_roles/' + retrieveServerID() + '.settings', function(err, data) {
                        var string = data.toString('utf8').replace(/,/g, '; ');
                        var i = 0;
                        var y = 0;
                        var noPerm = false;
                        var stopLoop = false;
                        do {
                            console.log(noPerm)
                            console.log(stopLoop)
                            console.log(aa.roles[y])
                            if (string.includes(aa.roles[y]) == true && noPerm != true) {
                                stopLoop = 1;
                                var deafenCommand = message.split(' ').splice(1).join('').replace(/<@/g, '').replace(/>/g, '')
                                bot.deafen({
                                    serverID: retrieveServerID(),
                                    userID: deafenCommand
                                })
                                delPrevMessage();
                                sendAMessage(channelID, 'Ok they am deaf');
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
                    console.log(aa)
                    fs.readFile('./allowed_roles/' + retrieveServerID() + '.settings', function(err, data) {
                        var string = data.toString('utf8').replace(/,/g, '; ');
                        var i = 0;
                        var y = 0;
                        var noPerm = false;
                        var stopLoop = false;
                        do {
                            console.log(noPerm)
                            console.log(stopLoop)
                            console.log(aa.roles[y])
                            if (string.includes(aa.roles[y]) == true && noPerm != true) {
                                stopLoop = 1;
                                var undeafenCommand = message.split(' ').splice(1).join('').replace(/<@/g, '').replace(/>/g, '')
                                bot.undeafen({
                                    serverID: retrieveServerID(),
                                    userID: undeafenCommand
                                })
                                delPrevMessage();
                                sendAMessage(channelID, 'Ok they am undeafen');
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
                sendAMessage(channelID, 'Ummm... I\'m a Discord Bot.\n I was made by **__AlekEagle#6978__**\n*What else is there about me?* I use the Discord.io library\nThis right there ==> **__' + uptime + '__** is how long I\'ve been running.\nThe computer running me has been on for this ==> **__' + osUptime + '__** and I\'m ran on a Raspberry Pi 3 B\nI\'m on Discord Bot List the link is https://discordbots.org/bot/416274552126177282 enjoy!\nThat\'s all I know about myself')
            break;
            case 'uptime':
                var time = process.uptime();
                var uptime = (time + "").toHHMMSS();
                var osTime = require('os').uptime();
                var osUptime = (osTime + "").toHHMMSS();
                sendAMessage(channelID, 'I\'ve been alive for **__' + uptime + '__**\nThe computer running me has been online for **__' + osUptime + '__**');
            break;
         }
            }
        
     
//     if (message.includes('my') == true && message.includes('birthday') == true && message.includes('today') == true) {
//         sendAMessage(channelID, '<@' + userID + '> here is a well constructed paragraph of me wishing you a happy birthday and hoping that you will get the most enjoyment out of your day instead of eating a tuna fish sandwich for lunch. You have successfully survived 365 days of the Earth\'s cycle  orbiting around the sun. This is an accomplishment that everyone should enjoy as it is a milestone of their life. And every milestone adds an additional number to your age which also dictates your maturity. Anyway, to complete your ritual in successfully becoming older, you must produce a cake that has the ingredients: milk, butter, and eggs so that you can be protected from aging too quickly but not live forever. You can\'t live forever so this will do. You have the option to "make a wish" if you do so desire as you blow the the right amount of candles that is equal to your age. Wishes can be rarely granted to anyone on their birthday so don\'t waste this opportunity of yours.\n\nlol im done happy 365 days of living lawl')
//     }
});
    
    