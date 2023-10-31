function renderSwitchSensor(data) {
    const card = document.createElement('div');
    card.className = `card switch-card ${data.value ? 'on' : 'off'}`;
    card.innerHTML = `
    <div class="sensor-content">
        <div class="header">
            <h3>${g_icons.switch + data.name}</h3>
        </div>
        <div class="switch">
            <span class="temp-label">Switch State</span>
            <span style="font-size:2rem;">${data.value ? 'On' : 'Off'}</span>
        </div>
    <div>
    `;

    return card;
}
