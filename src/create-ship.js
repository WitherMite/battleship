export default function createShip(length) {
  return {
    length,
    hits: 0,
    isSunk() {
      return this.hits >= this.length;
    },
    hit() {
      this.hits++;
    },
  };
}
