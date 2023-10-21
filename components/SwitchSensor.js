function renderSwitchSensor(data) {
    const card = document.createElement('div');
    card.className = `card switch-card ${data.value ? 'on' : 'off'}`;

    card.innerHTML = `
        <h3>${data.name}</h3>
        <p>Status: ${data.value ? 'On' : 'Off'}</p>
    `;

    return card;
}
