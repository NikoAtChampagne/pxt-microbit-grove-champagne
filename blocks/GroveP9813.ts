/**
 * Grove - P9813 Custom Blocks
 */
//% groups=['P9813']
namespace grove {
    /**
     * Create a new driver Grove - chainable RGB LED-P9813(SKU#104020048)
     * @param pinClk value of pin number
     * @param pinData value of pin number
     */
    //% blockId=grove_p9813_create block="Chainable RGB LED at %pinClk and %pinData with %numLeds LEDs"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=4
    //% numLeds.min = 1 numLeds.defl = 1
    //% blockSetVariable=ledChain
    //% group="P9813"
    export function createChain(pinClk:DigitalPin, pinData: DigitalPin, numLeds:number): grove.plugins.P9813 {
        let ledChain = new grove.plugins.P9813(pinClk, pinData, numLeds);
        return ledChain;
    }
  
}