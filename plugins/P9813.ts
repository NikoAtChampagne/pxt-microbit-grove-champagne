namespace grove {
    export namespace plugins {
        export class P9813 {
            private _NumLeds: number;
            private _PinData: DigitalPin;
            private _PinClk: DigitalPin;
            private buf: Buffer;


            public constructor(pinClk: number, pinData: number, numLeds: number)
            {
                this._NumLeds = numLeds;
                this._PinData = pinData;
                this._PinClk = pinClk;
                this.Reset();
            }

            /* Set color to a chainable RGB LED-P9813(SKU#104020048)
             * @param r value of number
             * @param g value of number
             * @param b value of number 
             * @param n value of number
             */
            //% group="P9813"
            //% blockId=grove_p9813_set_color block="Set Color at %ledChain r %r g %g b %b on LED %num"
            //% r.min = 0 r.max = 0 r.defl = 0
            //% g.min = 0 g.max = 0 g.defl = 0
            //% b.min = 0 b.max = 0 b.defl = 0
            //% n.min = 1 n.defl = 1
            //% weight=3
            public setColor(r: number, g: number, b: number, num:number) {
                //return this;
                //return true;
            }

            private static CalcCRC8(data: any[]): number {
                let crc8 = 0xFF;

                for (let i = 0; i < data.length; i++) {
                    crc8 ^= data[i];
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

            public Reset(){
                this.buf = pins.createBuffer(this._NumLeds * 3);
                //this.buf = 
                //Begin data frame 4 bytes
                this.Frame();
                //4 bytes for each led (checksum, blue, green, red)
                for (let i=0; i<this._NumLeds; i++){
                    this.WriteByte(0xC0);
                    for (let j=0; j<3; i++){
                        this.WriteByte(0);
                    }
                }
                //End data frame 4 bytes
                this.Frame();
            }

            public Frame(){
                // Send 32x zeros
                this.WriteBit(0)
                for (let i=0; i<32; i++) {
                    this.Clk()
                }                
            }

            public WriteByte(byte: number){
                if (byte == 0) {
                    //Fast send 8x zeros
                    this.WriteBit(0);
                    for (let i=0; i<8; i++) {
                        this.Clk();
                    }
                }
                else{
                    //Send each bit, MSB first
                    for (let j=0; j<8; j++) {
                        if ((byte & 0x80) != 0) {
                            this.WriteBit(1)
                        }
                        else {
                            this.WriteBit(0)
                        }
                        this.Clk()

                        //On to the next bit
                        byte <<= 1
                    }
                }
            }


            public WriteBit(bit:number){
                this._PinData;
            }


            public Clk(){
                pins.digitalWritePin(this._PinClk,0);
                pins.digitalWritePin(this._PinClk,1);
            }

            public SetItem(index:number, val:any) {
                let offset = index * 3
            
                for (let i=0; i<3; i++){
                    this.buf[offset + i] = val[i]
                }
            }

            public WriteColor(r: number, g:number, b:number){
                //Send a checksum byte with the format "1 1 ~B7 ~B6 ~G7 ~G6 ~R7 ~R6"
                //The checksum colour bits should bitwise NOT the data colour bits
                let checksum = 0xC0;  // 0b11000000
                checksum |= (b >> 6 & 3) << 4;
                checksum |= (g >> 6 & 3) << 2;
                checksum |= (r >> 6 & 3);

                this.WriteByte(checksum);
        
                //Send the 3 colours
                this.WriteByte(r);
                this.WriteByte(g);
                this.WriteByte(b);
            }
        }
    }
}
