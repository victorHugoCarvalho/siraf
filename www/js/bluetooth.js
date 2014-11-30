'use strict';

var bluetooth = {
    initialize: function() {
        this.bind();
    },
    bind: function() {
        document.addEventListener('deviceready', this.deviceready, false);
    },
    deviceready: function() {

        // wire buttons to functions
        deviceList.ontouchstart = bluetooth.connect; // assume not scrolling
        refreshButton.ontouchstart = bluetooth.list;
        disconnectButton.ontouchstart = bluetooth.disconnect;
        
        bluetooth.list();
    },
    list: function(event) {
        deviceList.firstChild.innerHTML = "Discovering...";
        bluetooth.setStatus("Looking for Bluetooth Devices...");
        
        bluetoothSerial.list(bluetooth.ondevicelist, bluetooth.generateFailureFunction("List Failed"));
    },
    connect: function (e) {
        bluetooth.setStatus("Connecting...");
        var device = e.target.getAttribute('deviceId');
        console.log("Requesting connection to " + device);
        bluetoothSerial.connect(device, bluetooth.onconnect, bluetooth.ondisconnect);        
    },
    disconnect: function(event) {
        if (event) {
            event.preventDefault();
        }

        bluetooth.setStatus("Disconnecting...");
        bluetoothSerial.disconnect(bluetooth.ondisconnect);
    },
    onconnect: function() {
        connectionScreen.hidden = true;
        colorScreen.hidden = false;
        bluetooth.setStatus("Connected.");
    },
    ondisconnect: function() {
        connectionScreen.hidden = false;
        colorScreen.hidden = true;
        bluetooth.setStatus("Disconnected.");
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
    ondevicelist: function(devices) {
        var listItem, deviceId;

        // remove existing devices
        deviceList.innerHTML = "";
        bluetooth.setStatus("");
        
        devices.forEach(function(device) {
            listItem = document.createElement('li');
            listItem.className = "topcoat-list__item";
            if (device.hasOwnProperty("uuid")) { // TODO https://github.com/don/BluetoothSerial/issues/5
                deviceId = device.uuid;
            } else if (device.hasOwnProperty("address")) {
                deviceId = device.address;
            } else {
                deviceId = "ERROR " + JSON.stringify(device);
            }
            listItem.setAttribute('deviceId', device.address);            
            listItem.innerHTML = device.name + "<br/><i>" + deviceId + "</i>";
            deviceList.appendChild(listItem);
        });

        if (devices.length === 0) {
            
            if (cordova.platformId === "ios") { // BLE
                bluetooth.setStatus("No Bluetooth Peripherals Discovered.");
            } else { // Android
                bluetooth.setStatus("Please Pair a Bluetooth Device.");
            }

        } else {
            bluetooth.setStatus("Found " + devices.length + " device" + (devices.length === 1 ? "." : "s."));
        }
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
    }
};