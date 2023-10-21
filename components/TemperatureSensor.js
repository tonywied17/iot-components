function renderTemperatureSensor(data) {
    const card = document.createElement('div');
    card.className = 'card temperature-card';

    const temperatureColor = getTemperatureColor(data.current, data.unit);
    let currentUnit = data.unit;

    card.innerHTML = `
    <div class="sensor-content">
        <h3>${data.name} <span class="unit-toggle" onclick="toggleUnit('${data.name}')">[°F/°C]</span></h3>
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
    </div>
`;

    return card;
}


function toggleUnit(sensorName) {
    const unitElement = document.getElementById(`unit-${sensorName}`);
    const tempElement = document.getElementById(`temp-${sensorName}`);
    const tempMinElement = document.getElementById(`temp-min-${sensorName}`);
    const currentUnit = unitElement.textContent;
    let newUnit;

    if (currentUnit === "F") {
        newUnit = "C";
        const currentTemperature = parseFloat(tempElement.textContent);
        const currentMinTemperature = parseFloat(tempMinElement.textContent)
        const newTemperature = convertToCelsius(currentTemperature).toFixed(2);
        const newMinTemperature = convertToCelsius(currentMinTemperature).toFixed(2);
        tempElement.textContent = `${newTemperature} °${newUnit}`;
        tempMinElement.textContent = `${newMinTemperature} °${newUnit}`;
    } else {
        newUnit = "F";
        const currentTemperature = parseFloat(tempElement.textContent);
        const currentMinTemperature = parseFloat(tempMinElement.textContent)
        const newTemperature = convertToFahrenheit(currentTemperature).toFixed(2);
        const newMinTemperature = convertToFahrenheit(currentMinTemperature).toFixed(2);
        tempElement.textContent = `${newTemperature} °${newUnit}`;
        tempMinElement.textContent = `${newMinTemperature} °${newUnit}`;
    }

    const temperatureColor = getTemperatureColor(parseFloat(tempElement.textContent), newUnit);
    tempElement.style.color = temperatureColor;
    unitElement.textContent = newUnit;
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
