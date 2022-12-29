namespace grove {
    export namespace sensors {
        // sensor init at start only
        // set a global varial to deal with init state
        let spg30InitState = false;
        export class SGP30 {
            public constructor(address: number = 0x58) {
                this._Address = address;
                this.Initialization();
            }
            public Initialization(): SGP30 {
                // sensor init at start only
                if(spg30InitState==false) {
                    const buf = pins.createBuffer(2);
                    buf[0] = 0x20;
                    buf[1] = 0x03;
                    pins.i2cWriteBuffer(this._Address, buf, false);
                    // set init state to true
                    // no init procedure next time
                    spg30InitState = true;
                    basic.pause(10);
                }
                return this;
            }

            public TriggerMeasurement(): SGP30 {
                const buf = pins.createBuffer(2);
                buf[0] = 0x20;
                buf[1] = 0x08;
                pins.i2cWriteBuffer(this._Address, buf, false);
                basic.pause(12);

                return this;
            }


            public Read(): { TVOC: number, ECO2: number } {
                const buf = pins.i2cReadBuffer(this._Address, 6, false);
                
                let data = [];
                let w=[];
                let crc:number;
                let crc8:number;
                
                for (let i = 0; i<2; i++) {
                    w=[buf[3*i],buf[3*i+1]];
                    crc=buf[3*i+2];
                    crc8=SGP30.CalcCRC8(w);
                    if (crc8!=crc) return null;
                    data.push(w[0]<<8|w[1]);
                }
                
                const eCO2 = data[0];
                const tvoc = data[1];

              return { TVOC: tvoc, ECO2: eCO2 };
            }

            private _Address: number;

            private static CalcCRC8(data: any[]): number {
                let crc8 = 0xFF;
                
                for (let i=0;i<data.length;i++) {
                    crc8^=data[i];
                    for (let j = 0; j < 8; ++j) {
                        if (crc8 & 0x80) {
                            crc8 <<= 1;
                            crc8 ^= 0x31;
                        }
                        else {
                            crc8 <<= 1;
                        }
                        crc8 &= 0xff;
                    }
                }

                return crc8;
            }

        }
    }
}
