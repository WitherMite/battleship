import createEvent from "./create-event.js";
import createPlayer from "./create-player.js";

export default async function Battleship(playerOneInput, playerTwoInput) {
  const playerOne = createPlayer(playerOneInput);
  const playerTwo = createPlayer(playerTwoInput);
  const changeUI = createEvent();
  const render = createEvent();
  const win = createEvent();

  function placeAllShips(player) {
    const stopEvent = createEvent();
    return new Promise((resolve) => {
      player.board.addShipsPlacedListener(function fn() {
        player.board.removeShipsPlacedListener(fn);
        stopEvent.send();
        resolve(true);
      });
      renderCallback();
      player.placeShips(renderCallback, stopEvent);
    });
    function renderCallback() {
      render.send(player.board.getState());
    }
  }

  async function playRound(player = playerOne, opponent = playerTwo) {
    const [getBoard, getRadar] =
      player.povType === "computer"
        ? [opponent.board.getState, player.getRadar]
        : [player.board.getState, opponent.getRadar];

    render.send(getBoard(), getRadar());
    const attack = await player.attack(opponent.getRadar());
    opponent.board.receiveAttack(attack);
    render.send(getBoard(), getRadar());

    if (opponent.board.isDefeat) {
      return win.send(player);
    }
    await player.endTurn(opponent.povType);
    changeUI.send("gameplay");
    playRound(opponent, player);
  }
  return {
    addRenderer: render.addListener,
    removeRenderer: render.removeListener,
    addWinListener: win.addListener,
    removeWinListener: win.removeListener,
    addChangeUIListener: changeUI.addListener,
    removeChangeUIListener: changeUI.removeListener,
    async play() {
      changeUI.send("place-ships", playerOne.povType);
      await placeAllShips(playerOne);
      await playerOne.endTurn(playerTwo.povType);

      changeUI.send("place-ships", playerTwo.povType);
      await placeAllShips(playerTwo);
      await playerTwo.endTurn(playerOne.povType);

      changeUI.send("gameplay");
      playRound();
    },
  };
}
