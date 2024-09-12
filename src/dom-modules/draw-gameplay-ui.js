const uiContainer = document.querySelector(".ui-container");
const gameplayUITemplate = document.getElementById("main-ui-template");

export default function drawGameplayUI() {
  while (uiContainer.firstChild)
    uiContainer.removeChild(uiContainer.firstChild);

  const gameplayUI = gameplayUITemplate.content.cloneNode(true);
  uiContainer.appendChild(gameplayUI);
}
