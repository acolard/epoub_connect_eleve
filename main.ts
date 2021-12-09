bluetooth.onBluetoothConnected(function () {
	
})
bluetooth.onBluetoothDisconnected(function () {
	
})
// Ce bloc x'execute si le Microbit reçoit le caractère #
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.Hash), function () {
	
})
bluetooth.startUartService()
let Hauteur_poubelle = 30
let Distance_Capteur = 0
let Espace_libre_mini = 5
let Mesure = 0
basic.forever(function () {
    Distance_Capteur = Math.round(1 * sonar.ping(
    DigitalPin.P0,
    DigitalPin.P0,
    PingUnit.Centimeters
    ) + 0)
    Mesure = Hauteur_poubelle - Distance_Capteur
    if (Distance_Capteur > Espace_libre_mini) {
        if (Mesure < 0) {
            basic.showLeds(`
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                . . # . .
                `)
        } else {
            led.plotBarGraph(
            Mesure,
            Hauteur_poubelle - Espace_libre_mini
            )
        }
    } else {
        basic.showIcon(IconNames.No)
    }
    // Temporisation de 2 secondes à laisser absolument en dernier dans la boucle "toujours"
    control.waitMicros(2000000)
})
