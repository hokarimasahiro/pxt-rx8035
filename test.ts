// tests go here; this will not be compiled when this package is used as a library
basic.forever(function () {
    rx8035.resetXstp()
    rx8035.DateTime(2019, 3, 14, 4, 5, 30, 0)
    basic.clearScreen()
    for (let i = 0; i <= 0x0F; i++) {
        basic.clearScreen()
        basic.pause(500)
        basic.showNumber(rx8035.getRTC(i << 4 | 0x04))
        basic.pause(500)
    }
    basic.clearScreen()
    basic.pause(1000)
})
