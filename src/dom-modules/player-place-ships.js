export default function playerPlaceShips(renderBoard, stopEvent) {
  const player = this;

  // replace with better UI
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
  function placeAll() {
    player.board.placeShip([4, 2], "right", "carrier");
    player.board.placeShip([4, 4], "up", "battleship");
    player.board.placeShip([8, 5], "down", "destroyer");
    player.board.placeShip([2, 3], "left", "submarine");
    player.board.placeShip([0, 8], "right", "patrol");
    renderBoard();
  }

  const form = document.querySelector(".place-ship-form");
  const presetBtn = form.querySelector(".preset-ship-btn");
  presetBtn.addEventListener("click", placeAll);
  form.addEventListener("submit", getInput);

  stopEvent.addListener(function onStop() {
    stopEvent.removeListener(onStop);
    form.removeEventListener("submit", getInput);
    presetBtn.removeEventListener("click", placeAll);
  });
}
