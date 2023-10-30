function renderCounterSensor(data) {
    const card = document.createElement('div');
    card.className = 'card counter-card';

    const percentage = (data.current / data.limit) * 100;
    let cardClass = "normal";

    if (percentage >= 75) {
        cardClass = "high";
    } else if (percentage >= 50) {
        cardClass = "medium";
    }

    card.innerHTML = `
    <div class="sensor-content">
        <div class="header">
            <h3>${g_icons.counter + data.name}</h3>
        </div>
            <span style="font-size:3rem;">${data.current} <sup style="font-size:1rem;">/ ${data.limit}</sup></span>
            <p>Peak: ${data.max}</p>
    </div>
    `;

    card.classList.add(cardClass);

    return card;
}
