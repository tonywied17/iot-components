/*
 * File: c:\Users\tonyw\Desktop\www\local\git\iot-components\js\components\TemperatureSensor\Helpers.js
 * Project: c:\Users\tonyw\Desktop\www\local\git\iot-components\js\components
 * Created Date: Wednesday November 1st 2023
 * Author: Tony Wiedman
 * -----
 * Last Modified: Wed November 1st 2023 1:54:33 
 * Modified By: Tony Wiedman
 * -----
 * Copyright (c) 2023 MolexWorks / Tone Web Design
 */

function convertToFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

function convertToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function getTemperatureColor(temperature, unit) {
    return (unit === "F" && temperature >= 80) || (unit === "C" && temperature >= 26.66)
        ? '#e73e3e'
        : (unit === "F" && temperature >= 70) || (unit === "C" && temperature >= 21.11)
        ? '#ff9933'
        : '#138944';
}

function temperatureCardClass(data) {
    return (data.unit === "F" && data.current >= 80) || (data.unit === "C" && data.current >= 26.66)
        ? "high"
        : (data.unit === "F" && data.current >= 70) || (data.unit === "C" && data.current >= 21.11)
        ? "medium"
        : "normal";
}

function counterCardClass(data) {
    const percentage = (data.current / data.limit) * 100;
    return (data.current === (data.limit - 1) || data.current >= data.limit)
        ? "high"
        : (percentage >= 50)
        ? "medium"
        : "normal";
}
