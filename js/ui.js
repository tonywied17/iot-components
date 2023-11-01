/*
 * File: c:\Users\tonyw\Desktop\www\local\git\iot-components\js\ui.js
 * Project: c:\Users\tonyw\Desktop\www\local\git\iot-components\js
 * Created Date: Wednesday November 1st 2023
 * Author: Tony Wiedman
 * -----
 * Last Modified: Wed November 1st 2023 12:41:24 
 * Modified By: Tony Wiedman
 * -----
 * Copyright (c) 2023 MolexWorks / Tone Web Design
 */


/**
 * ! Global Icons
 * ? https://fonts.google.com/icons
 */
var g_icons = {
    switch: `<span class="material-symbols-outlined nav-icon">switches</span>`,
    counter: `<span class="material-symbols-outlined nav-icon">groups_2</span>`,
    temperature: `<span class="material-symbols-outlined nav-icon">device_thermostat</span>`,
    dash: `<span class="material-symbols-outlined nav-icon">speed</span>`,
    groups: `<span class="material-symbols-outlined nav-icon">workspaces</span>`,
    settings: `<span class="material-symbols-outlined nav-icon">settings</span>`,
    dark_mode: `<span class="material-symbols-outlined">dark_mode</span>`,
    light_mode: `<span class="material-symbols-outlined">light_mode</span>`,
    list_view: `<span class="material-symbols-outlined">view_list</span>`,
    grid_view: `<span class="material-symbols-outlined">grid_view</span>`,
    save: `<span class="material-symbols-outlined">save</span>`,
    remove: `<span class="material-symbols-outlined">delete</span>`
};



/**
 * ! UI Event Listeners
 */

// ? Settings Overlay
Id("settings-link").addEventListener('click', function (event) {
    event.preventDefault();
    toggleOverlay('settings-overlay');
});
closeOverlay('settings-overlay', Id("settings-link"));

// ? Dark Mode Toggle
Id('mode-toggle').addEventListener('click', function () {
    isDarkMode = !isDarkMode;
    saveUserSettings();

    if (isDarkMode) {
        document.documentElement.setAttribute('data-theme', 'night');
        Id('mode-toggle').innerHTML = g_icons.light_mode;
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        Id('mode-toggle').innerHTML = g_icons.dark_mode;
    }
});

// ? List/Grid View Toggle
Id('view-toggle').addEventListener('click', function () {
    isListView = !isListView;
    saveUserSettings();

    if (!isListView) {
        Id('view-toggle').innerHTML = g_icons.list_view;
    } else {
        Id('view-toggle').innerHTML = g_icons.grid_view;
    }
    initSensorCards(isListView ? 'list' : 'grid');
});



/**
 * ! UI Helper Functions
 */

/**
 * ? Sensor Types Display Title
 * @param {*} type 
 * @returns First char of sensor type capitalized for UI purposes.
 */
function getSensorTypeTitle(type) {
    return type.charAt(0).toUpperCase() + type.slice(1);
}

/**
 * ? DIV/Overlay Toggler
 * Toggles requested overlay, will need a corresponding overlay event listener above
 * @param {*} overlayId
 */
function toggleOverlay(overlayId) {
    const overlay = document.getElementById(overlayId);
    if (overlay.style.display === "block") {
        overlay.style.display = "none";
    } else {
        overlay.style.display = "block";
    }
}

/**
 * ? DIV/Overlay Closer
 * This will close the overlay if you click outside of that target/overlay
 * @param {*} overlayId
 * @param {*} triggerElement
 */
function closeOverlay(overlayId, triggerElement) {
    document.addEventListener('click', function (event) {
        const overlay = document.getElementById(overlayId);
        if (overlay.style.display === "block" && event.target !== triggerElement && !overlay.contains(event.target)) {
            overlay.style.display = "none";
        }
    });
}

/**
 * Counts sensor objects in the array
 */
function sensorCount() {
    if (sensors.length === 1) {
        Id('sensor-count').innerHTML = `${sensors.length} Sensor Found`;
    } else if (sensors.length === 0) {
        Id('sensor-count').innerHTML = `No Sensors found`;
    } else {
        Id('sensor-count').innerHTML = `${sensors.length} Sensors Found`;
    }
}