
// ========================================================================================================
// This is the ModelView for the data driving the UI it also receives updates from the server via Socket.IO
// ========================================================================================================
function SimpleViewModel() {
    let self = this;
    self.socket = io();
    self.optionToggle = ko.observable(false);
    self.someText = ko.observable("Hello");
    self.moreText = ko.observable("World");

    // =========================================================================
    // Operations
    // =========================================================================

    // Option Button One Clicked
    self.buttonOneClicked = function() {
        console.log("Option One clicked.");
        self.toast("Option One clicked.");
        self.socket.emit('button clicked', 1);
    };

    // Option Button Two Clicked
    self.buttonTwoClicked = function() {
        console.log("Option Two clicked.");
        self.toast("Option Two clicked.");
        self.socket.emit('button clicked', 2);
    };

    // Option Button Three Clicked
    self.buttonThreeClicked = function() {
        console.log("Option Three clicked.");
        self.toast("Option Three clicked.");
        self.socket.emit('button clicked', 3);
    };

    // Option Button Four Clicked
    self.buttonFourClicked = function() {
        console.log("Option Four clicked.");
        self.toast("Option Four clicked.");
        self.socket.emit('button clicked', 4);
    };

    // Option Toggled
    self.toggleOption = function() {
        console.log("Option is now " + self.optionToggle());
        self.toast("Option Toggled.");
        self.socket.emit('toggle option');
    };

    // =========================================================================
    // Helper functions
    // =========================================================================

    // This is lazy to put here. It shouldn't be in the model, but for now easiest to add here
    self.toast = function(msg) {
        console.log("called toast: " + msg);
        $("<div class='ui-loader ui-body-a ui-corner-all'><h3>"+msg+"</h3></div>")
            .css({ display: "block",
                opacity: 0.90,
                position: "fixed",
                padding: "7px",
                "text-align": "center",
                width: "270px",
                left: ($(window).width() - 284)/2,
                top: $(window).height()/2 })
            .appendTo( $.mobile.pageContainer ).delay( 1500 )
            .fadeOut( 400, function(){
                $(self).remove();
            });
    };

    // =========================================================================
    // Socket.IO communication from the server
    // =========================================================================

    // "load library" is called when a client connects to provide the library of available songs
    self.socket.on('set option', function (option) {
        console.log("Updating option to " + option);
        self.optionToggle(option);
    });
}

// Activates knockout.js
ko.applyBindings(new SimpleViewModel());
