/*
 * File: c:\Users\tonyw\Desktop\www\local\git\iot-components\js\settings.js
 * Project: c:\Users\tonyw\Desktop\www\local\git\iot-components\js
 * Created Date: Wednesday November 1st 2023
 * Author: Tony Wiedman
 * -----
 * Last Modified: Wed November 1st 2023 12:32:33 
 * Modified By: Tony Wiedman
 * -----
 * Copyright (c) 2023 MolexWorks / Tone Web Design
 */


/**
 * ! Render Client and Sensor Settings
 */

// Init renderSensorSetting() for each sensor
function initSensorCardsSettings() {
    const sensorList = document.getElementById('sensor-list');
    sensorList.innerHTML = '';

    sensors.forEach(sensor => {
        const sensorComponent = renderSensorSetting(sensor);
        sensorList.appendChild(sensorComponent);
    });
}

/**
 * Render Settings for Sensor in Settings Overlay
 * @param {*} sensor - sensor object
 * @returns Rendered setting component for requested sensor
 */
function renderSensorSetting(sensor) {
    const sensorDiv = document.createElement("div");
    sensorDiv.className = "overlay-content";
    sensorDiv.innerHTML = `
        <h4>
        ${sensor.type == 'temperature'
            ? g_icons.temperature
            : (sensor.type == 'counter'
                ? g_icons.counter
                : (sensor.type == 'switch'
                    ? g_icons.switch
                    : ''))}
        ${getSensorTypeTitle(sensor.type)} Sensor
        </h4>
        <div class="option">
            <p>Sensor Name</p>
            <input type="text" id="sensor-name-${sensor.name}" value="${sensor.name}">
        </div>
        ${renderAdditionalOptions(sensor, sensor.name)}
        <div class="option">
            <button class="delete-btn" onclick="deleteSensor('${sensor.name}')">${g_icons.remove}</button>
            <button onclick="saveSensor('${sensor.name}')">${g_icons.save}</button>  
        </div>
    `;
    return sensorDiv;
}

/**
 * Additional Sensor Settings
 * @param {*} sensor - The sensor object
 * @param {*} sensorName - Name of the selected sensor
 * @returns - Additional settings/fields based on type of sensor
 */
function renderAdditionalOptions(sensor, sensorName) {
    if (sensor.type === "counter") {
        return `
            <div class="option">
                <p>Limit</p>
                <input type="text" id="sensor-limit-${sensorName}" value="${sensor.limit || ''}">
            </div>
        `;
    } else if (sensor.type === "temperature") {
        const unit = sensor.unit || 'F';
        return `
            <div class="option">
                <p>Unit</p>
                <select id="sensor-unit-${sensorName}">
                    <option value="F" ${unit === 'F' ? 'selected' : ''}>Fahrenheit</option>
                    <option value="C" ${unit === 'C' ? 'selected' : ''}>Celsius</option>
                </select>
            </div>
        `;
    }
    return '';
}



/**
 * ! Helper Functions for Settings Components
 */

/**
 * Delete Sensor from List
 * @param {*} sensorName 
 */
function deleteSensor(sensorName) {
    event.stopPropagation();
    const index = sensors.findIndex(sensor => sensor.name === sensorName);
    if (index !== -1) {
        sensors.splice(index, 1);
        initSensorCards();
    }
    sensorCount();
}

/**
 * Save Sensor Settings
 * @param {*} sensorName 
 */
function saveSensor(sensorName) {
    event.stopPropagation();
    const nameInput = document.getElementById(`sensor-name-${sensorName}`);
    const typeSelect = nameInput.parentElement.nextElementSibling.querySelector("select");

    const sensor = sensors.find(sensor => sensor.name === sensorName);
    if (sensor) {
        sensor.name = nameInput.value;
        if (sensor.type === "counter") {
            const limitInput = document.getElementById(`sensor-limit-${sensorName}`);
            const limitValue = parseInt(limitInput.value, 10);
            console.log("Limit value:", limitValue);
            if (!isNaN(limitValue)) {
                sensor.limit = limitValue;
            } else {
                alert("Please enter a valid number for the limit.");
            }
        } else if (sensor.type === "temperature") {
            const unitSelect = document.getElementById(`sensor-unit-${sensorName}`);
            const selectedUnit = unitSelect.value;

            if (sensor.unit !== selectedUnit) {
                // The unit is changing, so convert the values.
                if (selectedUnit === 'C') {
                    sensor.min = convertToCelsius(sensor.min);
                    sensor.max = convertToCelsius(sensor.max);
                    sensor.current = convertToCelsius(sensor.current);
                } else {
                    sensor.min = convertToFahrenheit(sensor.min);
                    sensor.max = convertToFahrenheit(sensor.max);
                    sensor.current = convertToFahrenheit(sensor.current);
                }
                sensor.unit = selectedUnit;
            }
        } else {
            delete sensor.limit;
            delete sensor.unit;
        }

        initSensorCards();
    }
}





// !---- may need these one day -----!
/**
 * Select box of available sensors (not used)
 * @param {*} selectedType 
 * @returns List of available sensor components
 */
// function getSensorTypeOptions(selectedType) {
//     const sensorTypes = ["temperature", "switch", "counter"];
//     return sensorTypes.map(type => `<option value="${type}" ${type === selectedType ? 'selected' : ''}>${getSensorTypeTitle(type)}</option>`).join('');
// }