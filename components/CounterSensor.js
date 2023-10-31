function renderCounterSensor(data) {
    const card = document.createElement('div');
    card.className = 'card counter-card';

    const percentage = (data.current / data.limit) * 100;
    let cardClass = "normal";

    if (data.current == (data.limit - 1)) {
        cardClass = "high";
    } else if (percentage >= 50) {
        cardClass = "medium";
    }

    card.innerHTML = `
    <div class="sensor-content">
        <div class="header">
            <h3>${g_icons.counter + data.name}</h3>
        </div>
        <div class="counter">
            <span class="temp-label">Current</span>
            <span style="font-size:3rem;display:block;margin-top:-5px;">${data.current} <sup style="font-size:1rem;">/ ${data.limit}</sup></span>

            <span style="display:block;margin-top:1em;" class="temp-label">Peak</span>
            <span style="color: rgb(229 229 229) !important;">${data.max}</span>
        </div>
    </div>
    `;

    card.classList.add(cardClass);

    return card;
}
