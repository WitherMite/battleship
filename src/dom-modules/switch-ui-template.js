const uiContainer = document.querySelector(".ui-container");

export default function switchUITemplate(templateID) {
  const uiTemplate = document.getElementById(templateID);
  while (uiContainer.firstChild)
    uiContainer.removeChild(uiContainer.firstChild);

  const ui = uiTemplate.content.cloneNode(true);
  uiContainer.appendChild(ui);
}
