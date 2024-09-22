const uiContainer = document.querySelector(".ui-container");
export default function endTurnBtn() {
  const btn = document.createElement("button");
  btn.classList.add("end-turn-btn");
  btn.textContent = "End Turn";
  uiContainer.appendChild(btn);

  return new Promise((resolve) => {
    btn.addEventListener("click", resolve);
  });
}
