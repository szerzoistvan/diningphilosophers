function myRightFork () {
    if (rightFork == "0") {
        if (forkList[own] == "0") {
            led.unplot(0, 0)
            led.unplot(1, 0)
            led.plot(2, 0)
            led.plot(3, 0)
            led.plot(4, 0)
        }
        if (forkList[own] == "1") {
            led.unplot(0, 0)
            led.unplot(1, 0)
            led.unplot(2, 0)
            led.unplot(3, 0)
            led.plot(4, 0)
        }
    } else if (rightFork == "1") {
        if (forkList[own] == "1") {
            led.unplot(0, 0)
            led.plot(1, 0)
            led.plot(2, 0)
            led.plot(3, 0)
            led.unplot(4, 0)
        }
    }
}
input.onButtonPressed(Button.A, function () {
    if (leftFork == "0") {
        if (own > 1 && forkList[own - 1] == "0") {
            forkList[own - 1] = "1"
            leftFork = "1"
        }
        if (own == 1 && forkList[forkList.length - 1] == "0") {
            forkList[forkList.length - 1] = "1"
            leftFork = "1"
        }
    } else if (leftFork == "1") {
        if (own > 1 && forkList[own - 1] == "1") {
            forkList[own - 1] = "0"
            leftFork = "0"
        }
        if (own == 1 && forkList[forkList.length - 1] == "1") {
            forkList[forkList.length - 1] = "0"
            leftFork = "0"
        }
    }
    radio.sendString("" + me + "|" + leftFork + "|" + "X")
    myLeftFork()
})
function listsManagement (szöveg: string) {
    exists = 0
    for (let index = 0; index <= playersList.length; index++) {
        if (szöveg == playersList[index]) {
            exists = 1
        }
    }
    if (exists == 0) {
        playersList.push(szöveg)
        forkList.push("0")
        forkList[forkList.length - 1] = forkList[forkList.length - 2]
        forkList[forkList.length - 2] = "0"
        basic.showNumber(playersList.length - 1)
        for (let index2 = 0; index2 <= playersList.length; index2++) {
            if (me == playersList[index2]) {
                playerNumber(index2)
                own = index2
            }
        }
    }
}
function playerNumber (szám: number) {
    if (szám == 1) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . # . .
            . . # . .
            `)
    } else if (szám == 2) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . # . # .
            . # . # .
            `)
    } else if (szám == 3) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            # . # . #
            # . # . #
            `)
    } else if (szám == 4) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            # . # . #
            # . . # .
            `)
    } else if (szám == 5) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . # . # .
            . . # . .
            `)
    } else if (szám == 6) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            # . # . #
            . # . . #
            `)
    } else if (szám == 7) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            # . # # #
            . # . # #
            `)
    } else if (szám == 8) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            # . # # #
            . # # # #
            `)
    } else {
    	
    }
}
input.onButtonPressed(Button.AB, function () {
    if (own > 0) {
        if (leftFork == "1") {
            if (own > 1 && forkList[own - 1] == "1") {
                forkList[own - 1] = "0"
                leftFork = "0"
            }
            if (own == 1 && forkList[forkList.length - 1] == "1") {
                forkList[forkList.length - 1] = "0"
                leftFork = "0"
            }
        }
        if (rightFork == "1" && forkList[own] == "1") {
            forkList[own] = "0"
            rightFork = "0"
        }
    }
    leftFork = "0"
    rightFork = "0"
    radio.sendString("" + me + "|" + leftFork + "|" + rightFork)
    listsManagement(me)
    if (own > 0) {
        myLeftFork()
        myRightFork()
    }
})
radio.onReceivedString(function (receivedString) {
    stringList = receivedString.split("|")
    listsManagement(stringList[0])
    for (let index3 = 0; index3 <= playersList.length; index3++) {
        if (stringList[0] == playersList[index3]) {
            if (stringList[1] != "X") {
                if (index3 == 1) {
                    forkList[forkList.length - 1] = stringList[1]
                } else if (index3 > 1) {
                    forkList[index3 - 1] = stringList[1]
                }
            }
            if (stringList[2] != "X") {
                forkList[index3] = stringList[2]
            }
        }
    }
    if (own > 0) {
        myLeftFork()
        myRightFork()
    }
})
input.onButtonPressed(Button.B, function () {
    if (own > 0) {
        if (rightFork == "0" && forkList[own] == "0") {
            forkList[own] = "1"
            rightFork = "1"
        } else if (rightFork == "1" && forkList[own] == "1") {
            forkList[own] = "0"
            rightFork = "0"
        }
        radio.sendString("" + me + "|" + "X" + "|" + rightFork)
        myRightFork()
    }
})
function myLeftFork () {
    if (leftFork == "0") {
        if (own > 1) {
            if (forkList[own - 1] == "0") {
                led.plot(0, 1)
                led.plot(1, 1)
                led.plot(2, 1)
                led.unplot(3, 1)
                led.unplot(4, 1)
            } else if (forkList[own - 1] == "1") {
                led.plot(0, 1)
                led.unplot(1, 1)
                led.unplot(2, 1)
                led.unplot(3, 1)
                led.unplot(4, 1)
            }
        }
        if (own == 1) {
            if (forkList[forkList.length - 1] == "0") {
                led.plot(0, 1)
                led.plot(1, 1)
                led.plot(2, 1)
                led.unplot(3, 1)
                led.unplot(4, 1)
            } else if (forkList[forkList.length - 1] == "1") {
                led.plot(0, 1)
                led.unplot(1, 1)
                led.unplot(2, 1)
                led.unplot(3, 1)
                led.unplot(4, 1)
            }
        }
    } else if (leftFork == "1") {
        if (own > 1) {
            if (forkList[own - 1] == "1") {
                led.unplot(0, 1)
                led.plot(1, 1)
                led.plot(2, 1)
                led.plot(3, 1)
                led.unplot(4, 1)
            }
        } else if (own == 1) {
            if (forkList[forkList.length - 1] == "1") {
                led.unplot(0, 1)
                led.plot(1, 1)
                led.plot(2, 1)
                led.plot(3, 1)
                led.unplot(4, 1)
            }
        }
    }
}
let stringList: string[] = []
let rightFork = ""
let leftFork = ""
let forkList: string[] = []
let playersList: string[] = []
let me = ""
let own = 0
let exists = 0
let szöveg = ""
radio.setFrequencyBand(64)
radio.setGroup(64)
radio.setTransmitSerialNumber(true)
exists = 0
own = 0
me = convertToText(control.deviceSerialNumber())
playersList = [""]
forkList = [""]
leftFork = ""
rightFork = ""
basic.showLeds(`
    # . # . #
    . . . . .
    # . . . #
    . . . . .
    # . # . #
    `)
basic.forever(function () {
	
})
