from Tkinter import *
from time import time
from random import randint
import math

class Aplikace:
    # vytvori okno, canvas, zobrazi tutorial, s vyzvou ke startu
    def __init__(self):
        self.highscores = open("highscores.txt", "r+")
        self.highscorelist = self.highscores.read().split(" ")
        self.highscorelist.pop() # na konci filu je mezera, vypopne ''
        self.h = True
        self.replayon = False
        self.doprava = False
        self.tedcas = 0
        self.poprve = True
        self.okno = Tk()
        for i in range(1, 6):
            self.okno.bind("<F" + str(i) + ">", self.hsreplay)
        self.okno.bind("<F12>", self.resscore)
        self.okno.bind("<Left>", self.didoleva)
        self.okno.bind("<Right>", self.didoprava)
        self.okno.bind("r", self.normal)
        self.okno.bind("t", self.sandbox)
        self.okno.bind("e", self.replay)
        self.plocha = Canvas(self.okno, width=1000, height=700, bg="black")
        self.plocha.pack()
        self.kvakvni()
        self.gameinprogress = False

    # sandbox mode
    def sandbox(self, event):
        self.sandbox = True
        self.replayon = False
        self.restart()

    # normal mode
    def normal(self, event):
        self.sandbox = False
        self.replayon = False
        self.restart()

    # udela ze souboru seznam ze ktereho vygererujeme replay, nastavi promene a hodi se do restartu
    def hsreplay(self, event):
        print event.keycode
        p = open("place" + str(event.keycode - 111) + "replay.txt", "r")
        p2 = p.readlines()
        if len(p2) == 2:
            self.replaydata = [p2[0].split(" "), p2[1].split(" ")]
            self.replaydata[0].pop()
            self.replaydata[1].pop()
            for i in range(len(self.replaydata[1])):
                self.replaydata[1][i] = int(self.replaydata[1][i])
            for i in range(len(self.replaydata[0])):
                self.replaydata[0][i] = self.replaydata[0][i].split("_")
                self.replaydata[0][i][0] = int(self.replaydata[0][i][0])
                self.replaydata[0][i][1] = int(self.replaydata[0][i][1])
            print self.replaydata
            self.replayon = True
            self.sandbox = False
            self.restart()
        else:
            print "no/wrong data found"

    def resscore(self, event):
        print "mazu score"
        p = open("highscores.txt", "w+")
        p.write("0 0 0 0 0 ")
        p.close()
        for i in range(5):
            u = open("place" + str(i+1) + "replay.txt", "w+")
            u.write("")
            u.close()
        self.highscorelist = [0, 0, 0, 0, 0]

    def replay(self, event):
        print "replaymode"
        self.replayon = True
        self.sandbox = False
        self.restart()

    # zobrazi tutorial
    def kvakvni(self):
        self.plocha.create_text(500, 350,
                                text=" Press left/right to change direction, \n dodge red squares.\n Press R for" +
                                     "normal game,\n T for sandbox mode (recommended)",
                                fill="white", font="Helvetica, 40", tag="b")

    # odzobrazi tutorial
    def odkvakni(self):
        self.plocha.delete("b")

    # vsechny promene hodi na startovni hodnoty, zrusi ctverce
    def restart(self):
        print "restartuju"
        if not self.replayon:
            self.replaydata = [[], []]
        self.doprava = True
        self.odkvakni()
        self.highscorewrote = False
        self.plocha.delete("p")
        self.gameinprogress = True
        self.score = 0
        self.lvl = 1
        self.timer = 0
        self.x = 50
        self.rychlost = 0
        self.cerveni = []
        self.defaultsance = 30 # Sance spawnu cervenych na kazdy frame v promile
        self.sance = self.defaultsance # pro vetsi pravidelnost spawnu
        self.doprava = True
        if self.poprve:
            self.pohyb()
            self.poprve = False

    def didoleva(self, event):
        if self.doprava and self.h and not self.replayon:
            self.doprava = False
            self.h = False
            if not self.score in self.replaydata[1]:
                self.replaydata[1].append(self.score)

    def didoprava(self, event):
        if not self.doprava and self.h and not self.replayon:
            self.doprava = True
            self.h = False
            if not self.score in self.replaydata[1]:
                self.replaydata[1].append(self.score)

    #provede vse pro cervene - spawn a pohyb
    def cerveny(self):
        if not self.replayon:
            if randint(0, 1000) < self.sance:
                r = randint(-80, 1000)
                self.cerveni.append([r, -80])
                self.replaydata[0].append([r, self.score])
                self.sance = self.defaultsance
            else:
                self.sance += 5 # pro vetsi pravidelnost vyskytu aneb aby nebyly dlouhe mezery
        else:
            if len(self.replaydata[0]) > 0:
                if self.score == self.replaydata[0][0][1]:
                    self.cerveni.append([self.replaydata[0][0][0], -80])
                    self.sance = self.defaultsance
                    self.replaydata[0].pop(0)
                else:
                    self.sance += 5
        for i in self.cerveni: # vykresli vsechny ctverce
            i[1] += 0.1 * (i[1] + 81)
            self.plocha.create_rectangle([i[0], i[1], i[0] + 80, i[1] + 80], fill="red", tags="p")
            if i[1] > 700:
                self.cerveni.remove(i)

    # hlavni metoda, provede pohyb hrace, vykresluje vsechno, kontroluje konec hry
    def pohyb(self):
        if self.replayon and len(self.replaydata[1]) > 0:
            if self.score == self.replaydata[1][0]:
                self.doprava = not self.doprava
                self.replaydata[1].pop(0)

        if self.doprava:
            self.rychlost += 1
        else:
            self.rychlost -= 1

        self.h = True

        if self.rychlost > 40: self.rychlost = 40
        if self.rychlost < -40: self.rychlost = -40

        self.x += self.rychlost

        if self.x > 1000: self.x = -80
        if self.x < -80: self.x = 1000

        self.poslednicas = self.tedcas # pro vypocet fps
        self.tedcas = time()

        if self.gameinprogress:
            self.timer += 1 # timer se vynuluje pri kazdem lvl up, skore furt roste
            self.score += 1
        if (self.timer == 100 and self.lvl < 6) or (self.timer == 300): # po lvl 6 roste lvl pomalejc
            self.lvl += 1
            self.defaultsance += 15
            self.timer = 0

        if len(self.plocha.find_overlapping(self.x, 600, self.x + 80, 520)) > 2:
        #zkontroluje jestli na plose hrace je nepratel (vzdy tam je zeleny ctverec a zluty trojuhelnicek, proto "> 2"
            self.gameinprogress = False

        self.plocha.delete("p")
        #vykresli hrace - ctverecek a trojuhelnik ukazujici smer
        self.plocha.create_rectangle(self.x, 600, self.x + 80, 520, fill="yellow", tags="p")
        if self.doprava:
            self.plocha.create_polygon(self.x + 25, 540, self.x + 65, 560, self.x + 25, 580, fill="orange", tag="p")
        else:
            self.plocha.create_polygon(self.x + 55, 540, self.x + 15, 560, self.x + 55, 580, fill="orange", tag="p")
        # sandbox mode - vypise vsechny blbosti v sandboxu
        if self.sandbox:
            self.plocha.create_text(500, 200,
                                    text="Press R for normal game\nPosition: " + str(self.x) + "\nspeed: " + str(
                                        self.rychlost), font="Helvetica, 50", tags="p", fill="white")
            if self.doprava:
                self.plocha.create_text(300, 350, text="accel: right", font="Helvetica, 50", tags="p", fill="white")
            else:
                self.plocha.create_text(300, 350, text="accel: left", font="Helvetica, 50", tags="p", fill="white")
        else: # normal mode - nejaky texty, kontroluje konec hry
            self.cerveny() # metoda pro obstarani vseho pro cervene
            if self.gameinprogress: # vytvoreni textu pro score a lvl
                self.plocha.create_text(80, 50, text=str(self.score), tags="p", font="Helvetica, 40", fill="white")
                self.plocha.create_text(60, 100, text="lvl: " + str(self.lvl), tags="p", font="Helvetica, 40",
                                        fill="white")
            else: # game over screen
                self.plocha.create_text(500, 200,
                                        text="Game over, final score: " + str(self.score) + "\nfinal level: " + str(
                                            self.lvl) + "\nPress R to restart\nHighscores:", font="Helvetica, 50",
                                        tags="p", fill="white")
                p = 1 # pomocna promena pro pocitani pozice v highscore

                for i in self.highscorelist: # vypsani highscore (prave dane zlute)
                    if i == self.score:
                        self.plocha.create_text(260, 320 + 60 * p, text=str(p) + ": " + str(i), fill="yellow",
                                                font="Helvetica, 50", tags="p")
                    else:
                        self.plocha.create_text(260, 320 + 60 * p, text=str(p) + ": " + str(i), fill="white",
                                                font="Helvetica, 50", tags="p")
                    p += 1
                    self.plocha.create_text(380, 680, text="press F1-F5 for highscore replay, press E for current replay,\npress F12 to clear all scores",
                                            fill="white", font="Helvetica, 15", tags="p")
                # na zacatku game over zapise nove highscore
                if not self.highscorewrote and not self.replayon:
                    for i in range(5):
                        self.highscorelist[i] = int(self.highscorelist[i])
                    for i in range(5):
                        if self.highscorelist[i] < self.score:
                            self.highscorelist.insert(i, self.score)
                            self.highscorelist.pop()
                            if i < 4:
                                for k in range(3, i-1, -1): # "posune" replaye vsech horsich score o 1 niz
                                    p = open("place" + str(k+1) + "replay.txt", "r")
                                    o = open("place" + str(k+2) + "replay.txt", "w")
                                    o.write(p.read())
                                    p.close()
                                    o.close()
                            hs = open("place" + str(i+1) + "replay.txt", "w")
                            for j in self.replaydata[0]: # Zapsani replay pole do souboru - jo, neni to reseny elegantne
                                hs.write(str(j[0]) + "_" + str(j[1]) + " ") # cerveni
                            hs.write("\n")
                            for j in self.replaydata[1]: # pohyby hrace
                                hs.write(str(j) + " ")
                            hs.close()
                            print "ukladam do " + str(i+1)
                            break
                    self.highscorewrote = True
                    self.highscores.seek(0) # musime se dostat zpatky na zacatek kuli zapisu
                    for i in self.highscorelist:
                        self.highscores.write(str(i) + " ")
        self.plocha.create_text(920, 30, text="FPS: " + str(
            (math.floor(10 / (self.tedcas - self.poslednicas))) / 10) + "\npocet ctvercu: " + str(
            len(self.cerveni)) + "\nsance: " + str(self.sance), fill="white", font="Helvetica, 10", tags="p")
        self.okno.after(30, self.pohyb)


a = Aplikace()
mainloop()