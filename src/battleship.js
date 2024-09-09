import createEvent from "./create-event.js";
import createPlayer from "./create-player.js";

export default async function Battleship(
  playerOneInput,
  playerTwoInput /* replace with setupFn/obj */
) {
  // move player setup to a setup fn (or object?) that uses a game menu input
  // const [playerOne, playerTwo] = await setupFn();
  const playerOne = createPlayer(playerOneInput);
  const playerTwo = createPlayer(playerTwoInput);
  const render = createEvent();
  const win = createEvent();

  function placeAllShips(player) {
    const renderCallback = () => {
      render.send(player.board.getState());
    };
    return new Promise((resolve) => {
      player.board.addShipsPlacedListener(function fn() {
        player.board.removeShipsPlacedListener(fn);
        resolve(true);
      });
      renderCallback();
      player.placeShips(renderCallback);
    });
  }

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
    async play() {
      // change ui to board setup
      // place ships
      await placeAllShips(playerOne);
      await placeAllShips(playerTwo);
      // change ui to gameplay
      // choose which player goes first?
      // start game loop
      playRound();
    },
  };
}
