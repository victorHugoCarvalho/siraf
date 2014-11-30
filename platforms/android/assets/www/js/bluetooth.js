'use strict';

var bluetooth = {
    initialize: function() {
        this.bind();
    },
    bind: function() {
        document.addEventListener('deviceready', this.deviceready, false);
    },
    deviceready: function() {
    	var macAddress = "00:13:06:13:90:34";

    	bluetooth.isConnected;
		bluetooth.connect(macAddress);
    },
    connect: function (macAddress) {
        bluetooth.setStatus("Conectando...");
        console.log("Conectando a " + macAddress);
        bluetoothSerial.connect(macAddress, bluetooth.isConnected);        
    },
    disconnect: function(event) {
        if (event) {
            event.preventDefault();
        }

        bluetooth.setStatus("Desconectando...");
        bluetoothSerial.disconnect(bluetooth.ondisconnect);
    },
    sendToArduino: function(c) {
        bluetoothSerial.write("c" + c + "\n");
    },
    timeoutId: 0,
    setStatus: function(status) {
        if (bluetooth.timeoutId) {
            clearTimeout(bluetooth.timeoutId);
        }
        messageDiv.innerText = status;
        bluetooth.timeoutId = setTimeout(function() { messageDiv.innerText = ""; }, 4000);
    },
    generateFailureFunction: function(message) {
        var func = function(reason) {
            var details = "";
            if (reason) {
                details += ": " + JSON.stringify(reason);
            }
            bluetooth.setStatus(message + details);
        };
        return func;
    },
    isConnected: function() {
    	if(bluetoothSerial.isConnected) {
    		messageDiv.innerText = "";
    		statusDiv.innerText = "Conectado";
    		btnStart.hidden = false;
    		btnStart.addEventListener("click", bluetooth.startSystem);
    	}
    	else {
    		statusDiv.innerText = "Desconectado";
    	}
    },
    onMessage: function(message) {
        messageDiv.innerHTML = message;        
    },
    startSystem: function() {
    	var startChange = '0';
    	var waterSaved = 10;

    	bluetoothSerial.write(startChange, bluetooth.onMessage("Sistema iniciado."));
    	waterDiv.hidden = false;
    	liters.innerText = waterSaved;
    },
};