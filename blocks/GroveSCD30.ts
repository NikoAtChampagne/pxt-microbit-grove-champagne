/**
 * Grove - SCD30 Custom Block
 */
//% groups=['SCD30']
namespace grove {
    /**
     * Read the Humidity(%) from Grove-SCD30(SKU#19010473)
     */
    //% group="SCD30"
    //% block="[Grove - Humidity&Temperature&CO2 Sensor]|Read the humidity(%))"
    //% weight=1
    export function scd30ReadHumidity(): number {
        const scd30 = new grove.sensors.SCD30();
        const humidity = scd30.readHumidity();
        if (humidity == null) return null;

        return humidity;
    }

    /**
     * Read the Temperature(°) from Grove-SCD30(SKU#19010473)
     */
    //% group="SCD30"
    //% block="[Grove - Humidity&Temperature&CO2 Sensor]|Read the emperature(°C))"
    //% weight=2
    export function scd30ReadTemperature(): number {
        const scd30 = new grove.sensors.SCD30();
        const temperature = scd30.readTemperature();
        if (temperature == null) return null;

        return temperature;
    }

    /**
     * Read the CO2(ppm) from Grove-SCD30(SKU#19010473)
     */
    //% group="SCD30"
    //% block="[Grove - Humidity&Temperature&CO2 Sensor]|Read the CO2(ppm))"
    //% weight=3
    export function scd30ReadCO2(): number {
        const scd30 = new grove.sensors.SCD30();
        const co2 = scd30.readCO2Concentration();
        if (co2 == null) return null;

        return co2;
    }
}
