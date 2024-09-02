import createEvent from "./create-event.js";
import createPlayer from "./create-player.js";

export default async function playBattleship(gameUI /* winListeners */) {
  const playerOne = createPlayer();
  const playerTwo = createPlayer();
  const winEvent = createEvent();
  // winListeners.forEach((fn) => winEvent.addListener(fn));

  // decide which player goes first
  // loop until game ends: (find a good way to end loop)
  //   render gameboards (remove ships from opponent board somewhere first?)
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
  gameUI.render(playerOne.board.getState(), playerTwo.board.getState());
  //   listen for player attack
  //     send attack to opponent, render attack results, remove listener
  //   listen for turn to end
  //     change pov (dis/enable ui if computer player),
  //     change turns, remove listener
  winEvent.send(/* winner details */);
}
