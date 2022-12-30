let CO2 = 0
let ledChain = grove.createChain(DigitalPin.P0, DigitalPin.P14, 1)
basic.forever(function () {
    CO2 = grove.sgp30ReadECO2()
    serial.writeValue("CO2", CO2)
    if (CO2 >= 1500) {
        basic.showIcon(IconNames.No)
        ledChain.SetColorAt(
        16,
        0,
        0,
        1
        )
        basic.pause(1000)
    } else if (CO2 >= 800) {
        basic.showIcon(IconNames.Asleep)
        ledChain.SetColorAt(
        16,
        16,
        0,
        1
        )
        basic.pause(1000)
    } else {
        basic.showIcon(IconNames.Yes)
        ledChain.SetColorAt(
        0,
        16,
        0,
        1
        )
        basic.pause(1000)
    }
    ledChain.SetColorAt(
    0,
    0,
    0,
    1
    )
    basic.pause(2000)
})
