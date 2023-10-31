function renderSwitchSensor(data, view) {
  const card = document.createElement("div");

  if (view == "list") {
    card.className = `card-list switch-card ${data.value ? "on" : "off"}`;

    card.innerHTML = `
        <div class="sensor-content">
            <div class="header">
                <h3>${g_icons.switch + data.name}</h3>
            </div>
            
          <div class="switch-list">
            <div class="left-column">
                <span class="sensor-data-label-list">Switch State</span>
            </div>
            <div class="right-column">
                <span>${data.value ? "On" : "Off"}</span>
            </div>
          </div>
        
        <div>
        `;
  } else {
    card.className = `card switch-card ${data.value ? "on" : "off"}`;

    card.innerHTML = `
        <div class="sensor-content">
            <div class="header">
                <h3>${g_icons.switch + data.name}</h3>
            </div>
            
            <div class="switch">
                <span class="sensor-data-label">Switch State</span>
                <span style="font-size:2rem;">${
                  data.value ? "On" : "Off"
                }</span>
            </div>
        <div>
        `;
  }

  return card;
}
