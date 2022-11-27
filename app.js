


const ora = require('ora');
const chalk = require('chalk');
const { Client, LocalAuth, Buttons, List } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const spinner = ora(`Cargando ${chalk.yellow('Validando session con Whatsapp ...')}`);


let client;


const main = () => {

    
    spinner.start();


    client = new Client({
        authStrategy: new LocalAuth({ clientId: "client-one" })
    });
    

    client.on('qr', qr => {
        console.log('QR RECEIVED', qr);
        qrcode.generate(qr, { small: true });
    });
    
    client.on('ready', () => {
        // console.log('READY');
        spinner.stop;
        listenMessage();
    });
    
    
    client.initialize();

    
}

const listenMessage = () => {


    client.on('message', async msg => {
        console.log('MESSAGE RECEIVED', msg);
        
        const { from, to, body } = msg;

        console.log(from, to, body);

        switch (body) {
            case 'Hola':
                sendMessage(from, 'Hola bienvenido');
                break;
            default:
                sendMessage(from, 'Hola bienvenido');
                break;
        }

        
    });


}

const sendMessage = (to, message) => {

    client.sendMessage(to, message);

}

const sendMedia = (to, message) => {

    

}



main();