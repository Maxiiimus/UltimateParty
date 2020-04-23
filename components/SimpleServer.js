const fs = require('fs');

class SimpleServer {
    constructor(led) {
        this.option = false;
        this.ledController = led;
    }

    start (http, io, port) {
        // Open connection to clients
        this.io = io; //require('socket.io')(server);
        this.listen(http, port);
    }

    listen(http, port) {
        this.io.on('connection', (socket) => {
            console.log('A user connected: ' + JSON.stringify(socket.handshake));
            this.io.emit("set option", this.option);

            // A button was clicked
            socket.on("button clicked", (button) => {
                console.log("Button " + button + " clicked.")
                this.doAction(button);
            });

            // The option was toggled
            socket.on("toggle option", () => {
                this.toggleOption();
            });

            socket.on('disconnect', (reason) => {
                console.log('User disconnected: ' + reason);
            });
        });

        http.listen(port, () => {
            console.log("Running server on port %s", port);
        });
    }

    doAction(value) {
        console.log("Performing action based on " + value);
    }

    // Set an interval to update all connected clients
    toggleOption() {
        this.option = !this.option;
        console.log("Option is now: " + this.option);
        //this.io.emit("set option", this.option);
    }
}

module.exports = SimpleServer;
