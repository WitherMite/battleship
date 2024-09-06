import createEvent from "./create-event.js";
import createPlayer from "./create-player.js";

export default function Battleship(playerOneInput, playerTwoInput) {
  const playerOne = createPlayer(playerOneInput);
  const playerTwo = createPlayer(playerTwoInput);
  const render = createEvent();
  // temp setup to check renderer
  playerOne.board.receiveAttack([5, 6]);
  playerOne.board.receiveAttack([4, 6]);
  playerOne.board.receiveAttack([2, 5]);
  [
    [4, 2],
    [5, 2],
    [6, 2],
    [7, 2],
    [8, 2],
  ].forEach((xy) => playerOne.board.receiveAttack(xy));

  async function playRound(player = playerOne, opponent = playerTwo) {
    // render gameboards based on player's pov type
    render.send(player.board.getState(), opponent.getRadar());
    // await player attack
    const attack = await player.attack();
    //   send attack to opponent, render attack results
    opponent.board.receiveAttack(attack);
    render.send(player.board.getState(), opponent.getRadar());
    playRound(); /* temp */
    //   change pov to opponent
    // if win send win event
    // else playRound(opponent, player)
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
