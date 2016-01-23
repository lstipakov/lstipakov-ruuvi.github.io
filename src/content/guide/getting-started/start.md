---
title: Unboxing
template: guide.hbs
columns: two
order: 2
---

# Getting Started

![](/assets/images/ruuvitag-box.jpg)

Congratulations on being the owner of a brand new Ruuvi device! Go ahead and open the box.

### What's on it?

This is RuuviTag. RuuviTag is an **Open-Source Bluetooth Sensor Beacon Platform**.

![](/assets/images/ruuvitag-top.jpg)
![](/assets/images/ruuvitag-bottom.jpg)

It's super easy and straightforward to fire it up, so let's get started, shall we?

## What you need

In this example, we will start the device for the first time and upload a demo application into its memory.

Prerequisities:
* **Software**
  * Mobile Application - [iPhone](https://itunes.apple.com/us/app/nrf-toolbox/id820906058) | [Android](https://play.google.com/store/apps/details?id=no.nordicsemi.android.nrftoolbox)
* **Hardware**
  * Your brand new RuuviTag device
  * iPhone or Android smartphone
* **Experience**
  * None!

### Step 1: Power On Your Device
Insert a battery (CR2450 or CR2477) so that metallic battery connnector touches GND pad of the battery. Now the device is in operational mode and pre-installed bootloader software is running. One of the LEDs should be lit (on, not blinking). After inserting the battery, press _Reset button_ once to make sure the device booted successfully to bootloader.

### Step 2: Upload application

1. Open the mobile app on your phone and tap DFU icon.
2. Select _application file_. Correct file type is _Distribution package (ZIP)_. By default, the application tries to find the file from your Dropbox folder. It it's convenient for you, put it there and select it. You can find the demo distribution package from [GitHub](https://github.com/ruuvi/ruuvitag_fw/tree/master/production_builds).
3.  Select device. Your phone scans nearby Bluetooth Smart devices and **DFUTarg** will pop up on your screen. Tap it.
4. Press _UPLOAD_ and the magic happens!

### Step 3: It's alive!

After Over-the-Air _(OTA)_ Device Firmware Update _(DFU)_ is completed, RuuviTag starts to run the application code. Success!