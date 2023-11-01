/*
 * File: c:\Users\tonyw\Desktop\www\local\git\iot-components\components\CounterSensor.js
 * Project: c:\Users\tonyw\Desktop\www\local\git\iot-components\components
 * Created Date: Friday October 27th 2023
 * Author: Tony Wiedman
 * -----
 * Last Modified: Wed November 1st 2023 12:44:36 
 * Modified By: Tony Wiedman
 * -----
 * Copyright (c) 2023 MolexWorks / Tone Web Design
 */


/**
 * Counter Sensor
 * @param {*} data - sensor data 
 * @param {*} view - ui view/card mode (list, grid)
 * @returns 
 */
function renderCounterSensor(data, view) {
    const card = document.createElement('div');
    const percentage = (data.current / data.limit) * 100;
    let cardClass = "normal";

    if (data.current == (data.limit - 1)) {
        cardClass = "high";
    } else if (percentage >= 50) {
        cardClass = "medium";
    }


    if (view == "list") {
        card.className = 'card-list counter-card';

        card.innerHTML = `
        <div class="sensor-content">
            <div class="header">
                <h3>${g_icons.counter + data.name}</h3>
            </div>
            <div class="counter-list">
            <div class="left-column">
                <span class="sensor-data-label-list">Current</span>
                <span style="font-size:1.1rem;">${data.current} <sup style="font-size:0.7rem;">/ ${data.limit}</sup></span>
            </div>
            <div class="right-column">
                <span class="sensor-data-label-list">Peak</span>
                <span class='counter-peak'>${data.max}</span>
            </div>
            </div>
        </div>
        `;
    } else {
        card.className = 'card counter-card';

        card.innerHTML = `
        <div class="sensor-content">
            <div class="header">
                <h3>${g_icons.counter + data.name}</h3>
            </div>
            <div class="counter">
                <span class="sensor-data-label">Current</span>
                <span style="font-size:3rem;display:block;margin-top:-5px;">${data.current} <sup style="font-size:1rem;">/ ${data.limit}</sup></span>
    
                <span style="display:block;margin-top:1em;" class="sensor-data-label">Peak</span>
                <span class='counter-peak'>${data.max}</span>
            </div>
        </div>
        `;
    }

    

    card.classList.add(cardClass);

    return card;
}
