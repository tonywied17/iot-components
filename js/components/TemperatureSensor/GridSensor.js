/**
 * Fahrenheit Sensor
 * @param {*} data - sensor data
 * @returns 
 */
function renderTemperatureGridSensorF(data) {
    const card = document.createElement('div');

        card.className = 'card temperature-card';
        card.innerHTML = `
        <div class="sensor-content">
            <div class="header">
                <h3>${g_icons.temperature + data.name}</h3>
            </div>
            <span style="display:none;" id="unit-${data.name}">${data.unit}</span>
            <div class="temperatures">
                <div class="left-column">
                    <span class="sensor-data-label">Current</span>
                    <div role="temp-gauge-f" aria-valuenow="${data.current.toFixed(2)}" aria-valuemin="0" aria-valuemax="100" style="--value:${data.current.toFixed(2)};--fg:${getTemperatureColor(data.current, data.unit)};"></div>
                </div>    
                <div class="right-column">
                    <p style="color: ${getTemperatureColor(data.min, data.unit)};">
                        <span class="sensor-data-label">Minimum</span>
                        <div role="mini-temp-gauge-f" aria-valuenow="${data.min.toFixed(2)}" aria-valuemin="0" aria-valuemax="100" style="--value:${data.min.toFixed(2)};--fg:${getTemperatureColor(data.min, data.unit)};"></div>    
                    </p>
                    <p style="color: ${getTemperatureColor(data.max, data.unit)};">
                    <span class="sensor-data-label">Maximum</span>
                    <div role="mini-temp-gauge-f" aria-valuenow="${data.max.toFixed(2)}" aria-valuemin="0" aria-valuemax="100" style="--value:${data.max.toFixed(2)};--fg:${getTemperatureColor(data.max, data.unit)};"></div>
                    </p>
                </div>
            </div>
        </div>
    `;
    card.classList.add(temperatureCardClass(data));
    return card;
}

/**
 * Celsius Sensor
 * @param {*} data 
 * @returns 
 */
function renderTemperatureGridSensorC(data) {
    const card = document.createElement('div');
    
        card.className = 'card temperature-card';
        card.innerHTML = `
        <div class="sensor-content">
            <div class="header">
                <h3>${g_icons.temperature + data.name}</h3>
            </div>
            <span style="display:none;" id="unit-${data.name}">${data.unit}</span>
            <div class="temperatures">
                <div class="left-column">
                    <span class="sensor-data-label">Current</span>
                    <div role="temp-gauge-c" aria-valuenow="${data.current.toFixed(2)}" aria-valuemin="0" aria-valuemax="100" style="--value:${convertToFahrenheit(data.current).toFixed(2)};--fg:${getTemperatureColor(data.current, data.unit)};"></div>
                </div>      
                <div class="right-column">
                    <p style="color: ${getTemperatureColor(data.min, data.unit)};">
                        <span class="sensor-data-label">Minimum</span>
                        <div role="mini-temp-gauge-c" aria-valuenow="${data.min.toFixed(2)}" aria-valuemin="0" aria-valuemax="100" style="--value:${convertToFahrenheit(data.min).toFixed(2)};--fg:${getTemperatureColor(data.min, data.unit)};"></div>    
                    </p>
                    <p style="color: ${getTemperatureColor(data.max, data.unit)};">
                    <span class="sensor-data-label">Maximum</span>
                    <div role="mini-temp-gauge-c" aria-valuenow="${data.max.toFixed(2)}" aria-valuemin="0" aria-valuemax="100" style="--value:${convertToFahrenheit(data.max).toFixed(2)};--fg:${getTemperatureColor(data.max, data.unit)};"></div>
                    </p>
                </div>
            </div>
        </div>
    `;
    card.classList.add(temperatureCardClass(data));
    return card;
}
