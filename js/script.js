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

var g_icons = {
    switch: `<i class="fa-regular fa-lightbulb"></i>`,
    counter: `<i class="fa-solid fa-people-group"></i>`,
    temperature: `<i class="fa-solid fa-temperature-quarter"></i>`
};


function initSensorCards() {
    Id('sensor-container').innerHTML = '';

    sensors.forEach(sensor => {
        let sensorComponent;
        switch (sensor.type) {
            case "temperature":
                sensorComponent = renderTemperatureSensor(sensor);
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
    sensorCount();
    initSensorCardsSettings();
}


function sensorCount() {
    if (sensors.length === 1) {
        Id('sensor-count').innerHTML = `${sensors.length} Sensor Found`;
    } else if (sensors.length === 0) {
        Id('sensor-count').innerHTML = `No Sensors found`;
    } else {
        Id('sensor-count').innerHTML = `${sensors.length} Sensors Found`;
    }
}

function toggleDiv(divId) {
    const div = document.getElementById(divId);
    if (div.style.display === "none" || div.style.display === "") {
        div.style.display = "block";
    } else {
        div.style.display = "none";
    }
}

function initSensorCardsSettings() {
    const sensorList = document.getElementById('sensor-list');
    sensorList.innerHTML = '';

    sensors.forEach(sensor => {
        const sensorComponent = renderSensorSetting(sensor);
        sensorList.appendChild(sensorComponent);
    });
}

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


function getSensorTypeTitle(type) {
    switch (type) {
        case "temperature":
            return "Temperature";
        case "switch":
            return "Switch";
        case "counter":
            return "Counter";
        default:
            return "Unknown";
    }
}

function renderAdditionalOptions(sensor, sensorName) {
    if (sensor.type === "counter") {
        return `
            <div class="option">
                <p>Limit</p>
                <input type="text" id="sensor-limit-${sensorName}" value="${sensor.limit || ''}">
            </div>
        `;
    }
    return '';
}


function deleteSensor(sensorName) {
    const index = sensors.findIndex(sensor => sensor.name === sensorName);
    if (index !== -1) {
        sensors.splice(index, 1);
        initSensorCards();
    }
    sensorCount();
}

function getSensorTypeOptions(selectedType) {
    const sensorTypes = ["temperature", "switch", "counter"];
    return sensorTypes.map(type => `<option value="${type}" ${type === selectedType ? 'selected' : ''}>${getSensorTypeTitle(type)}</option>`).join('');
}


function saveSensor(sensorName) {
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
        } else {
            delete sensor.limit;
        }
        initSensorCards();
    }
}



initSensorCards();