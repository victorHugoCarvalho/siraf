var bluetooth = {
    initialize: function() {
        this.bind();
    },
    bind: function() {
        document.addEventListener('deviceready', this.deviceready, false);
    },
    deviceready: function() {
        var startSystem = 'a';

        bluetoothDiv.innerText = "Bluetooth Conectado";
        statusDiv.innerText = "Iniciando Sistema...";
        bluetoothSerial.write(startSystem, bluetooth.onSuccess, bluetooth.onFailure);
    },
    onSuccess: function() {
        statusDiv.innerText = "Sistema Iniciado";
        bluetoothSerial.subscribe("\n", bluetooth.onSubscribe);
    },
    onFailure: function() {
        statusDiv.innerText = "Não foi possível iniciar o sistema";
    },
    onSubscribe :function(data) {
        alert("leu");
        if(Number(data) == 1) {
            statusDiv.innerText = "Sistema Finalizado";
        }
    },
};