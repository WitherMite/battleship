export default function createShip(type) {
  const shipTypes = {
    carrier: { name: "carrier", length: 5 },
    battleship: { name: "battleship", length: 4 },
    destroyer: { name: "destroyer", length: 3 },
    submarine: { name: "submarine", length: 3 },
    patrol: { name: "patrol", length: 2 },
  };

  if (!shipTypes[type]) throw new Error("Invalid ship type", { cause: type });
  return {
    hits: 0,
    isSunk: false,
    hit() {
      this.hits++;
      if (this.hits >= this.length) this.isSunk = true;
      return true;
    },
    ...shipTypes[type],
  };
}
