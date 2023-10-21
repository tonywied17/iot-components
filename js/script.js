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


if(sensors.length == 1){
    Id('sensor-count').innerHTML = `${sensors.length} Sensor Found`;
} else if(sensors <= 0) {
    Id('sensor-count').innerHTML = `No Sensors found`;
}else{
    Id('sensor-count').innerHTML = `${sensors.length} Sensors Found`;
}

