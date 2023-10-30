/* <p style="color: ${temperatureColor}; font-size: 1.5rem;">
<span id="temp-${data.name}">${data.current.toFixed(2)} °${data.unit}</span>
</p> */

/**
 * Fahrenheit Sensor
 * @param {*} data 
 * @returns 
 */
function renderTemperatureSensorF(data) {
    const card = document.createElement('div');
    card.className = 'card temperature-card';

    const temperatureColor = getTemperatureColor(data.current, data.unit);

    card.innerHTML = `
    <div class="sensor-content">
        <div class="header">
            <h3>${g_icons.temperature +data.name}</h3>
        </div>
        <span style="display:none;" id="unit-${data.name}">${data.unit}</span>
        <div class="temperatures">
            <div class="left-column">
                <div role="progressbar-f" aria-valuenow="${data.current.toFixed(2)}" aria-valuemin="0" aria-valuemax="100" style="--value:${data.current.toFixed(2)};--fg:${temperatureColor};"></div>
            </div>    
            <div class="right-column">
                <p style="color: ${getTemperatureColor(data.min, data.unit)};">
                    <span class="temp-label">Minimum</span>
                    <span id="temp-min-${data.name}">${data.min.toFixed(2)} °${data.unit}</span>
                </p>
                <p style="color: ${getTemperatureColor(data.max, data.unit)};">
                <span class="temp-label">Maximum</span>
                <span id="temp-max-${data.name}">${data.max.toFixed(2)} °${data.unit}</span>
                </p>
            </div>
        </div>
    </div>
`;


    return card;
}

/**
 * Celsius Sensor
 * @param {*} data 
 * @returns 
 */
function renderTemperatureSensorC(data) {
    const card = document.createElement('div');
    card.className = 'card temperature-card';

    const temperatureColor = getTemperatureColor(data.current, data.unit);

    card.innerHTML = `
    <div class="sensor-content">
        <div class="header">
            <h3>${g_icons.temperature +data.name}</h3>
        </div>
        <span style="display:none;" id="unit-${data.name}">${data.unit}</span>
        <div class="temperatures">
            <div class="left-column">
                <div role="progressbar-c" aria-valuenow="${data.current.toFixed(2)}" aria-valuemin="0" aria-valuemax="100" style="--value:${convertToFahrenheit(data.current).toFixed(2)};--fg:${temperatureColor};"></div>
            </div>    
            <div class="right-column">
                <p style="color: ${getTemperatureColor(data.min, data.unit)};">
                <span class="temp-label">Minimum</span>
                <span id="temp-min-${data.name}">${data.min.toFixed(2)} °${data.unit}</span>
                </p>
                <p style="color: ${getTemperatureColor(data.max, data.unit)};">
                <span class="temp-label">Maximum</span>
                <span id="temp-max-${data.name}">${data.max.toFixed(2)} °${data.unit}</span>
                </p>
            </div>
        </div>
    </div>
`;


    return card;
}


function convertToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

function convertToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}

function getTemperatureColor(temperature, unit) {
    if ((unit === "F" && temperature >= 80) || (unit === "C" && temperature >= 26.66)) {
        return '#e73e3e';
    } else if ((unit === "F" && temperature >= 70) || (unit === "C" && temperature >= 21.11)) {
        return '#ff9933';
    } else {
        return '#138944';
    }
}
