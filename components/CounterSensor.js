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
            <h3>${data.name}</h3>
        </div>
            <p style="font-size:1.2rem;">${data.current} / ${data.limit} Persons</p>
            <p>Min Count: ${data.min}</p>
            <p>Max Count: ${data.max}</p>
    </div>
    `;

    card.classList.add(cardClass);

    return card;
}
