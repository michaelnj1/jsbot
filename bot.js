var Discord = require("discord.js");
var bot = new Discord.Client();
let token = require("./config.json").token
let prefix = require("./config.json").prefix
const embed = new Discord.RichEmbed()
const yt = require('ytdl-core');
const moment = require('moment');
require('moment-duration-format')

console.log("yep it has started")



process.on("unhandledRejection", err => {
  console.error(`Uncaught Promise Error: \n${err.stack}`);
});

// roles

bot.on('roleCreate', role => {
    let guild = role.guild;
    guild.defaultChannel.sendMessage(`Role name: ${role.name} has been created`);
});


bot.on('roleDelete', role => {
    let guild = role.guild;
    guild.defaultChannel.sendMessage(`Role name: ${role.name} has been deleted`);
});


//guild stuff

bot.on('guildDelete', guild => {
    bot.channels.get('274989515939250187').sendMessage(`I have left ${guild.name}. I hope to come back there another day.`);
});


bot.on('guildCreate', guild => {
    bot.channels.get('274989515939250187').sendMessage(`I have joined another guild called ${guild.name}!`);
});

bot.on('guildMemberAdd', member => {
    let guild = member.guild;
    guild.defaultChannel.sendMessage(`Thanks to ${member.user.username} for joining ${guild.name}!`);
});

bot.on('guildMemberRemove', member => {
    let guild = member.guild;
    guild.defaultChannel.sendMessage(`Goodbye ${member.user.username} we will miss you!`);
});

bot.on('guildBanAdd', (guild, user) => {

    guild.defaultChannel.sendMessage(`${user.username} was just banned`);
});

bot.on('guildBanRemove', (guild, user) => {
    guild.defaultChannel.sendMessage(`${user.username} was just unbanned!`);
});

// client stuff
bot.on('channelCreate', channel => {
    console.log(`A ${channel.type} channel by the name of ${channel.name} was created ${channel.createdAt} with the ID of ${channel.id}`);
    if (channel.type === 'text') return channel.sendMessage('Channel was created successfully!');
});

bot.on('channelDelete', channel => {
    console.log(`A ${channel.type} by the name of ${channel.name} was successfully deleted.`);
    channel.guild.defaultChannel.sendMessage('Channel deleted successfully');
});


