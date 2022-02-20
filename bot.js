const discordAPI = require("discord.js");
const config = require("./config/config.json");
const { get } = require("snekfetch");

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

            **?luis** - luis
            **?julio** - julio
            **?gui** - o grande
            **?seila** - envia imagens
            **?vitor** - vitor
            **?help** - ajudinha
            
            `);
            return;
        case "julio":
            try {
                meow(message);
                message.channel.send("Júlio, eu te amo &hearts");
            } catch (err) {
                message.reply("Erro: ", err);
            }
            return;
        case "luis":
            var count = 0;
            while (count < 3) {
                setTimeout(() => {
                    message.reply("Sim, o Luís é lindo!")
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
            var embed = RandomImage();

            try {
                message.channel.send(embed);
            } catch (e) {
                console.log("Erro ", e);
                message.reply("erro");
            }
            return;
        default:
            message.reply("Digita alguma opção válida! Tenta chutar!");
            return;
    }
});

client.on("disconnect", () => {
    console.log("Disconectado do server!");
});

client.on("error", (error) => {
    console.error("Erro no bot: ", error);
});

function RandomImage() {
    var randomImage = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const images = [
        '',
        '',
        '',
        '',
        ''
    ];

    const path = './images/amigos/';
    const image = randomImage(images);

    const embed = new discordAPI.MessageEmbed()
        .setTitle('homem')
        .setAuthor('homem')
        .attachFiles([`${path}${image}`])
        .setImage(`attachment://${image}`);

    return embed;
}

async function meow(message) {
    try {
        get('https://aws.random.cat/meow').then(response => {
            message.channel.send({ files: [{ attachment: response.body.file, name: `cat.${response.body.file.split('.')[4]}` }] });
        })
    } catch (e) {
        console.log('Error Meow!');
    }
}

client.login(config.BOT_TOKEN);