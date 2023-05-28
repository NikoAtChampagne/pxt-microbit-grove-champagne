namespace grove {
    export namespace drivers {
        export class TB6612FNG {
            public constructor(address: number = 0x14) {
                this._Address = address;
            }

            public setMotorSpeed(motorNumber: number, speed: number) {
                let direction = 0;
                if (speed >= 0) {
                    direction = 1;
                } else {
                    direction = 0;
                    speed = -speed;
                }
                speed = Math.map(speed, 0, 100, 0, 255);
                let motorCmd = ((motorNumber & 0x01) << 7) | (1 << 5) | (direction << 4) | speed;
                pins.i2cWriteNumber(i2cAddr, motorCmd, NumberFormat.UInt8BE);
            }

            public stopMotor(motorNumber: number){
                let motorCmd = (motorNumber & 0x01) << 7;
                pins.i2cWriteNumber(i2cAddr, motorCmd, NumberFormat.UInt8BE);
            }
        }
    }
}