/* Motor Control Extension for I2C Motor Driver (TB6612FNG)
 * Grove - TB6612FNG Custom Block
 */
//% groups=['TB6612FNG']
namespace grove
{  
    /**
     * Set the speed and direction of a motor
     * @param motorNumber The motor number (1 or 2)
     * @param speed The speed of the motor, ranging from -100 to 100
     */
    //% block="set Motor %motorNumber speed to %speed"
    //% motorNumber.min=1 motorNumber.max=2
    //% speed.min=-100 speed.max=100
    export function setMotorSpeed(motorNumber: number, speed: number): void {
        const tb6612fng = new grove.drivers.TB6612FNG();
        tb6612fng.setMotorSpeed(motorNumber, speed);
    }

    /**
     * Stop a motor
     * @param motorNumber The motor number (1 or 2)
     */
    //% block="stop Motor %motorNumber"
    //% motorNumber.min=1 motorNumber.max=2
    export function stopMotor(motorNumber: number): void {
        const tb6612fng = new grove.drivers.TB6612FNG();
        tb6612fng.stopMotor(motorNumber);
    }
}
