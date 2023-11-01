/**
 * Fahrenheit Sensor
 * @param {*} data - sensor data
 * @returns 
 */
function renderTemperatureListSensorF(data) {
    const card = document.createElement('div');

        card.className = 'card-list temperature-card';
        card.innerHTML = `
        <div class="sensor-content">
            <div class="header">
                <h3>${g_icons.temperature + data.name}</h3>
            </div>
            <div class="temperatures-list">
                <div class="left-column">
                    <span class="sensor-data-label-list">Current</span>
                    <span style="color: ${getTemperatureColor(data.current, data.unit)};">${data.current.toFixed(2)} °${data.unit}</span>
                </div>

                <div class="right-column">
                    <span class="sensor-data-label-list">Min</span>
                    <span style="color: ${getTemperatureColor(data.min, data.unit)};">${data.min.toFixed(2)} °${data.unit}</span>
                        <br />
                    <span class="sensor-data-label-list">Max</span>
                    <span style="color: ${getTemperatureColor(data.max, data.unit)};">${data.max.toFixed(2)} °${data.unit}</span>
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
function renderTemperatureListSensorC(data) {
    const card = document.createElement('div');
    
        card.className = 'card-list temperature-card';
        card.innerHTML = `
        <div class="sensor-content">
            <div class="header">
                <h3>${g_icons.temperature + data.name}</h3>
            </div>
            <div class="temperatures-list">
                <div class="left-column">
                    <span class="sensor-data-label-list">Current</span>
                    <span style="color: ${getTemperatureColor(data.current, data.unit)};">${data.current.toFixed(2)} °${data.unit}</span>
                </div>

                <div class="right-column">
                    <span class="sensor-data-label-list">Min</span>
                    <span style="color: ${getTemperatureColor(data.min, data.unit)};">${data.min.toFixed(2)} °${data.unit}</span>
                        <br />
                    <span class="sensor-data-label-list">Max</span>
                    <span style="color: ${getTemperatureColor(data.max, data.unit)};">${data.max.toFixed(2)} °${data.unit}</span>
                </div>
            </div>
        </div>
    `;

    card.classList.add(temperatureCardClass(data));
    return card;
}



