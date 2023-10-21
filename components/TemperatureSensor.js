function renderTemperatureSensor(data) {
    const card = document.createElement('div');
    card.className = 'card temperature-card';

    const temperatureColor = getTemperatureColor(data.current, data.unit);
    let currentUnit = data.unit;

    card.innerHTML = `
    <div class="sensor-content">
        <div class="header">
            <h3>${g_icons.temperature +data.name}</h3>
            <span class="unit-toggle" onclick="toggleUnit('${data.name}')">[°F/°C]</span>
        </div>
        <span style="display:none;" id="unit-${data.name}">${currentUnit}</span>
        <div class="temperatures">
            <div class="left-column">
                <p style="color: ${temperatureColor}; font-size: 1.5rem;">
                    <span id="temp-${data.name}">${data.current.toFixed(2)} °${currentUnit}</span>
                </p>
            </div>
            <div class="right-column">
                <p style="color: ${getTemperatureColor(data.min, currentUnit)};">
                    Min: <span id="temp-min-${data.name}">${data.min.toFixed(2)} °${currentUnit}</span>
                </p>
                <p style="color: ${getTemperatureColor(data.max, currentUnit)};">
                    Max: <span id="temp-max-${data.name}">${data.max.toFixed(2)} °${currentUnit}</span>
                </p>
            </div>
        </div>
        <div class="sensor-graph">(Graph)</div>
    </div>
`;


    return card;
}


function toggleUnit(sensorName) {
    const currentUnit = Id(`unit-${sensorName}`).textContent;
    let newUnit;

    if (currentUnit === "F") {
        newUnit = "C";
        const currentTemperature = parseFloat(Id(`temp-${sensorName}`).textContent);
        const currentMinTemperature = parseFloat(Id(`temp-min-${sensorName}`).textContent)
        const currentMaxTemperature = parseFloat(Id(`temp-max-${sensorName}`).textContent)
        const newTemperature = convertToCelsius(currentTemperature).toFixed(2);
        const newMinTemperature = convertToCelsius(currentMinTemperature).toFixed(2);
        const newMaxTemperature = convertToCelsius(currentMaxTemperature).toFixed(2);
        Id(`temp-${sensorName}`).textContent = `${newTemperature} °${newUnit}`;
        Id(`temp-min-${sensorName}`).textContent = `${newMinTemperature} °${newUnit}`;
        Id(`temp-max-${sensorName}`).textContent = `${newMaxTemperature} °${newUnit}`;
    } else {
        newUnit = "F";
        const currentTemperature = parseFloat(Id(`temp-${sensorName}`).textContent);
        const currentMinTemperature = parseFloat(Id(`temp-min-${sensorName}`).textContent)
        const currentMaxTemperature = parseFloat(Id(`temp-max-${sensorName}`).textContent)
        const newTemperature = convertToFahrenheit(currentTemperature).toFixed(2);
        const newMinTemperature = convertToFahrenheit(currentMinTemperature).toFixed(2);
        const newMaxTemperature = convertToFahrenheit(currentMaxTemperature).toFixed(2);
        Id(`temp-${sensorName}`).textContent = `${newTemperature} °${newUnit}`;
        Id(`temp-min-${sensorName}`).textContent = `${newMinTemperature} °${newUnit}`;
        Id(`temp-max-${sensorName}`).textContent = `${newMaxTemperature} °${newUnit}`;
    }

    const temperatureColor = getTemperatureColor(parseFloat(Id(`temp-${sensorName}`).textContent), newUnit);
    Id(`temp-${sensorName}`).style.color = temperatureColor;
    Id(`unit-${sensorName}`).textContent = newUnit;
}

function convertToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

function convertToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}

function getTemperatureColor(temperature, unit) {
    if ((unit === "F" && temperature >= 80) || (unit === "C" && temperature >= 26.66)) {
        return 'red';
    } else if ((unit === "F" && temperature >= 70) || (unit === "C" && temperature >= 21.11)) {
        return 'orange';
    } else {
        return 'green';
    }
}
