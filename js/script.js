// Some Faux Sensor Data
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

// Global Icons for Sensor Types
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
};

/**
 * Iterates through the array of sensor objects and renders the corresponding sensor component
 */
function initSensorCards(view) {
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

/**
 * Iterates the array of sensor objects and calls teh render sensor setting method for each one
 */
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
            <button class="delete-btn" onclick="deleteSensor('${sensor.name}')"><i class="fa-solid fa-x btn-icon"></i>Delete</button>
            <button onclick="saveSensor('${sensor.name}')"><i class="fa-regular fa-floppy-disk btn-icon"></i>Save</button>
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

/**
 * Select box of available sensors (not used)
 * @param {*} selectedType 
 * @returns List of available sensor components
 */
function getSensorTypeOptions(selectedType) {
    const sensorTypes = ["temperature", "switch", "counter"];
    return sensorTypes.map(type => `<option value="${type}" ${type === selectedType ? 'selected' : ''}>${getSensorTypeTitle(type)}</option>`).join('');
}

/**
 * Sensor Types Display Title
 * @param {*} type 
 * @returns First char of sensor type capitalized for UI purposes.
 */
function getSensorTypeTitle(type) {
    return type.charAt(0).toUpperCase() + type.slice(1);
}

/**
 * Toggles requested overlay, will need a navigation listener below
 * @param {*} overlayId - the id of the dom element you wish to toggle visibility of
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
 * Toggles requested overlay closed
 * @param {*} overlayId - the id of the dom element you wish to toggle visibility of
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
 * Navigation Listeners for Overlays
 */
// ? Settings Overlay
Id("settings-link").addEventListener('click', function (event) {
    event.preventDefault();
    toggleOverlay('settings-overlay');
});
closeOverlay('settings-overlay', Id("settings-link"));

/**
 * Listeners for filter container options
 */
// ? List View, Grid View
let isListView = false;
Id('view-toggle').addEventListener('click', function () {
    isListView = !isListView;
    if (!isListView) {
        Id('view-toggle').innerHTML = g_icons.list_view;
    } else {
        Id('view-toggle').innerHTML = g_icons.grid_view;
    }
    initSensorCards(isListView ? 'list' : 'grid');
});

/**
 * Theme Mode Toggle Listeners
 */
let isDarkMode = false;
const modeToggle = document.getElementById('mode-toggle');

modeToggle.addEventListener('click', function () {
    isDarkMode = !isDarkMode;

    if (isDarkMode) {
        document.documentElement.setAttribute('data-theme', 'night');
        modeToggle.innerHTML = g_icons.light_mode;
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        modeToggle.innerHTML = g_icons.dark_mode;
    }
});



// ! Init Sensor Cards.
initSensorCards();