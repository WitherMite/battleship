export default function createCPUInput(boardSize) {
  const attacks = [];
  for (let x = 0; x < boardSize; x++) {
    for (let y = 0; y < boardSize; y++) {
      attacks.push([x, y]);
    }
  }
  return {
    povType: "computer",
    attack() {
      const atkIndex = Math.floor(Math.random() * attacks.length - 1);
      return attacks.splice(atkIndex, 1)[0];
    },
  };
}
