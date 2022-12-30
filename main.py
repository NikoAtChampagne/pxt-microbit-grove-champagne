def on_button_pressed_a():
    for index in range(256):
        ledChain.set_color(index, 0, 255 - index, 1)
        basic.pause(100)

def on_button_pressed_b():
    ledChain.reset()

input.on_button_pressed(Button.A, on_button_pressed_a)
input.on_button_pressed(Button.B, on_button_pressed_b)

ledChain: grove.plugins.P9813 = None
ledChain = grove.create_chain(DigitalPin.P0, DigitalPin.P14, 1)