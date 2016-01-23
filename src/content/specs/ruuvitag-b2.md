---
word: RuuviTag Rev.B2
title: RuuviTag Rev.B2 Specs
order: 1
columns: 3
template: spec.hbs
---
# RuuviTag Rev.B2 Specifications

### [Nordic Semiconductor nRF52832](https://www.nordicsemi.com/eng/Products/Bluetooth-Smart-Bluetooth-low-energy/nRF52832)
The nRF52832 SoC is a powerful, highly flexible ultra-low power multiprotocol SoC ideally suited for Bluetooth® Smart, ANT and 2.4GHz ultra low-power wireless applications. The nRF52832 SoC is built around a 32-bit **ARM® Cortex™-M4F** CPU with 512kB + 64kB RAM. The embedded 2.4GHz transceiver supports Bluetooth Smart, ANT and proprietary 2.4 GHz protocol stack. It is on air compatible with the nRF51 Series, nRF24L and nRF24AP Series products from Nordic Semiconductor.
<iframe width="640" height="360" src="https://www.youtube.com/embed/ja3USlRVAok?rel=0" frameborder="0" allowfullscreen></iframe>

### [Bosch BME280 environmental sensor](http://www.bosch-sensortec.com/en/homepage/products_3/environmental_sensors_1/bme280/bme280_1)
The BME280 is an integrated environmental sensor developed specifically for mobile applications where size and low power consumption are key design constraints. The unit combines individual high linearity, high accuracy sensors for pressure, humidity and temperature in an 8-pin metal-lid 2.5 x 2.5 x 0.93 mm3 LGA package, designed for low current consumption (3.6 μA @1Hz), long term stability and high EMC robustness. The humidity sensor features an extremely fast response time which supports performance requirements for emerging applications such as context awareness, and high accuracy over a wide temperature range. The pressure sensor is an absolute barometric pressure sensor with features exceptionally high accuracy and resolution at very low noise. The integrated temperature sensor has been optimized for very low noise and high resolution. It is primarily used for temperature compensation of the pressure and humidity sensors, and can also be used for estimating ambient temperature.  
<iframe width="640" height="360" src="https://www.youtube.com/embed/0XuL2fY7_NQ?rel=0" frameborder="0" allowfullscreen></iframe>
  
### Accelerometer

### 2.4GHz antenna
RuuviTag's has a 1/4 wavelength monopole PCB antenna. The range is up to 100 meters.

### 13.56MHz NFC antenna
NFC™-A tag support is included on RuuviTag. Out-of-Band (OOB) pairing using NFC simplifies the process of authenticated pairing between two Bluetooth Smart devices by exchanging authentication information over the NFC link.

### Buttons
Reset button and user button.

### LEDs
RuuviTag has two user-programmable LEDs.

### Battery
We've developed an innovative battery holder mechanism for the RuuviTag. It can hold **CR2430**, **CR2450** and **CR2477** Lithium coin cell batteries. The circuit board material (FR4) bends a bit and keeps the battery firmly on its place. The device consumes ~1 micro ampere during sleep. This means that the battery life-time can be easily optimized to be up to 10 years.

### Reverse polarity protection
It's not possible to break the device by attaching the battery upside down. RuuviTag has an on-board high-efficiency reverse polarity protection circuitry. We're using a MOSFET transistor to protect the chip instead of commonly used diode protection (which has a poor effeciency).

### Debug port
Altought it's possible to flash and debug RuuviTag Over-the-Air, we decided to provide a standard 0.05" pitch 10-pin ARM serial wire debug port. All the debug pins are also available on test pads on bottom layer.

###