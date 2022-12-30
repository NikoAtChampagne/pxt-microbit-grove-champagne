CO2 = grove.sgp30_read_eco2()
ledChain = grove.create_chain(DigitalPin.P0, DigitalPin.P14, 1)

def on_forever():
    serial.write_value("CO2", CO2)
    if CO2 >= 1500:
        basic.show_icon(IconNames.NO)
        ledChain.set_color_at(16, 0, 0, 1)
        basic.pause(1000)
    elif CO2 >= 800:
        basic.show_icon(IconNames.ASLEEP)
        ledChain.set_color_at(16, 16, 0, 1)
        basic.pause(1000)
    else:
        basic.show_icon(IconNames.YES)
        ledChain.set_color_at(0, 16, 0, 1)
        basic.pause(1000)
    ledChain.set_color_at(0, 0, 0, 1)
    basic.pause(2000)
basic.forever(on_forever)
