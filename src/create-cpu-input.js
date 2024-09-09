export default function createCPUInput(boardSize) {
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
        setTimeout(resolve, getRandomDelay(), attack);
      });
    },
  };
}

// having a computer instantly play when you do doesnt feel great
function getRandomDelay() {
  return Math.floor(Math.random() * 200) + 150;
}
