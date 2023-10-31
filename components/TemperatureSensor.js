/* <p style="color: ${temperatureColor}; font-size: 1.5rem;">
<span id="temp-${data.name}">${data.current.toFixed(2)} °${data.unit}</span>
</p> 


<span id="temp-min-${data.name}">${data.min.toFixed(2)} °${data.unit}</span>

*/

/**
 * Fahrenheit Sensor
 * @param {*} data 
 * @returns 
 */
function renderTemperatureSensorF(data) {
    const card = document.createElement('div');
    card.className = 'card temperature-card';

    let cardClass = "normal";

    if ((data.unit === "F" && data.current >= 80) || (data.unit === "C" && data.current >= 26.66)) {
        cardClass = "high";
    } else if ((data.unit === "F" && data.current >= 70) || (data.unit === "C" && data.current >= 21.11)) {
        cardClass = "medium";
    }

    card.innerHTML = `
    <div class="sensor-content">
        <div class="header">
            <h3>${g_icons.temperature +data.name}</h3>
        </div>
        <span style="display:none;" id="unit-${data.name}">${data.unit}</span>
        <div class="temperatures">
            <div class="left-column">
                <span class="temp-label">Current</span>
                <div role="temp-gauge-f" aria-valuenow="${data.current.toFixed(2)}" aria-valuemin="0" aria-valuemax="100" style="--value:${data.current.toFixed(2)};--fg:${getTemperatureColor(data.current, data.unit)};"></div>
            </div>    
            <div class="right-column">
                <p style="color: ${getTemperatureColor(data.min, data.unit)};">
                    <span class="temp-label">Minimum</span>
                    <div role="mini-temp-gauge-f" aria-valuenow="${data.min.toFixed(2)}" aria-valuemin="0" aria-valuemax="100" style="--value:${data.min.toFixed(2)};--fg:${getTemperatureColor(data.min, data.unit)};"></div>    
                </p>
                <p style="color: ${getTemperatureColor(data.max, data.unit)};">
                <span class="temp-label">Maximum</span>
                <div role="mini-temp-gauge-f" aria-valuenow="${data.max.toFixed(2)}" aria-valuemin="0" aria-valuemax="100" style="--value:${data.max.toFixed(2)};--fg:${getTemperatureColor(data.max, data.unit)};"></div>
                </p>
            </div>
        </div>
    </div>
`;

    card.classList.add(cardClass);

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

    let cardClass = "normal";

    if ((data.unit === "F" && data.current >= 80) || (data.unit === "C" && data.current >= 26.66)) {
        cardClass = "high";
    } else if ((data.unit === "F" && data.current >= 70) || (data.unit === "C" && data.current >= 21.11)) {
        cardClass = "medium";
    }


    card.innerHTML = `
    <div class="sensor-content">
        <div class="header">
            <h3>${g_icons.temperature +data.name}</h3>
        </div>
        <span style="display:none;" id="unit-${data.name}">${data.unit}</span>
        <div class="temperatures">
            <div class="left-column">
                <span class="temp-label">Current</span>
                <div role="temp-gauge-c" aria-valuenow="${data.current.toFixed(2)}" aria-valuemin="0" aria-valuemax="100" style="--value:${convertToFahrenheit(data.current).toFixed(2)};--fg:${getTemperatureColor(data.current, data.unit)};"></div>
            </div>      
            <div class="right-column">
                <p style="color: ${getTemperatureColor(data.min, data.unit)};">
                    <span class="temp-label">Minimum</span>
                    <div role="mini-temp-gauge-c" aria-valuenow="${data.min.toFixed(2)}" aria-valuemin="0" aria-valuemax="100" style="--value:${convertToFahrenheit(data.min).toFixed(2)};--fg:${getTemperatureColor(data.min, data.unit)};"></div>    
                </p>
                <p style="color: ${getTemperatureColor(data.max, data.unit)};">
                <span class="temp-label">Maximum</span>
                <div role="mini-temp-gauge-c" aria-valuenow="${data.max.toFixed(2)}" aria-valuemin="0" aria-valuemax="100" style="--value:${convertToFahrenheit(data.max).toFixed(2)};--fg:${getTemperatureColor(data.max, data.unit)};"></div>
                </p>
            </div>
        </div>
    </div>
`;

    card.classList.add(cardClass);

    return card;
}


function convertToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

function convertToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}

/**
 * @TODO Make global settings for normal, warn, and alarm percentages
 * @param {*} temperature 
 * @param {*} unit 
 * @returns 
 */
function getTemperatureColor(temperature, unit) {
    if ((unit === "F" && temperature >= 80) || (unit === "C" && temperature >= 26.66)) {
        return '#e73e3e';
    } else if ((unit === "F" && temperature >= 70) || (unit === "C" && temperature >= 21.11)) {
        return '#ff9933';
    } else {
        return '#138944';
    }
}
