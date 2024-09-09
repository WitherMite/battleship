import createEvent from "./create-event.js";
import createPlayer from "./create-player.js";

export default function Battleship(playerOneInput, playerTwoInput) {
  const playerOne = createPlayer(playerOneInput);
  const playerTwo = createPlayer(playerTwoInput);
  const render = createEvent();
  const win = createEvent();

  async function playRound(player = playerOne, opponent = playerTwo) {
    const [getBoard, getRadar] =
      player.povType === "computer"
        ? [opponent.board.getState, player.getRadar]
        : [player.board.getState, opponent.getRadar];

    render.send(getBoard(), getRadar());
    const attack = await player.attack();
    opponent.board.receiveAttack(attack);
    render.send(getBoard(), getRadar());

    if (opponent.board.isDefeat) {
      return win.send(player);
    }
    playRound(opponent, player);
  }
  return {
    attachRenderer: render.addListener,
    removeRenderer: render.removeListener,
    addWinListener: win.addListener,
    removeWinListener: win.removeListener,
    play() {
      // place ships
      // choose which player goes first
      playRound();
    },
  };
}
