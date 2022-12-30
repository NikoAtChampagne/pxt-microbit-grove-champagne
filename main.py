ledChain = grove.create_chain(DigitalPin.P0, DigitalPin.P0, 1)

def on_forever():
    for index in range(256):
        ledChain.set_color(0, index, 255 - index, 1)
        serial.write_value("x", index)
        basic.pause(100)
basic.forever(on_forever)
