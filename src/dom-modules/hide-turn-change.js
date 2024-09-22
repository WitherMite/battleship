const uiContainer = document.querySelector(".ui-container");
const hideScreenTemplate = document.getElementById("hide-screen-template");

export default function hideTurnChange() {
  while (uiContainer.firstChild)
    uiContainer.removeChild(uiContainer.firstChild);

  const hideScreen = hideScreenTemplate.content.cloneNode(true);
  uiContainer.appendChild(hideScreen);

  return new Promise((resolve) => {
    const button = document.querySelector(".show-screen-btn");
    button.addEventListener("click", resolve);
  });
}