//message event stuff
bot.on("message", msg => {
    if (!msg.content.startsWith(prefix)) return;
    if (msg.author.bot) return;
    let args = msg.content.split(' ').slice(1);
    var argresult = args.join(' ');



       if (msg.content.startsWith(prefix + 'ping')) {
        msg.channel.sendMessage('', {
        embed: {
           color: 3447003,
             title: "Pong!",
             description: `${Date.now() - msg.createdTimestamp} ms`,
       },
     });




    } else if (msg.content.startsWith(prefix + "banne")) {
        msg.reply('', {
        embed: {
           color: 3447003,
             title: "Your Banne",
             description: 'You have been **Banne** from the discord server',
       },
     });

   } else if (msg.content.startsWith(prefix + "server")) {
        msg.channel.sendMessage('', {
        embed: {
           color: 3447003,
             title: "Developers server",
             description: `Check your DMS for an invite! :mailbox:`,
        },
        });
        msg.author.send("Join Brandon Bot Server here discord.gg/xM9RZQU");
        bot.channels.get('275298815622512650').sendMessage(`Join command requested by ${msg.author.username}`);


    } else if (msg.content.startsWith(prefix + "setstatus")) {
        if (msg.author.id !== '150707175214415872') return;
        bot.user.setStatus(argresult);
        msg.channel.sendMessage('', {
        embed: {
           color: 3447003,
             title: "Set Status Command",
             description: 'Status has been successfully set!',
       },
     });

} else if (msg.content.startsWith(prefix + "joinvoice")) {
  const voiceChannel = msg.member.voiceChannel;
  if (!voiceChannel) {
    return msg.reply('', {
    embed: {
       color: 3447003,
         title: "Join Voice Command",
         description: 'Please join the channel you want the bot to join.',
   },
 });
  }
  voiceChannel.join();

    } else if (msg.content.startsWith(prefix + "setgame")) {
        if (msg.author.id !== '150707175214415872') return;
        bot.user.setGame(argresult);
        msg.channel.sendMessage('', {
        embed: {
           color: 3447003,
             title: "Set Game Command",
             description: 'Playing status has been set for the bot',
       },
     });

    } else if (msg.content.startsWith(prefix + "shutdown")) {
        if (msg.author.id !== '150707175214415872') return;
        msg.channel.sendMessage('', {
        embed: {
           color: 3447003,
             title: "Shutting down",
             description: `I\m been shutdown, i\ll be alive soon`,
       },
     });
        process.exit(0);









    } else if (msg.content.startsWith(prefix + "play")) {
              msg.channel.sendMessage('', {
              embed: {
                 color: 3447003,
                   title: "Playing!",
                   description: `Now playing Closer By the chainsmokers`,
              },
              });
             const voiceChannel = msg.member.voiceChannel;
             if (!voiceChannel) {
               return
               msg.reply(`Please be in a voice channel first!`);
             }
             voiceChannel.join()
               .then(connnection => {
                 let stream = yt('https://www.youtube.com/watch?v=PT2_F-1esPk', {audioonly: true});
                 const dispatcher = connnection.playStream(stream);
               });

  } else if (msg.content.startsWith(prefix + "agree")) {
             let member = msg.member;
             member.addRole('278872082853396480');

    } else if (msg.content.startsWith(prefix + "status")) {
                            msg.channel.sendMessage('', {embed : {
                               color: 3447003 ,
                             author: {
                             name: bot.user.username,
                             icon_url: bot.user.avatarURL
                           },
                               title: 'Guilds',
                               description: `**${bot.guilds.size}**`,
                               fields: [

                                 {
                                   name: 'Users',
                                   value: `**${bot.users.size}**`
                                 },
                                 {
                                   name: 'Uptime',
                                   value: `**${moment.duration(bot.uptime).format("D [days], H [hrs], m [mins], s [secs]")}**`
                                 }
                             ],
                             timestamp: new Date(),
                             footer: {
                               icon_url: bot.user.avatarURL,
                               text: 'JS Bot'
}
}
});

 } else if (msg.content.startsWith(prefix + "play")) {
console.log('I am now going to play', msg.content);
const chan = msg.content.split(' ').slice(1).join(' ');
con.playStream(ytdl(chan, {filter : 'audioonly'}), { passes : 4 });

} else if (msg.content.startsWith(prefix + "invite")) {
  msg.channel.sendMessage()

    } else if (msg.content.startsWith(prefix + "help")) {
        msg.channel.sendMessage('', {
        embed: {
           color: 3447003,
             title: "Help!",
             description: `Check your dms for my help command! :mailbox: :eyes:`,
        },
        });
        bot.channels.get('275298815622512650').sendMessage(`Help commmed requested by ${msg.author.username}`);
        msg.author.send("", {
            embed: {
                color: 3447003,
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL
                },
                title: 'JS Bot Commands',
                url: 'http://discord.gg/xM9RZQU',
                description: 'Please note that this bots prefix is `!!`',
                fields: [{
                        name: 'Default Commands',
                        value: '**!!help** - this message \n**!!ping** - the legit ping\n**!!banne** - it just says your banne!\n**!!BBS** - Outputs an invite to the owners server @ him if you need help\n**!!avatar** - gets your avatar\n**!!status** - displays info about the bot\n **!!play** - plays closer by the chainsmokers.'
                    },
                    {
                        name: 'Developer Commands',
                        value: '**!!shutdown** - Shuts the bot down.\n**!!setgame** - sets the playing status\n**!!setstatus** - sets the status, online. idle, dnd, invisible'
                    },
                ],
                timestamp: new Date(),
                footer: {
                    icon_url: bot.user.avatarURL,
                    text: 'JS Bot'
                }

            }
        });
    }
});
bot.login(token);
