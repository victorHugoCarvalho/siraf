var bluetooth = {
    initialize: function() {
        this.bind();
    },
    bind: function() {
        document.addEventListener('deviceready', this.deviceready, false);
    },
    deviceready: function() {
        var startSystem = 'a';
        var i;

        bluetoothDiv.innerText = "Bluetooth Conectado";
        statusDiv.innerText = "Iniciando Sistema...";
        bluetoothSerial.clear();
        for(i=0; i<10; i++) {
            bluetoothSerial.write(startSystem);
        }

        statusDiv.innerText = "Sistema Iniciado";
        bluetoothSerial.subscribe("\n", bluetooth.onSubscribe);
    },
    onSubscribe :function(data) {
        if(Number(data) == 1) {
            statusDiv.innerText = "Sistema Finalizado";
            temperatureUl.hidden = false;

            btnCold.addEventListener("click", bluetooth.setTemperatuteCold);
            btnWarm.addEventListener("click", bluetooth.setTemperatuteWarm);
            btnHot.addEventListener("click", bluetooth.setTemperatuteHot);
            btnVeryHot.addEventListener("click", bluetooth.setTemperatuteVeryHot);
        }
    },
    setTemperatuteCold: function() {
        var temperature;

        temperature = 'c';
        bluetooth.sendTemperatute(temperature);
    },
    setTemperatuteWarm: function() {
        var temperature;

        temperature = 'd';
        bluetooth.sendTemperatute(temperature);
    },
    setTemperatuteHot: function() {
        var temperature;

        temperature = 'e';
        bluetooth.sendTemperatute(temperature);
    },
    setTemperatuteVeryHot: function() {
        var temperature;

        temperature = 'f';
        bluetooth.sendTemperatute(temperature);
    },
    sendTemperatute: function(temperature) {
        var i;

        temperatureUl.hidden = true;
        
        bluetoothSerial.clear();
        for(i=0; i<10; i++) {
            bluetoothSerial.write(temperature);
        }
        bluetooth.showOutputs();
    },
    showOutputs: function(data) {
        outputUl.hidden = false;

        btnLow.addEventListener("click", bluetooth.setOutputLow);
        btnMid.addEventListener("click", bluetooth.setOutputMid);
        btnHigh.addEventListener("click", bluetooth.setOutputHigh);
    },
    setOutputLow: function() {
        var output;

        output = 'h';
        bluetooth.sendOutput(output);
    },
    setOutputMid: function() {
        var output;

        output = 'i';
        bluetooth.sendOutput(output);
    },
    setOutputHigh: function() {
        var output;

        output = 'j';
        bluetooth.sendOutput(output);
    },
    sendOutput: function(output) {
        var i;

        outputUl.hidden = true;
        
        bluetoothSerial.clear();
        for(i=0; i<10; i++) {    
            bluetoothSerial.write(output);
        }
        bluetooth.showStartShower();
    },
    showStartShower: function() {
        startShowerUl.hidden = false;
        btnStartShower.addEventListener("click", bluetooth.startShower);
    },
    startShower: function() {
        var startShower = 'l';
        var i;

        bluetoothSerial.clear();
        for(i=0; i<10; i++){
            bluetoothSerial.write(startShower);
        }
        startShowerUl.hidden = true;
        bluetooth.end();
    },
    end: function() {
        endDiv.hidden = false;
    },
};