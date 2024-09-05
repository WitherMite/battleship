const gameWindow = document.querySelector(".game-window");

export default function playerAttack() {
  const playerRadar = gameWindow.querySelector(".radar .game-tile-container");
  return new Promise((resolve) => {
    const getCoordinate = (e) => {
      const strCoord = e.target.dataset.coordinate;
      if (strCoord) {
        const coordinate = strCoord.split(",").map((n) => Number(n));
        playerRadar.removeEventListener("click", getCoordinate);
        resolve(coordinate);
      }
    };
    playerRadar.addEventListener("click", getCoordinate);
    // add some way to confirm choice
  });
}
