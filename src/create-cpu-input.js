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

  const directions = [[1,0],[-1,0],[0,1],[0,-1]]; /* prettier-ignore */
  let prevAttack = [null, null];
  let prevHit;
  let searchDir = 0;
  let searchForShip = false;
  fisherYatesShuffleArr(directions);

  return {
    name: "Computer",
    povType: "computer",
    attack(radar) {
      const coords = [];
      const [x, y] = [...prevAttack];
      const lastTile = prevAttack.every((n) => n !== null) ? radar[x][y] : null;
      prevHit = lastTile?.shot?.isHit ? [x, y] : prevHit;

      // decide whether to search
      // if not searching, and last shot was hit, start search
      searchForShip = lastTile?.shot?.isHit || searchForShip;
      // dont search if ship was sunk
      if (lastTile?.ship?.isSunk) {
        stopSearch();
      }
      function stopSearch() {
        fisherYatesShuffleArr(directions);
        searchDir = 0;
        searchForShip = false;
        // check for any hits that haven't sunk a ship
        for (let col = 0; col < radar.length; col++) {
          for (let row = 0; row < radar[col].length; row++) {
            const tile = radar[col][row];
            if (tile.shot?.isHit && !tile.ship?.isSunk) {
              tile.shot = null; // only changes the copy, prevents infinite loops when the first tile has all directions shot
              prevHit = [col, row];
              searchForShip = true;
              return;
            }
          }
        }
      }

      function randomAttack() {
        const atkIndex = Math.floor(Math.random() * attacks.length - 1);
        return attacks.splice(atkIndex, 1)[0];
      }

      function attackAdjacent(x, y, tries = 1) {
        if (tries > directions.length) {
          stopSearch();
          return searchForShip ? attackAdjacent(...prevHit) : randomAttack();
        }
        const [a, b] = directions[searchDir];
        const coords = [x + a, y + b];
        const atkIndex = attacks.findIndex(
          (i) => i[0] === coords[0] && i[1] === coords[1]
        );
        if (atkIndex === -1) {
          // if tile has been attacked or is not on board, try a new direction
          searchDir < 3 ? searchDir++ : (searchDir = 0);
          return attackAdjacent(x, y, ++tries);
        }
        attacks.splice(atkIndex, 1);
        return coords;
      }

      // attack
      if (searchForShip) {
        if (!lastTile?.shot?.isHit)
          // if missed last, try new dir
          searchDir < 3 ? searchDir++ : (searchDir = 0);
        coords.push(...attackAdjacent(...prevHit));
        prevAttack = coords;
      } else {
        coords.push(...randomAttack());
        prevAttack = coords;
      }

      return new Promise((resolve) => {
        delay().then(() => resolve(coords));
      });
    },
    async placeShips() {
      const player = this;
      const ships = player.board.getUnplacedShips();
      for await (const ship of ships) {
        delay(8).then(attemptPlace(ship));
      }
      return;

      function attemptPlace(ship) {
        // spent so long on this proj, cant be bothered to make a smart way to do this - naive brute force it is
        // hate how it tends to place ships all close together though.
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

// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
function fisherYatesShuffleArr(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    // https://hackernoon.com/how-does-javascripts-math-random-generate-random-numbers-ef0de6a20131
    // ^ says most browsers use a PRNG with 64bit seeds, so plenty for this array of 4
    const index = Math.floor(Math.random() * i + 1);
    [arr[i], arr[index]] = [arr[index], arr[i]];
  }
}
