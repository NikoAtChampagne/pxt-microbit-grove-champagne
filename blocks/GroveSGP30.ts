/**
 * Grove - SGP30 Custom Block
 */
//% groups=['SGP30']
namespace grove {
    function Read(sgp30: grove.sensors.SGP30): { TVOC: number, ECO2: number } {
        //sgp30.Initialization();
        sgp30.TriggerMeasurement();
        return sgp30.Read();
    }

    /**
     * Read the TVOC(ppb) from Grove-SGP30(SKU#101020512)
     */
    //% group="SGP30"
    //% block="[Grove - VOC&eCO2 Sensor]|Read the TVOC(ppb))"
    //% weight=3
    export function sgp30ReadTVOC(): number {
        const sgp30 = new grove.sensors.SGP30();
        const val = Read(sgp30);
        if (val == null) return null;

        return val.TVOC;
    }

    /**
     * Read the ECO2(ppm) from Grove-SGP30(SKU#101020512)
     */
    //% group="SGP30"
    //% block="[Grove - VOC&eCO2 Sensor]|Read the eCO2(ppm))"
    //% weight=1
    export function sgp30ReadECO2(): number {
        const sgp30 = new grove.sensors.SGP30();
        const val = Read(sgp30);
        if (val == null) return null;

        return val.ECO2;
    }

}
