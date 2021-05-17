from apds9960.const import *                                        # install apds: pip install apds9960
from apds9960 import APDS9960
import RPi.GPIO as GPIO
import smbus                                                        # I²C needs to be activated

port = 1                                                            # port 1 = default
bus = smbus.SMBus(port)                                             # assign bus to port 1

apds = APDS9960(bus)                                                # assign gesture sensor to bus

GPIO.setmode(GPIO.BOARD)                                            # GPIO pin mode = follow board numbers
GPIO.setup(7, GPIO.IN)                                              # Sensor-Input-Pin

dirs = {                                                            # for printing out directions
    APDS9960_DIR_NONE: "none",
    APDS9960_DIR_LEFT: "left",
    APDS9960_DIR_RIGHT: "right",
    APDS9960_DIR_UP: "up",
    APDS9960_DIR_DOWN: "down",
    APDS9960_DIR_FAR: "far",
    APDS9960_DIR_NEAR: "near"
}

GPIO.add_event_detect(7, GPIO.FALLING)                              # detects falling edge and triggers event

apds.setProximityIntLowThreshold(50)                                # set and enable proximity threshold

print("Gesture Test")                                               # no need to explain

apds.enableGestureSensor()                                          # enable gesture sensor

while True:                                                         # infinite loop to detect motion
    if apds.isGestureAvailable():                                   # if motion is detected, enter if statement
        motion = apds.readGesture()                                 # read gesture
        print("Gesture={}".format(dirs.get(motion, "unknown")))     # prints out which direction the motion was
        file = open("gesture.txt", "w")
        file.write("{}".format(dirs.get(motion, "unknown")))
        file.close()
