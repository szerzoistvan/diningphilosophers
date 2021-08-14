def myRightFork():
    if rightFork == "0":
        if forkList[own] == "0":
            led.unplot(0, 0)
            led.unplot(1, 0)
            led.plot(2, 0)
            led.plot(3, 0)
            led.plot(4, 0)
        if forkList[own] == "1":
            led.unplot(0, 0)
            led.unplot(1, 0)
            led.unplot(2, 0)
            led.unplot(3, 0)
            led.plot(4, 0)
    elif rightFork == "1":
        if forkList[own] == "1":
            led.unplot(0, 0)
            led.plot(1, 0)
            led.plot(2, 0)
            led.plot(3, 0)
            led.unplot(4, 0)

def on_button_pressed_a():
    global leftFork
    if leftFork == "0":
        if own > 1 and forkList[own - 1] == "0":
            forkList[own - 1] = "1"
            leftFork = "1"
        if own == 1 and forkList[len(forkList) - 1] == "0":
            forkList[len(forkList) - 1] = "1"
            leftFork = "1"
    elif leftFork == "1":
        if own > 1 and forkList[own - 1] == "1":
            forkList[own - 1] = "0"
            leftFork = "0"
        if own == 1 and forkList[len(forkList) - 1] == "1":
            forkList[len(forkList) - 1] = "0"
            leftFork = "0"
    radio.send_string("" + me + "|" + leftFork + "|" + "X")
    myLeftFork()
input.on_button_pressed(Button.A, on_button_pressed_a)

def listsManagement(szöveg: str):
    global exists, own
    exists = 0
    index = 0
    while index <= len(playersList):
        if szöveg == playersList[index]:
            exists = 1
        index += 1
    if exists == 0:
        playersList.append(szöveg)
        forkList.append("0")
        forkList[len(forkList) - 1] = forkList[len(forkList) - 2]
        forkList[len(forkList) - 2] = "0"
        basic.show_number(len(playersList) - 1)
        index2 = 0
        while index2 <= len(playersList):
            if me == playersList[index2]:
                own = index2
            index2 += 1
def playerNumber(num: number):
    if num == 1:
        basic.show_leds("""
            . . . . .
                        . . . . .
                        . . . . .
                        . . # . .
                        . . # . .
        """)
    elif num == 2:
        basic.show_leds("""
            . . . . .
                        . . . . .
                        . . . . .
                        . # . # .
                        . # . # .
        """)
    elif num == 3:
        basic.show_leds("""
            . . . . .
                        . . . . .
                        . . . . .
                        # . # . #
                        # . # . #
        """)
    elif num == 4:
        basic.show_leds("""
            . . . . .
                        . . . . .
                        . . . . .
                        # . # . #
                        # . . # .
        """)
    elif num == 5:
        basic.show_leds("""
            . . . . .
                        . . . . .
                        . . . . .
                        . # . # .
                        . . # . .
        """)
    elif num == 6:
        basic.show_leds("""
            . . . . .
                        . . . . .
                        . . . . .
                        # . # . #
                        . # . . #
        """)
    elif num == 7:
        basic.show_leds("""
            . . . . .
                        . . . . .
                        . . . . .
                        # . # # #
                        . # . # #
        """)
    elif num == 8:
        basic.show_leds("""
            . . . . .
                        . . . . .
                        . . . . .
                        # . # # #
                        . # # # #
        """)

def on_button_pressed_ab():
    global leftFork, rightFork
    if own > 0:
        if leftFork == "1":
            if own > 1 and forkList[own - 1] == "1":
                forkList[own - 1] = "0"
                leftFork = "0"
            if own == 1 and forkList[len(forkList) - 1] == "1":
                forkList[len(forkList) - 1] = "0"
                leftFork = "0"
        if rightFork == "1" and forkList[own] == "1":
            forkList[own] = "0"
            rightFork = "0"
    leftFork = "0"
    rightFork = "0"
    radio.send_string("" + me + "|" + leftFork + "|" + rightFork)
    listsManagement(me)
    if own > 0:
        myLeftFork()
        myRightFork()
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_received_string(receivedString):
    global stringList
    stringList = receivedString.split("|")
    listsManagement(stringList[0])
    index3 = 0
    while index3 <= len(playersList):
        if stringList[0] == playersList[index3]:
            if stringList[1] != "X":
                if index3 == 1:
                    forkList[len(forkList) - 1] = stringList[1]
                elif index3 > 1:
                    forkList[index3 - 1] = stringList[1]
            if stringList[2] != "X":
                forkList[index3] = stringList[2]
        index3 += 1
    if own > 0:
        myLeftFork()
        myRightFork()
radio.on_received_string(on_received_string)

def on_button_pressed_b():
    global rightFork
    if own > 0:
        if rightFork == "0" and forkList[own] == "0":
            forkList[own] = "1"
            rightFork = "1"
        elif rightFork == "1" and forkList[own] == "1":
            forkList[own] = "0"
            rightFork = "0"
        radio.send_string("" + me + "|" + "X" + "|" + rightFork)
        myRightFork()
input.on_button_pressed(Button.B, on_button_pressed_b)

def myLeftFork():
    if leftFork == "0":
        if own > 1:
            if forkList[own - 1] == "0":
                led.plot(0, 1)
                led.plot(1, 1)
                led.plot(2, 1)
                led.unplot(3, 1)
                led.unplot(4, 1)
            elif forkList[own - 1] == "1":
                led.plot(0, 1)
                led.unplot(1, 1)
                led.unplot(2, 1)
                led.unplot(3, 1)
                led.unplot(4, 1)
        if own == 1:
            if forkList[len(forkList) - 1] == "0":
                led.plot(0, 1)
                led.plot(1, 1)
                led.plot(2, 1)
                led.unplot(3, 1)
                led.unplot(4, 1)
            elif forkList[len(forkList) - 1] == "1":
                led.plot(0, 1)
                led.unplot(1, 1)
                led.unplot(2, 1)
                led.unplot(3, 1)
                led.unplot(4, 1)
    elif leftFork == "1":
        if own > 1:
            if forkList[own - 1] == "1":
                led.unplot(0, 1)
                led.plot(1, 1)
                led.plot(2, 1)
                led.plot(3, 1)
                led.unplot(4, 1)
        elif own == 1:
            if forkList[len(forkList) - 1] == "1":
                led.unplot(0, 1)
                led.plot(1, 1)
                led.plot(2, 1)
                led.plot(3, 1)
                led.unplot(4, 1)
stringList: List[str] = []
rightFork = ""
leftFork = ""
forkList: List[str] = []
playersList: List[str] = []
me = ""
own = 0
exists = 0
string = ""
radio.set_frequency_band(64)
radio.set_group(64)
radio.set_transmit_serial_number(True)
exists = 0
own = 0
me = convert_to_text(control.device_serial_number())
playersList = [""]
forkList = [""]
leftFork = ""
rightFork = ""
basic.show_leds("""
    # . # . #
        . . . . .
        # . . . #
        . . . . .
        # . # . #
""")

def on_forever():
    pass
basic.forever(on_forever)
