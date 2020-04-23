const rpio = require('rpio');
const isPi = require('detect-rpi');
const five = require("johnny-five");
const Raspi = require("raspi-io").RaspIO;

// Set up Raspberry Pi
const SCL_PIN = 11;    // Clock
const SDA_PIN = 13;    // Register Clock (RCLK, 13 on chip) - Latch pin
const IO_PIN = 15;   // Shift-Register Clock (SRCLK, 12 on chip) - Clock pin

class LEDController {
    constructor() {

        // Set class properties to use
        console.log("LED Clock: "+ SCL_PIN);
        console.log("LED Data: "+ IO_PIN);
        console.log("LED CS: "+ SDA_PIN);
]
        this.board = new five.Board({
            io: new Raspi()
        });

        this.board.on("ready", function() {
            var digits = new five.Led.Digits({
                pins: {
                    data: IO_PIN,
                    clock: SLC_PIN,
                    cs: SDA_PIN
                }
            });

            digits.print("----");
        });
    }

    /*
        Send an array of bits to the shift registers
        Will send all values of the Buffer, regardless of the number of registers
     */
    clear() {
        this.board.clear();
    }
}

module.exports = LEDController;
