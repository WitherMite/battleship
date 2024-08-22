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
    isSunk() {
      return this.hits >= this.length;
    },
    hit() {
      this.hits++;
      return true;
    },
    ...shipTypes[type],
  };
}
