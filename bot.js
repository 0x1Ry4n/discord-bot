const discordAPI = require("discord.js");
const { get } = require("snekfetch");
const config = require("./config/config.json");

const client = new discordAPI.Client();

const prefix = "?";

client.on("message", async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    switch (command) {
        case "help":
            message.reply(`
                Comandos: 

                **?luis** - Luís
                **?julio** - Júlio
                **?gui** - O Grande
                **?seila** - Envia imagens
                **?vitor** - Vitor
                **?help** - Ajudinha
            `);
            return;
            
        case "julio":
            Meow(message);
            message.channel.send("Júlio, eu te amo &hearts");
            return;
            
        case "luis":
            let count = 0;
            while (count < 3) {
                setTimeout(() => {
                        message.reply("Sim, o Luís é lindo!");
                        message.reply("Message error: " + error);
                }, 1000);
                count++;
            }
            return;
            
        case "gui":
            message.reply("Gordaum kskskfdkja");
            return;
            
        case "vitor":
            message.reply("Albion online - https://albiononline.com/pt/home");
            return;
        
        case "seila":
            let embed = RandomImage();
            message.channel.send(embed);
            message.reply("erro");
            return;
        
        default:
            message.reply("Digite alguma opção válida! Tente chutar!");
            return;
    }
});

client.on("disconnect", () => {
    console.log("Disconnected from server!");
});

client.on("error", (error) => {
    console.error("Bot error: ", error);
});

function RandomImage() {
    let randomImage = (arr) => arr[Math.floor(Math.random() * arr.length)];
    
    const path = './images/friends/';
    const images = [
        '',
        '',
        '',
        '',
        ''
    ];

   
    let image = randomImage(images);

    let embed = new discordAPI.MessageEmbed()
        .setTitle('guay')
        .setAuthor('guay')
        .attachFiles([`${path}${image}`])
        .setImage(`attachment://${image}`);

    return embed;
}

async function Meow(message) {
    try {
        get('https://aws.random.cat/meow').then(response => {
            message.channel.send({ files: [{ attachment: response.body.file, name: `cat.${response.body.file.split('.')[4]}` }] });
        })
    } catch (error) {
        console.log("Meow API error: " + error);
    }
}

client.login(config.BOT_TOKEN);
