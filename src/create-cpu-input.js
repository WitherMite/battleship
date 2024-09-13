// having a computer instantly play when you do doesnt feel great
function getRandomDelay(mult = 1) {
  return new Promise((resolve) => {
    setTimeout(resolve, (Math.floor(Math.random() * 200) + 150) * mult);
  });
}

export default function createCPUInput(boardSize, delay = getRandomDelay) {
  const attacks = [];
  for (let x = 0; x < boardSize; x++) {
    for (let y = 0; y < boardSize; y++) {
      attacks.push([x, y]);
    }
  }

  return {
    name: "Computer",
    povType: "computer",
    attack() {
      const atkIndex = Math.floor(Math.random() * attacks.length - 1);
      const attack = attacks.splice(atkIndex, 1)[0];
      return new Promise((resolve) => {
        delay().then(resolve(attack));
      });
    },
    placeShips() {
      const player = this;
      const ships = player.board.getUnplacedShips();
      ships.forEach((ship) => delay(8).then(attemptPlace(ship)));

      function attemptPlace(ship) {
        // spent so long on this proj, cant be bothered to make a smart way to do this - naive brute force it is
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
        const randomCoord = () => Math.floor(Math.random() * boardSize);
        return [randomCoord(), randomCoord()];
      }

      function getRandomDir() {
        const directions = ["up", "down", "left", "right"];
        const randomIndex = Math.floor(Math.random() * 4);
        return directions[randomIndex];
      }
    },
  };
}
