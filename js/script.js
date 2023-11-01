/*
 * File: c:\Users\tonyw\Desktop\www\local\git\iot-components\js\script.js
 * Project: c:\Users\tonyw\Desktop\www\local\git\iot-components\js
 * Created Date: Friday October 27th 2023
 * Author: Tony Wiedman
 * -----
 * Last Modified: Wed November 1st 2023 12:31:06 
 * Modified By: Tony Wiedman
 * -----
 * Copyright (c) 2023 MolexWorks / Tone Web Design
 */


/**
 * Init all sensor data into the client
 * @param {*} view - list, grid: will render card ui based on view choice
 */
function initSensorCards(view) {
    
    isListView = localStorage.getItem('isListView') === 'true' || false;
    isListView ? view = 'list' : view = 'grid';

    Id('sensor-container').innerHTML = '';

    if (view == 'list') {
        sensors.forEach(sensor => {
            let sensorComponent;
            switch (sensor.type) {
                case "temperature":
                    if (sensor.unit == 'F') {
                        sensorComponent = renderTemperatureSensorF(sensor, view);
                    } else {
                        sensorComponent = renderTemperatureSensorC(sensor, view);
                    }

                    break;
                case "switch":
                    sensorComponent = renderSwitchSensor(sensor, view);
                    break;
                case "counter":
                    sensorComponent = renderCounterSensor(sensor, view);
                    break;
            }
            Id('sensor-container').appendChild(sensorComponent);
        });
    } else {
        sensors.forEach(sensor => {
            let sensorComponent;
            switch (sensor.type) {
                case "temperature":
                    if (sensor.unit == 'F') {
                        sensorComponent = renderTemperatureSensorF(sensor);
                    } else {
                        sensorComponent = renderTemperatureSensorC(sensor);
                    }

                    break;
                case "switch":
                    sensorComponent = renderSwitchSensor(sensor);
                    break;
                case "counter":
                    sensorComponent = renderCounterSensor(sensor);
                    break;
            }
            Id('sensor-container').appendChild(sensorComponent);
        });
    }

    sensorCount();
    initSensorCardsSettings();
}


// ! Load User Settings on page load to apply saved settings or defaults
loadUserSettings();
