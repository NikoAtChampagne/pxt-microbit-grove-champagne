input.onButtonPressed(Button.A, function on_button_pressed_a() {
    for (let index = 0; index < 256; index++) {
        ledChain.setColor(index, 0, 255 - index, 1)
        basic.pause(100)
    }
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    ledChain.Reset()
})
let ledChain : grove.plugins.P9813 = null
ledChain = grove.createChain(DigitalPin.P0, DigitalPin.P14, 1)
