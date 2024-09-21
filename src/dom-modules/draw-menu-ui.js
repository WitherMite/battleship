const uiContainer = document.querySelector(".ui-container");
const menuUITemplate = document.getElementById("menu-ui-template");

export default function drawMenuUI() {
  while (uiContainer.firstChild)
    uiContainer.removeChild(uiContainer.firstChild);

  const menuUI = menuUITemplate.content.cloneNode(true);
  uiContainer.appendChild(menuUI);
}
