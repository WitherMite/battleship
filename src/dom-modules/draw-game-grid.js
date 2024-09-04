export default function drawGameGrid(gridElement, gridSize) {
  while (gridElement.firstChild)
    gridElement.removeChild(gridElement.firstChild);
  gridElement.style.gridTemplateColumns = `1fr ${gridSize + 1}fr`;
  gridElement.style.gridTemplateRows = `1fr ${gridSize + 1}fr`;

  gridElement.appendChild(createSpacerTile());
  gridElement.appendChild(createLabelsTop(gridSize));
  gridElement.appendChild(createLabelsLeft(gridSize));
  gridElement.appendChild(createGrid(gridSize));
}

function createSpacerTile() {
  const div = document.createElement("div");
  div.classList.add("spacer-tile");
  return div;
}

function createLabelsTop(gridSize) {
  return createLabels(gridSize, "grid-label-top", (i) => i + 1);
}

function createLabelsLeft(gridSize) {
  return createLabels(gridSize, "grid-label-left", (i) => {
    // char codes for A-Z is 65-90
    return String.fromCharCode(65 + i);
  });
}

function createLabels(gridSize, className, callback) {
  const div = document.createElement("div");
  div.classList.add(className);
  for (let i = 0; i < gridSize; i++) {
    const tile = document.createElement("div");
    tile.classList.add("label-tile");
    tile.textContent = callback(i);
    div.appendChild(tile);
  }
  return div;
}

function createGrid(gridSize) {
  const div = document.createElement("div");
  div.classList.add("game-tile-container");
  div.style.display = "grid";
  div.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

  // create y axis in reverse to put origin in bottom left
  for (let y = gridSize - 1; y >= 0; y--) {
    for (let x = 0; x < gridSize; x++) {
      const tile = document.createElement("div");
      tile.classList.add("game-tile");
      tile.dataset.coordinate = [x, y];
      div.appendChild(tile);
    }
  }
  return div;
}
