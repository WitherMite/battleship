import createEvent from "./create-event.js";
import createPlayer from "./create-player.js";

export default function Battleship(playerOneInput, playerTwoInput) {
  const playerOne = createPlayer(playerOneInput);
  const playerTwo = createPlayer(playerTwoInput);
  const render = createEvent();

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
      // change to emit a win event
      setTimeout(alert, 200, "Game is over");
      return;
    }
    playRound(opponent, player);
  }
  return {
    attachRenderer: render.addListener,
    removeRenderer: render.removeListener,
    // methods to set/remove win listeners
    play() {
      // place ships
      // choose which player goes first
      playRound();
    },
  };
}
