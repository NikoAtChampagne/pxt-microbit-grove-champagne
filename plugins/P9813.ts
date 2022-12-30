namespace grove {
    export namespace plugins {
        export class P9813 {
            private _NumLeds: number;
            private _PinData: DigitalPin;
            private _PinClk: DigitalPin;
            private buf: Buffer;


            public constructor(pinClk: DigitalPin, pinData: DigitalPin, numLeds: number)
            {
                this._NumLeds = numLeds;
                this._PinData = pinData;
                this._PinClk = pinClk;
                this.Reset();
            }

            public Reset(){
                this.buf = pins.createBuffer(this._NumLeds * 3);
                //Begin data frame 4 bytes
                this.Frame();
                //4 bytes for each led (checksum, blue, green, red)
                for (let i = 0; i < this._NumLeds; i++) {
                    this.WriteByte(0xC0);
                    for (let j = 0; j < 3; j++) {
                        this.WriteByte(0);
                    }
                }
                //End data frame 4 bytes
                this.Frame();
            }

            public Fill(r:number,g:number,b:number){
                for (let i = 0; i < this._NumLeds; i++) {
                    this.buf[i * 3] = r;
                    this.buf[i * 3 + 1] = g;
                    this.buf[i * 3 + 2] = b;
                }
            }

            public Frame(){
                // Send 32x zeros
                this.WriteBit(0)
                for (let i=0; i<32; i++) {
                    this.Clk()
                }                
            }

            public WriteByte(byte: any){
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
                pins.digitalWritePin(this._PinData, bit);
            }


            public Clk(){
                pins.digitalWritePin(this._PinClk,0);
                pins.digitalWritePin(this._PinClk,1);
            }

            public SetItem(index:number,r:number,g:number,b:number) {
                let offset = (index-1) * 3
                this.buf[offset] = r;
                this.buf[offset+1] = g;
                this.buf[offset+2] = b;
            }

            public WriteColor(){
                //Begin data frame 4 bytes
                this.Frame();
                //4 bytes for each led(checksum, blue, green, red)
                for (let i = 0; i< this._NumLeds; i++){
                    this.Write(this.buf[i * 3], this.buf[i * 3 + 1], this.buf[i * 3 + 2]);
                }                        
                //End data frame 4 bytes
                this.Frame();
            }

            public WriteColorAt(r:number,g:number,b:number,index:number) {
                this.SetItem(index,r,g,b);
                this.WriteColor();
            }

            public Write(r: number, g:number, b:number){
                //Send a checksum byte with the format "1 1 ~B7 ~B6 ~G7 ~G6 ~R7 ~R6"
                //The checksum colour bits should bitwise NOT the data colour bits
                let checksum = 0xC0;  // 0b11000000
                checksum |= (b >> 6 & 3) << 4;
                checksum |= (g >> 6 & 3) << 2;
                checksum |= (r >> 6 & 3);

                this.WriteByte(checksum);
                //serial.writeNumbers([r, g, b]);
                //Send the 3 colours
                this.WriteByte(b);
                this.WriteByte(g);
                this.WriteByte(r);
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
            public SetColorAt(r: number, g: number, b: number, num: number) {
                this.WriteColorAt(r, g, b, num);
            }

            public SetColor(r: number, g: number, b: number) {
                this.Fill(r,g,b);
                this.WriteColor();
            }

        }
    }
}
