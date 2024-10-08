export default function renderGameboard(boardElement, boardState) {
  if (!boardElement) return;
  const tiles = Array.from(boardElement.childNodes);

  // childnodes are not in a 2d array, so for every row we need to add an offset to the index
  let indexOffset = 0;
  for (let y = boardState.length - 1; y >= 0; y--) {
    for (let x = 0; x < boardState.length; x++) {
      const tile = tiles[x + indexOffset];
      const tileInfo = boardState[x][y];
      renderTile(tile, tileInfo);
    }
    indexOffset += boardState.length;
  }
}

function renderTile(tileEle, tileInfo) {
  // replace with better ship visuals
  if (tileInfo.ship) {
    tileEle.classList.add(tileInfo.ship.name);
    if (tileInfo.ship.isSunk) tileEle.classList.add("sunk");
  }

  if (tileInfo.shot) {
    const peg = document.createElement("div");
    if (tileInfo.shot.isHit) {
      peg.classList.add("hit");
    } else peg.classList.add("miss");
    tileEle.appendChild(peg);
    // remove coordinate from tile
    // - can't shoot tiles twice, and pegs get in the way of listener anyway
    delete tileEle.dataset.coordinate;
  }
}
