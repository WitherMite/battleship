const uiContainer = document.querySelector(".ui-container");

export default function switchUITemplate(templateID) {
  const UITemplate = document.getElementById(templateID);
  while (uiContainer.firstChild)
    uiContainer.removeChild(uiContainer.firstChild);

  const UI = UITemplate.content.cloneNode(true);
  uiContainer.appendChild(UI);
}
