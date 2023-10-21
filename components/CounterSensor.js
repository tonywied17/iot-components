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
        <h3>${data.name}</h3>
        <p style="font-size:1.2rem;">${data.current} / ${data.limit} Persons</p>
        <p>Min Count: ${data.min}</p>
        <p>Max Count: ${data.max}</p>
    `;

    card.classList.add(cardClass);

    return card;
}
