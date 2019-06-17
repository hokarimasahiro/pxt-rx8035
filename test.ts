// tests go here; this will not be compiled when this package is used as a library
basic.forever(function () {
    basic.clearScreen()
    let buf = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 9, 8, 7, 6, 5, 4, 3]
    for (let i = 0; i < 16; i++) {
        basic.clearScreen()
        basic.pause(500)
        basic.showNumber(buf(i))
        basic.pause(500)
    }
    basic.clearScreen()
    basic.pause(1000)
})
