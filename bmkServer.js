/**
 * Created by Milos on 11.12.2014..
 */

var net = require("net");

const LAG = 2000;               //because Baja Mali Knindza needs some time to think
const DELIMETER = "\\/|\\|\\/"; //if you look closely, it spells out VNV, as in VNV Nation

var incomingData = '';
var messageBag = '';            //structure used for storing data (PoC)
var message = [];

net.createServer(function(socket) {
    socket.setEncoding("utf8");

    socket
        .on("data", function(data) {
            if (data.toString() !== '~') {
                console.log(data.toString());
                socket.write(data.toString());
                incomingData += data.toString();
            } else {
                message = incomingData.split(DELIMETER);

                switch (message[0]) {
                    case "DJE_SI_GRGA_DRUZE_STARI":
                        socket.write("ZA_NAPLATU_TI_NE_MARI\n");
                        break;

                    case "VOZI_ME_ZA_SURCIN_PREKO_LEDINA":
                        messageBag += message[1] + "\n";
                        setTimeout(function() {
                            socket.write("TAMO_ZIVI_MOJA_JEDINA\n");
                        }, LAG);
                        break;

                    case "VREME_BRZO_PROLAZI":
                        setTimeout(function() {
                            socket.write("GODINE_ME_STIZU\n");
                        }, LAG);
                        break;

                    case "DUNI_VJETRE_MALO_PREKO_JETRE":            //symbolic meaning, not the same song as above
                        setTimeout(function () {
                            socket.write("UMRIJECU_OD_BOLA_IZGORJELO_SVE_OD_ALKOHOLA" + DELIMETER + messageBag + '\n');
                        }, LAG);
                        break;

                    case "RAKIJA_MI_SE_PRIBLIZILA_DUSI":               //same as above
                        setTimeout(function() {
                            socket.write("CRNA_MI_SE_DZIGERICA_SUSI\n");
                            socket.destroy();
                        }, LAG);
                        break;

                    default:
                        setTimeout(function() {
                            socket.write("KUPI_STRIKA_CIPELE_I_DADE_DZEPARAC\n");
                        }, LAG);
                        break;
                }
                incomingData = '';
                message = [];
            }
        })

        .on("close", function() {
            socket.destroy();
        })
        .on("error", function(error) {
            console.log(error.toString());
        })
}).listen(1389);        //the only patriotic port in the world

console.log("BMK server is operational.");
