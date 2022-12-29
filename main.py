ledChain = grove.create_chain(DigitalPin.P1, DigitalPin.P1, 0)
ledChain.set_color(255, 0, 0, 1)

def on_forever():
    pass
basic.forever(on_forever)
