const form = document.querySelector(".place-ship-form");

export default function playerPlaceShips(renderBoard) {
  // replace with better UI
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const coordinate = [
      Number(document.querySelector(".temp-x-input").value) - 1,
      Number(document.querySelector(".temp-y-input").value) - 1,
    ];
    const direction = document.querySelector(".temp-direction-input").value;
    const shipType = document.querySelector(".temp-ship-input").value;
    this.board.placeShip(coordinate, direction, shipType);
    renderBoard();
    form.reset();
  });
}
