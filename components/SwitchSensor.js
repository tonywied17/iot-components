function renderSwitchSensor(data) {
    const card = document.createElement('div');
    card.className = `card switch-card ${data.value ? 'on' : 'off'}`;

    card.innerHTML = `
    <div class="sensor-content">
        <div class="header">
            <h3>${data.name}</h3>
        </div>
            <p>Status: ${data.value ? 'On' : 'Off'}</p>
    <div>
    `;

    return card;
}
