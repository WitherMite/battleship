const form = document.querySelector(".place-ship-form");

export default function playerPlaceShips(renderBoard, stopEvent) {
  // replace with better UI
  const player = this;
  function getInput(e) {
    e.preventDefault();
    const coordinate = [
      Number(document.querySelector(".temp-x-input").value) - 1,
      Number(document.querySelector(".temp-y-input").value) - 1,
    ];
    const direction = document.querySelector(".temp-direction-input").value;
    const shipType = document.querySelector(".temp-ship-input").value;
    player.board.placeShip(coordinate, direction, shipType);
    renderBoard();
    form.reset();
    document.querySelector(".temp-x-input").focus();
  }
  form.addEventListener("submit", getInput);
  stopEvent.addListener(function onStop() {
    stopEvent.removeListener(onStop);
    form.removeEventListener("submit", getInput);
  });
}
