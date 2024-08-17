export default function createGameboard() {
  const gameboard = Array.from({ length: 10 }, () =>
    Array.from({ length: 10 }, () => ({ ship: null, isHit: false }))
  );

  return {
    getState() {
      const boardDeepCopy = JSON.parse(JSON.stringify(gameboard));
      return boardDeepCopy;
    },
  };
}
