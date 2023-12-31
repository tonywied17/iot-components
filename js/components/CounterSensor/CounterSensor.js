/**
 * Counter Sensor
 * @param {*} data - sensor data 
 * @param {*} view - ui view/card mode (list, grid)
 * @returns 
 */
function renderCounterSensor(data, view) {
    const card = document.createElement('div');

    if (view == "list") { 
        
        // ! List View Card
        
        card.className = 'card-list counter-card';
        card.innerHTML = `
        <div class="sensor-content">
            <div class="header">
                <h3>${g_icons.counter + data.name}</h3>
            </div>
            <div class="counter-list">
            <div class="left-column">
                <span class="sensor-data-label-list">Current</span>
                <span style="font-size:1.1rem;">${data.current} <sup style="font-size:0.7rem;">/ ${data.limit}</sup></span>
            </div>
            <div class="right-column">
                <span class="sensor-data-label-list">Peak</span>
                <span class='counter-peak'>${data.max}</span>
            </div>
            </div>
        </div>
        `;

    } else {     
        
        // ! Grid View Card
        
        card.className = 'card counter-card';
        card.innerHTML = `
        <div class="sensor-content">
            <div class="header">
                <h3>${g_icons.counter + data.name}</h3>
            </div>
            <div class="counter">
                <span class="sensor-data-label">Current</span>
                <span style="font-size:3rem;display:block;margin-top:-5px;">${data.current} <sup style="font-size:1rem;">/ ${data.limit}</sup></span>
    
                <span style="display:block;margin-top:1em;" class="sensor-data-label">Peak</span>
                <span class='counter-peak'>${data.max}</span>
            </div>
        </div>
        `;
        
    }
    
    card.classList.add(counterCardClass(data));

    return card;
}
