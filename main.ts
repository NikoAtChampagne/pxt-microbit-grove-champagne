let ledChain = grove.createChain(DigitalPin.P0, DigitalPin.P1, 1)
basic.forever(function () {
    for (let index = 0; index <= 255; index++) {
        ledChain.setColor(
        0,
        index,
        255 - index,
        1
        )
        serial.writeValue("x", index)
        basic.pause(100)
    }
})
