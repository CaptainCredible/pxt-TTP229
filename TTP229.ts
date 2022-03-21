enum pushedReleased {
    //% block="pushed"
    pushed = 100,
    //% block="released"
    released = 150,

}

enum TTP229Pin {
    //% block="0"
    p0 = 0,
    //% block="1"
    p1 = 1,
    //% block="2"
    p2 = 2,
    //% block="3"
    p3 = 3,
    //% block="4"
    p4 = 4,
    //% block="5"
    p5 = 5,
    //% block="6"
    p6 = 6,
    //% block="7"
    p7 = 7,
    //% block="8"
    p8 = 8,
    //% block="9"
    p9 = 9,
    //% block="10"
    p10 = 10,
    //% block="11"
    p11 = 11,
    //% block="12"
    p12 = 12,
    //% block="13"
    p13 = 13,
    //% block="14"
    p14 = 14,
    //% block="15"
    p15 = 15
}

/**
 * interface TTP229
 */
//% weight=20 color=#3333FF icon="\uf021"
namespace TTP229 {
    let bitArray = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
 
    /**
    * registerTouches
    */
    //% blockId==TP_229" block="pollTTP229"
    //% weight=60    
    export function pollTTP229(): void {
        let TPval = pins.i2cReadNumber(0x57, NumberFormat.UInt16BE);
        for (let i = 0; i<16; i++){
            let tempTest = TPval & 0b0000000000000001
            if(tempTest > 0){
                if(!bitArray[i]){
                    control.raiseEvent(1338, 100 + i)
                }            
                bitArray[i] = true
                //serial.writeValue("raised event - ", i + 100)
            } else {
                if(bitArray[i]){
                    control.raiseEvent(1338, 150 + i)
                }
                bitArray[i] = false
            }
            TPval = TPval >> 1
        }
    }

    //%block="on TTP229 pin| $TTP229PinSelect | $pushOrRelease"
    export function handleTTP229Pin(TTP229PinSelect: TTP229Pin,pushOrRelease: pushedReleased, thing: () => void) {
        control.onEvent(1338, (pushOrRelease + 15) - TTP229PinSelect, thing);
    }
}
