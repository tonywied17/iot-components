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


const sensorContainer = document.getElementById('sensor-container');

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
    sensorContainer.appendChild(sensorComponent);
});
