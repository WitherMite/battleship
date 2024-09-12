const uiContainer = document.querySelector(".ui-container");
const playerUITemplate = document.getElementById("pregame-ui-template");
const cpuUITemplate = document.getElementById("pregame-cpu-ui-template");

export default function drawShipPlacementUI(playerPov) {
  while (uiContainer.firstChild)
    uiContainer.removeChild(uiContainer.firstChild);

  const ui =
    playerPov === "computer"
      ? cpuUITemplate.content.cloneNode(true)
      : playerUITemplate.content.cloneNode(true);
  uiContainer.appendChild(ui);
}
