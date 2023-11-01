/*
 * File: c:\Users\tonyw\Desktop\www\local\git\iot-components\js\storage.js
 * Project: c:\Users\tonyw\Desktop\www\local\git\iot-components\js
 * Created Date: Wednesday November 1st 2023
 * Author: Tony Wiedman
 * -----
 * Last Modified: Wed November 1st 2023 12:29:37 
 * Modified By: Tony Wiedman
 * -----
 * Copyright (c) 2023 MolexWorks / Tone Web Design
 */


function saveUserSettings() {
    localStorage.setItem('isDarkMode', isDarkMode);
    localStorage.setItem('isListView', isListView);
}


function loadUserSettings() {
    isDarkMode = localStorage.getItem('isDarkMode') === 'true' || false;
    isListView = localStorage.getItem('isListView') === 'true' || false;

    if (isDarkMode) {
        document.documentElement.setAttribute('data-theme', 'night');
        Id('mode-toggle').innerHTML = g_icons.light_mode;
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        Id('mode-toggle').innerHTML = g_icons.dark_mode;
    }

    if (!isListView) {
        Id('view-toggle').innerHTML = g_icons.list_view;
    } else {
        Id('view-toggle').innerHTML = g_icons.grid_view;
    }

    initSensorCards(isListView ? 'list' : 'grid');
}



// ! ------------------- Faux Sensor Data -------------------- ! //
const sensors = [
    {
        name: "Living Room Temperature",
        type: "temperature",
        min: 68,
        max: 78,
        unit: "F",
        current: 72
    },
    {
        name: "Kitchen Temperature",
        type: "temperature",
        min: 25,
        max: 35,
        unit: "C",
        current: 32
    },
    {
        name: "Bedroom Temperature",
        type: "temperature",
        min: 49,
        max: 80,
        unit: "F",
        current: 64
    },
    {
        name: "Server Room 1",
        type: "temperature",
        min: 52,
        max: 61,
        unit: "F",
        current: 56
    },
    {
        name: "Outdoor Temperature",
        type: "temperature",
        min: 50,
        max: 90,
        unit: "F",
        current: 62
    },
    {
        name: "Living Room Light",
        type: "switch",
        value: true
    },
    {
        name: "Kitchen Light",
        type: "switch",
        value: false
    },
    {
        name: "Occupancy Sensor 1",
        type: "counter",
        min: 0,
        max: 6,
        current: 8,
        limit: 10
    },
    {
        name: "Occupancy Sensor 2",
        type: "counter",
        min: 0,
        max: 16,
        current: 10,
        limit: 25
    },
    {
        name: "Occupancy Sensor 3",
        type: "counter",
        min: 0,
        max: 3,
        current: 9,
        limit: 15
    }
];