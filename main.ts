/**
 * makecode RX8035 RTC Package.
 */

/**
 * rx8035 block
 */
//% weight=10 color=#800000 icon="\uf017" block="rx8035"
namespace rx8035 {
    let I2C_ADDR = 0x32
    let REG_CTRL1 = 0x0e
    let REG_CTRL2 = 0x0f
    let REG_SECOND = 0x00
    let REG_MINUTE = 0x01
    let REG_HOUR = 0x02
    let REG_WEEKDAY = 0x03
    let REG_DAY = 0x04
    let REG_MONTH = 0x05
    let REG_YEAR = 0x06

    /**
     * set reg
     */
    function setReg(reg: number, dat: number): void {
        let buf = pins.createBuffer(2);
        buf[0] = reg << 4 | 0x00;
        buf[1] = dat;
        pins.i2cWriteBuffer(I2C_ADDR, buf);
    }

    /**
     * get reg
     */
    function getReg(reg: number): number {
        pins.i2cWriteNumber(I2C_ADDR, reg << 4 | 0x04, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(I2C_ADDR, NumberFormat.UInt8BE);
    }

    /**
     * convert a BCD data to Dec
     */
    function HexToDec(dat: number): number {
        return (dat >> 4) * 10 + (dat & 0x0f);
    }

    /**
     * convert a Dec data to BCD
     */
    function DecToHex(dat: number): number {
        return Math.trunc(dat / 10) << 4 | (dat % 10)
    }

    /**
     * get Year
     */
    //% blockId="getYear" block="get year"
    //% weight=100 blockGap=8
    export function getYear(): number {
        return (HexToDec(getReg(REG_YEAR)))
    }

    /**
     * set year
     * @param dat data of year, eg: 2019
     */
    //% blockId="setYear" block="set year %dat"
    //% weight=99 blockGap=8
    export function setYear(dat: number): void {
        setReg(REG_YEAR, DecToHex(dat % 100))
    }

    /**
     * get month
     */
    //% blockId="getmMonth" block="get month"
    //% weight=98 blockGap=8
    export function getMonth(): number {
        return HexToDec(getReg(REG_MONTH) & 0x1f)
    }

    /**
     * set month
     * @param dat data of month, eg: 3
     */
    //% blockId="setMonth" block="set month %dat"
    //% weight=97 blockGap=8
    export function setMonth(dat: number): void {
        setReg(REG_MONTH, DecToHex(dat % 13))
    }

    /**
     * get day
     */
    //% blockId="getDay" block="get day"
    //% weight=96 blockGap=8
    export function getDay(): number {
        return HexToDec(getReg(REG_DAY) & 0x3f)
    }

    /**
     * set day
     * @param dat data of day, eg: 14
     */
    //% blockId="setDay" block="set day %dat"
    //% weight=95 blockGap=8
    export function setDay(dat: number): void {
        setReg(REG_DAY, DecToHex(dat % 32))
    }

    /**
     * get weekday
     */
    //% blockId="getWeekday" block="get weekday"
    //% weight=94 blockGap=8
    export function getWeekday(): number {
        return HexToDec(getReg(REG_WEEKDAY) & 0x07)
    }

    /**
     * set weekday
     * @param dat data of weekday, eg: 4
     */
    //% blockId="setWeekday" block="set weekday %dat"
    //% weight=93 blockGap=8
    export function setWeekday(dat: number): void {
        setReg(REG_WEEKDAY, DecToHex(dat % 7) | 0x18)
    }

    /**
     * get hour
     */
    //% blockId="getHour" block="get hour"
    //% weight=92 blockGap=8
    export function getHour(): number {
        return HexToDec(getReg(REG_HOUR) & 0x3f)
    }

    /**
     * set hour
     * @param dat data of hour, eg: 5
     */
    //% blockId="setHour" block="set hour %dat"
    //% weight=91 blockGap=8
    export function setHour(dat: number): void {
        setReg(REG_HOUR, DecToHex(dat % 24))
    }

    /**
     * get Minute
     */
    //% blockId="getMinute" block="get minute"
    //% weight=90 blockGap=8
    export function getMinute(): number {
        return HexToDec(getReg(REG_MINUTE) & 0x7f)
    }

    /**
     * set minute
     * @param dat data of minute, eg: 30
     */
    //% blockId="setMinute" block="set minute %dat"
    //% weight=89 blockGap=8
    export function setMinute(dat: number): void {
        setReg(REG_MINUTE, DecToHex(dat % 60))
    }

    /**
     * get Second
     */
    //% blockId="getseconde" block="get second"
    //% weight=88 blockGap=8
    export function getSecond(): number {
        return HexToDec(getReg(REG_SECOND) & 0x7f)
    }

    /**
     * set second
     * @param dat data of second, eg: 0
     */
    //% blockId="setSecond" block="set second %dat"
    //% weight=87 blockGap=8
    export function setSecond(dat: number): void {
        setReg(REG_SECOND, DecToHex(dat % 60) | 0x80)
    }

    /**
     * get Xstp
     */
    //% blockId="isXstp" block="test Xstp"
    //% weight=86 blockGap=8
    export function isXstp(): boolean {
        if ((getReg(REG_CTRL2) & 0x20) != 0) return true;
        else return false;
    }

    /**
     * reset Xstp
     */
    //% blockId="resetXstp" block="reset Xstp"
    //% weight=85 blockGap=8
    export function resetXstp(): void {
        setReg(REG_CTRL1, 0x00)
        setReg(REG_CTRL2, 0x00)
    }

    /**
     * set Date and Time
     * @param year data of year, eg: 2019
     * @param month data of month, eg: 3
     * @param day data of day, eg: 14
     * @param weekday data of weekday, eg: 4
     * @param hour data of hour, eg: 5
     * @param minute data of minute, eg: 30
     * @param second data of second, eg: 0
     */
    //% blockId="setSecond" block="set second %dat"
    //% weight=70 blockGap=8
    //% blockId="setDateTime" block="set year %year|month %month|day %day|weekday %weekday|hour %hour|minute %minute|second %second"
    export function DateTime(year: number, month: number, day: number, weekday: number, hour: number, minute: number, second: number): void {
        let buf = pins.createBuffer(8);
        buf[0] = REG_SECOND << 4 | 0x00;
        buf[1] = DecToHex(second);
        buf[2] = DecToHex(minute);
        buf[3] = DecToHex(hour) | 0x80;		// 24H mode
        buf[4] = DecToHex(weekday);
        buf[5] = DecToHex(day);
        buf[6] = DecToHex(month);
        buf[7] = DecToHex(year);
        pins.i2cWriteBuffer(I2C_ADDR, buf)
    }
    /**
     * set RTC
     * @param ad address of RTC, eg: 0
     * @param dat data of RTC, eg: 0xaa
     */
    //% blockId="setRTC" block="set RTC address=%ad data=%dat"
    //% weight=50 blockGap=8
    export function setRTC(ad: number, dat: number): void {
        let buf = pins.createBuffer(2);
        buf[0] = ad;
        buf[1] = dat;
        pins.i2cWriteBuffer(I2C_ADDR, buf);
    }

    /**
     * get RTC
     * @param ad address of RTC, eg: 0
     */
    //% blockId="getRTC" block="get RTC address=%ad"
    //% weight=48 blockGap=8
    export function getRTC(ad: number): number {
        pins.i2cWriteNumber(I2C_ADDR, ad, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(I2C_ADDR, NumberFormat.UInt8BE);
    }
    /**
     * get RTC RAW DATA
     */
    //% blockId="getRawData" block="get RTC RAW data"
    //% weight=46 blockGap=8
    export function getRawData(): number[] {
        let retbuf = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        let buf = pins.i2cReadBuffer(I2C_ADDR, 16);
        for (let i = 0; i < 16; i++) {
            retbuf[i] = buf[i]
        }
        return retbuf;
    }
    /**
     * get RTC DATA
     */
    //% blockId="getData" block="get RTC data"
    //% weight=46 blockGap=8
    export function getData(): number[] {
        let retbuf = [0, 0, 0, 0, 0, 0, 0]
        let buf = getRawData();
        retbuf[0] = HexToDec(buf[7]) % 100  // year
        retbuf[1] = HexToDec(buf[6])        // month
        retbuf[2] = HexToDec(buf[5])        // day
        retbuf[3] = HexToDec(buf[4])        // weekday
        retbuf[4] = HexToDec(buf[3]) | 0x80 // hour
        retbuf[5] = HexToDec(buf[2])        // minute
        retbuf[6] = HexToDec(buf[1])        // second
        return retbuf;
    }
}
