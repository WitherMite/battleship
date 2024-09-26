export default function playerPlaceShips(renderBoard, stopEvent) {
  const player = this;
  const form = document.querySelector(".place-ship-form");
  const submitBtn = document.querySelector(".place-ship-btn");
  const presetBtn = form.querySelector(".preset-ship-btn");
  const nameInput = document.getElementById("name");
  const xInput = document.getElementById("x-pos");
  const yInput = document.getElementById("y-pos");
  const directionInput = document.getElementById("direction");
  const shipTypeInput = document.getElementById("ship-type");

  presetBtn.addEventListener("click", placeRandom);
  submitBtn.addEventListener("click", getInput);
  enableSetFormCoordinatesOnTileClick();

  stopEvent.addListener(function onStop() {
    stopEvent.removeListener(onStop);
    form.removeEventListener("submit", getInput);
    presetBtn.removeEventListener("click", placeRandom);
  });

  function getInput(event) {
    event.preventDefault();
    player.name = nameInput.value;
    const coordinates = [Number(xInput.value) - 1, Number(yInput.value) - 1];
    const direction = directionInput.value;
    const shipType = shipTypeInput.value;
    try {
      player.board.placeShip(coordinates, direction, shipType);
    } catch (err) {
      // show error on last form input
      shipTypeInput.setCustomValidity(err.message);
      shipTypeInput.reportValidity();
    }
    renderBoard();
    enableSetFormCoordinatesOnTileClick();
  }

  function placeRandom(e) {
    // steal from cpu real quick
    e.preventDefault();
    const ships = player.board.getUnplacedShips();
    ships.forEach(attemptPlace);
    renderBoard();

    function attemptPlace(ship) {
      try {
        player.board.placeShip(getRandomCoords(), getRandomDir(), ship);
      } catch (e) {
        if (
          e.message !== "Ship out of bounds" &&
          e.message !== "Ship would overlap another boat"
        ) {
          throw e;
        }
        attemptPlace(ship);
      }
    }

    function getRandomCoords() {
      const randomCoord = () => Math.floor(Math.random() * 10);
      return [randomCoord(), randomCoord()];
    }

    function getRandomDir() {
      const directions = ["up", "down", "left", "right"];
      const randomIndex = Math.floor(Math.random() * 4);
      return directions[randomIndex];
    }
  }
  // cannot think of a simpler name for this lmao
  function enableSetFormCoordinatesOnTileClick() {
    const gameGrid = document.querySelector(".game-tile-container");
    gameGrid.addEventListener("click", (e) => {
      const strCoords = e.target.dataset.coordinate;
      if (!strCoords) return;
      const [x, y] = strCoords.split(",").map((i) => ++i);
      xInput.value = x;
      yInput.value = y;
    });
  }
}
